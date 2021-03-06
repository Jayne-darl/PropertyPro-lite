import db from '../model/dbConnection';
import Helper from '../helper/helper';
import { serverError, clientError, successResponse } from '../helper/httpResponse';
import Auth from '../middleware/auth';

class Authentication {
  /**
   * Create A User
   * @params {object} req
   * @params {object} res
   * @returns {object} user object
   */
  static async create(req, res) {
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO 
    users(email, first_name, last_name, address, phone_number,  password, is_admin)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    returning *`;
    const values = [
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      req.body.address,
      req.body.phone_number,
      hashPassword,
      req.body.is_admin,
    ];
    try {
      const { rows } = await db.query(createQuery, values);
      const token = Auth.generateToken(rows[0]);
      const data = rows[0];
      data.token = token;
      return successResponse(res, 201, data);
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return clientError(res, 403, ...['status', 'error', 'error', 'Action Forbidden. User already exist']);
      }
      return serverError(res);
    }
  }

  /**
  * Login
  * @params {object} req
  * @params {object} res
  * @returns {object} user object
  */
  static async login(req, res) {
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        return clientError(res, 404, ...['status', 'error', 'message', 'User not found']);
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return clientError(res, 422, ...['status', 'error', 'message', 'The password you provided is incorrect']);
      }
      const token = Auth.generateToken(rows[0]);
      const user = rows[0];
      user.token = token;
      return successResponse(res, 200, user);
    } catch (err) { return serverError(res); }
  }
}

export default Authentication;
