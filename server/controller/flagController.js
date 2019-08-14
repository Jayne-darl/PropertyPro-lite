import db from '../model/dbConnection';
import { serverError, clientError, successResponse } from '../helper/httpResponse';

class flag {
  /**
   * post a fraudlent advert
   * @params {object} req
   * @params {object} res
   * @returns {object} advert object
   */
  static async postFlag(req, res) {
    try {
      const {
        // eslint-disable-next-line camelcase
        property_id, name, email, reason, description,
      } = req.body;
      const strQuery = 'INSERT INTO flag(property_id,name,email,reason,description) VALUES($1,$2,$3,$4,$5) RETURNING *';
      // eslint-disable-next-line camelcase
      const { rows } = await db.query(strQuery, [property_id, name, email, reason, description]);
      return successResponse(res, 201, rows[0]);
    } catch (err) {
      return serverError(res);
    }
  }

  /**
 * get all flagged record
 * @params {object} req
 * @params {object} res
 * @returns {object} all flagged record object
 */
  static async getAllFlag(req, res) {
    try {
      const strQuery = "SELECT A. *, CONCAT(B.type,' at ', B.address,' ', B.city,' ', B.state) AS property_title,"
        + " C.id AS agent_id, CONCAT(C.first_name,' ', C.last_name) AS agent_name, A.created_on FROM flag A "
        + ' INNER JOIN property B ON A.property_id = B.id INNER JOIN users C ON B.owner = C.id';

      const { rows, rowCount } = await db.query(strQuery);

      if (rowCount === 0) { return clientError(res, 404, ...['status', 'error', 'message', 'No record found']); }
      return successResponse(res, 200, rows);
    } catch (err) {
      return serverError(res);
    }
  }

  /**
 * get a flagged record
 * @params {object} req
 * @params {object} res
 * @returns {object} flagged record object
 */
  static async getAFlag(req, res) {
    try {
      const strQuery = "SELECT A. *, CONCAT(B.type,' at ', B.address,' ', B.city,' ', B.state) AS property_title,"
        + " C.id AS agent_id, CONCAT(C.first_name,' ', C.last_name) AS agent_name FROM flag A"
        + ' INNER JOIN property B ON A.property_id = B.id INNER JOIN users C ON B.owner = C.id WHERE A.id=$1';

      const { rows, rowCount } = await db.query(strQuery, [req.params.id]);

      if (rowCount === 0) { return clientError(res, 404, ...['status', 'error', 'message', 'No record found']); }
      return successResponse(res, 200, rows[0]);
    } catch (err) {
      return serverError(res);
    }
  }
}
export default flag;
