import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { clientError } from '../helper/httpResponse';

class Auth {
  /**
                                       * generate token
                                       * @params {string} id
                                       * @returns {string} token
                                      */
  static generateToken(payload) {
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '7d' });
    return token;
  }

  /**
                                       * Verify Token
                                       * @param {object} req
                                       * @param {object} res
                                       * @param {object} next
                                       * @returns {object|void} response object
                                  */

  static async verifyToken(req, res, next) {
    try {
      const header = req.headers.authorization;
      if (!header) {
        return clientError(res, 401, 'status', res.statuscode, 'message', 'Token is not provided, Please create an account');
      }
      const bearer = header.split(' ');
      const token = bearer[1];

      const decoded = jwt.verify(token, process.env.SECRET);
      if (!decoded) {
        return clientError(res, 403, 'status', res.statuscode, 'error', 'Unable to autheticate token');
      }
      req.user = decoded.id;
      req.adminStatus = decoded.is_admin;
      next();
    } catch (error) {
      return clientError(res, 403, 'status', res.statuscode, 'error', `${error}`);
    }
  }
}

export default Auth;
