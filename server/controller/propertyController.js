import Properties from '../model/propertyModel';
import { serverError, clientError, successResponse } from '../helper/httpResponse';
import Users from '../model/userModel';
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

  /**
  * updated details an advert
  * @params {object} req
  * @params {object} res
  * @returns {object} updated advert object
  */
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
      if (advert.owner === req.user.id) {
        const id = Number(req.params.id);
        const updatedAdvert = Properties.update(
          id, req.body,
        );
        return successResponse(res, 200, updatedAdvert);
      }
      return clientError(res, 400, ...['status', 'error', 'message', 'You are not authorize to update this advert']);
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
  static markSold(req, res) {
    if (isNaN(req.params.id)) {
      return clientError(res, 400, ...['status', 'error', 'error', 'Invalid id type']);
    }
    const advert = Properties.getOne(Number(req.params.id));
    if (!advert) {
      return clientError(res, 404, ...['status', 'error', 'message', 'Advert not found']);
    }
    if (advert.owner === req.user.id) {
      const id = Number(req.params.id);

      const soldProperty = Properties.sold(
        id,
      );
      return successResponse(res, 200, soldProperty);
    }

    return clientError(res, 400, ...['status', 'error', 'message', 'You are not authorize to mark this advert as sold']);
  }

  /**
  * delete an advert
  * @params {object} req
  * @params {object} res
  * @returns {object} delete advert object
  */
  static deleteAdvert(req, res) {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return clientError(res, 400, ...['status', 'error', 'error', 'Invalid id type']);
    }


    const advert = Properties.delete(id);
    if (!advert) {
      return clientError(res, 404, ...['status', 'error', 'message', 'Advert not found']);
    }
    return successResponse(res, 200, 'Advert Successfully deleted');
  }

  /**
*  get all advert
* @params {object} req
* @params {object} res
* @returns {object} all advert
*/

  static allAdvert(req, res) {
    const adverts = Properties.getAll();
    const advertList = adverts.map((advert) => {
      const advertOwnerID = advert.owner;
      const users = Users.getAll();
      const advertOwner = users.find(user => user.id === advertOwnerID);

      advert.ownerEmail = advertOwner.email;
      advert.ownerPhoneNumber = advertOwner.phone_number;
      const { owner, ...advertDetails } = advert;
      return advertDetails;
    });

    /**
     *  get all advert of same type
     * @params {object} req
     * @params {object} res
     * @returns {object} all advert of same type
     */
    if (req.query.type) {
      const { type } = req.query;
      const propertyTypeResult = advertList.filter(property => property.type === type);
      if (propertyTypeResult.length) {
        return successResponse(res, 200, propertyTypeResult);
      }
      return clientError(res, 404, ...['status', 'error', 'error', `${type} property type is not available at the moment`]);
    }
    return successResponse(res, 200, advertList);
  }
}


export default Property;
