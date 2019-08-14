import db from '../model/dbConnection';
import { serverError, clientError, successResponse } from '../helper/httpResponse';
import { imageUpload } from '../middleware/multerConfig';

class Property {
  /**
    * Post an advert
    * @params {object} req
    * @params {object} res
    * @returns {object} advert object
    */
  static async postAdvert(req, res) {
    try {
      const { id } = req.user;
      // eslint-disable-next-line camelcase
      let imageUrl;
      if (req.file) {
        const fileUrl = await imageUpload(req);
        // eslint-disable-next-line camelcase
        imageUrl = fileUrl;
      }
      const text = `INSERT INTO 
      property (owner, price, state, city, address, type, image_url)
      VALUES ( $1, $2, $3, $4, $5, $6, $7) returning *`;
      const values = [
        id,
        req.body.price,
        req.body.state,
        req.body.city,
        req.body.address,
        req.body.type,
        imageUrl,
      ];
      const { rows } = await db.query(text, values);
      return successResponse(res, 201, rows[0]);
    } catch (err) {
      return serverError(res);
    }
  }

  /**
* updated details an advert
* @params {object} req
* @params {object} res
* @returns {object} updated advert object
*/
  static async updateAdvert(req, res) {
    // const { id } = req.user;
    try {
      let imageUrl;
      if (req.file) {
        const fileUrl = await imageUpload(req);
        // eslint-disable-next-line camelcase
        imageUrl = fileUrl;
      }
      const findOneQuery = `SELECT * FROM property WHERE id = $1 AND owner ='${
        req.user.id
      }'`;
      const updateOneQuery = 'UPDATE property SET price=$1, state=$2, city=$3, address=$4, type=$5, image_url=$6, updated_at=$7 WHERE id=$8 returning *';
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return clientError(res, 404, ...['status', 'error', 'message', 'You have not created any advert with this id']);
      }
      const values = [
        req.body.price || rows[0].price,
        req.body.state || rows[0].state,
        req.body.city || rows[0].city,
        req.body.address || rows[0].address,
        req.body.type || rows[0].type,
        imageUrl || rows[0].image_url,
        new Date(),
        req.params.id,
      ];
      const updatedAdvert = await db.query(updateOneQuery, values);
      return successResponse(res, 200, updatedAdvert.rows[0]);
    } catch (err) {
      return serverError(res);
    }
  }

  /**
 * mark an advert as sold
 * @params {object} req
 * @params {object} res
 * @returns {object} updated advert object
 */
  static async markSold(req, res) {
    try {
      const findOneQuery = `SELECT * FROM property WHERE id = $1 AND owner ='${
        req.user.id
      }'`;
      const updateQueryStatus = 'UPDATE property SET status=$1, updated_at=$2 WHERE id=$3 returning *';
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return clientError(res, 404, ...['status', 'error', 'message', 'You are not authorize to mark this advert as sold']);
      }
      const values = [
        req.body.status = 'Sold',
        new Date(),
        req.params.id,
      ];
      const updatedSold = await db.query(updateQueryStatus, values);
      return successResponse(res, 200, updatedSold.rows[0]);
    } catch (error) {
      return serverError(res);
    }
  }
  /**
*  get all advert
* @params {object} req
* @params {object} res
* @returns {object} all advert
*/

  static async allAdvert(req, res) {
    const findAllQuery = 'SELECT  A. *, B.id AS owner, B.email AS ownerEmail, B.phone_number AS ownerPhoneNumber FROM property A INNER JOIN users B on A.owner=B.id';
    try {
      const { rows, rowCount } = await db.query(findAllQuery);
      if (rowCount === 0) {
        return clientError(res, 404, ...['status', 'error', 'message', 'Advert not found']);
      }
      /**
  *  get all advert of same type
  * @params {object} req
  * @params {object} res
  * @returns {object} all advert of same type
  */
      if (req.query.type) {
        const { type } = req.query;
        const propertyTypeResult = rows.filter(property => property.type === type);
        if (propertyTypeResult.length) {
          return successResponse(res, 200, propertyTypeResult);
        }
        return clientError(res, 404, ...['status', 'error', 'error', `${type} property type is not available at the moment`]);
      }
      return successResponse(res, 200, rows);
    } catch (error) {
      return serverError(res);
    }
  }

  /**
*  get a advert
* @params {object} req
* @params {object} res
* @returns {object} all advert
*/
  static async getAdvert(req, res) {
    const text = 'SELECT  A. *, B.id AS owner, B.email AS ownerEmail, B.phone_number AS ownerPhoneNumber FROM property A INNER JOIN users B on A.owner = B.id WHERE A.id = $1';
    try {
      const { rows, rowCount } = await db.query(text, [req.params.id]);
      if (rowCount === 0) {
        return clientError(res, 404, ...['status', 'error', 'message', 'Advert not found']);
      }
      return successResponse(res, 200, rows[0]);
    } catch (error) {
      return serverError(res);
    }
  }

  /**
 * delete an advert
 * @params {object} req
 * @params {object} res
 * @returns {object} delete advert object
 */
  static async deleteAdvert(req, res) {
    try {
      const findOneQuery = `SELECT * FROM property WHERE id = $1 AND owner ='${
        req.user.id
      }'`;
      const deleteAdvertQuery = 'DELETE FROM property WHERE id=$1 returning *';
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return clientError(res, 404, ...['status', 'error', 'message', 'Advert not found']);
      }
      const values = [
        req.params.id,
      ];
      await db.query(deleteAdvertQuery, values);
      return successResponse(res, 200, 'Advert Successfully deleted');
    } catch (error) {
      return serverError(res);
    }
  }
}
export default Property;
