import db from '../model/dbConnection';
import Helper from '../helper/helper';
import { serverError, clientError, successResponse } from '../helper/httpResponse';
import Auth from '../middleware/auth';

class User {
  /**
   * Create A User
   * @params {object} req
   * @params {object} res
   * @returns {object} user object
   */
  static async create(req, res) {
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO 
    users(email, first_name, last_name, address, phone_number, password)
    VALUES($1, $2, $3, $4, $5,$6)
    returning *`;
    const values = [
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      req.body.address,
      req.body.phone_number,
      hashPassword,
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
}

export default User;
