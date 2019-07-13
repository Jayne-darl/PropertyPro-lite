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
        // console.log(fileUrl);
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
      // const advert = rows[0];
      return successResponse(res, 201, rows);
    } catch (err) {
      return serverError(res);
    }
  }
}
export default Property;
