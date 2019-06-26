import Users from '../model/userModel';
import Helper from '../helper/helper';
import { serverError, clientError, successResponse } from '../helper/httpResponse';
import Auth from '../middleware/auth';

class User {
  static async create(req, res) {
    try {
      const {
        // eslint-disable-next-line camelcase
        email, first_name, last_name, address, phone_number,
      } = req.body;
      let { password } = req.body;
      const userIndex = Users.getOneUser(req.body.email);
      if (userIndex) return clientError(res, 403, 'status', 'error', 'error', 'Action Forbidden. User already exist');
      password = await Helper.hashPassword(password);
      const details = Users.create({
        email, first_name, last_name, password, phone_number, address,
      });
      const { id, email: userEmail } = details;
      const token = Auth.generateToken({ id, userEmail });
      details.token = token;
      return successResponse(res, 201, details);
    } catch (err) {
      return serverError(res);
    }
  }
}

export default User;
