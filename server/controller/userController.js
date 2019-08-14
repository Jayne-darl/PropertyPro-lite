import db from '../model/dbConnection';
import { serverError, clientError, successResponse } from '../helper/httpResponse';

class User {
  /**
     * make or remove a user as an admin
     * @params {object} req
     * @params {object} res
     * @returns {object} user object
    */
  static async setAdmin(req, res) {
    try {
      const findOneQuery = 'SELECT * FROM users WHERE id = $1';
      const strQuery = 'UPDATE users SET is_admin = NOT is_admin WHERE id = $1 RETURNING * ';
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) return clientError(res, 404, ...['status', 'error', 'error', 'No such user exist']);
      const data = await db.query(strQuery, [req.params.id]);
      return successResponse(res, 200, data.rows[0]);
    } catch (error) {
      return serverError(res);
    }
  }
}
export default User;
