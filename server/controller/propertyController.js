import Properties from '../model/propertyModel';
import { serverError, successResponse } from '../helper/httpResponse';
// import Users from './userController';
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
      let image_url;
      if (req.file) {
        const fileUrl = await imageUpload(req);
        // eslint-disable-next-line camelcase
        image_url = fileUrl;
      }

      const {
        state, city, address, type, price, status,
      } = req.body;
      const advert = Properties.create({
        owner: id,
        price,
        state,
        city,
        image_url,
        type,
        address,
        status,
      });

      return successResponse(res, 201, advert);
    } catch (err) {
      return serverError(res);
    }
  }
}

export default Property;
