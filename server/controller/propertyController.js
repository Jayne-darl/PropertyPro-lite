import Properties from '../model/propertyModel';
import { serverError, clientError, successResponse } from '../helper/httpResponse';
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
        state,
        city,
        address,
        image_url,
        type,
        price,
        status,
      });
      return successResponse(res, 201, advert);
    } catch (err) {
      return serverError(res);
    }
  }

  static async updateAdvert(req, res) {
    try {
      if (req.file) {
        const fileUrl = await imageUpload(req);
        // eslint-disable-next-line camelcase
        req.body.image_url = fileUrl;
      }
      if (isNaN(req.params.id)) {
        return clientError(res, 400, ...['status', 'error', 'error', 'Invalid id type']);
      }
      const advert = Properties.getOne(Number(req.params.id));
      if (!advert) {
        return clientError(res, 404, ...['status', 'error', 'message', 'Advert not found']);
      }

      const id = Number(req.params.id);
      const updatedAdvert = Properties.update(
        id, req.body,
      );
      return successResponse(res, 200, updatedAdvert);
    } catch (err) {
      return serverError(res);
    }
  }
}

export default Property;
