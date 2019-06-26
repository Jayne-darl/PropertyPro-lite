import Users from '../model/userModel';
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
    try {
      const {
        // eslint-disable-next-line camelcase
        email, first_name, last_name, address, phone_number,
      } = req.body;
      let { password } = req.body;
      const user = Users.getOneUser(req.body.email);
      if (user) { return clientError(res, 403, 'status', 'error', 'error', 'Action Forbidden. User already exist'); }
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

  /**
  * Login
  * @params {object} req
  * @params {object} res
  * @returns {object} user object
  */
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = Users.getOneUser(email);
      if (!user) {
        return clientError(res, 404, 'status', 'error', 'message', 'User not found');
      }
      const comparePass = await Helper.comparePassword(user.password, password);
      console.log(user.password);
      console.log(password);
      console.log(comparePass);
      if (!comparePass) {
        return clientError(res, 422, 'status', 'error', 'message', 'The password you provided is incorrect');
      }
      const token = Auth.generateToken(user);
      user.token = token;
      return successResponse(res, 200, user);
    } catch (err) {
      return serverError(res);
    }
  }
}

export default User;
