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
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '70d' });
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
        return clientError(
          res,
          401,
          ...['status',
            'error',
            'message',
            'Token is not provided, Please create an account'],
        );
      }
      const bearer = header.split(' ');
      const token = bearer[1];

      const decoded = jwt.verify(token, process.env.SECRET);
      req.user = decoded;
      // req.adminStatus = decoded.is_admin;
      return next();
    } catch (error) {
      return clientError(res, 403, 'status', 'error', 'error', `${error}`);
    }
  }

  static isAdmin(req, res, next) {
    if (req.user.is_admin === false) {
      return clientError(res, 403, ...['status', 'error', 'error', 'Access Forbidden']);
    }
    return next();
  }
}


export default Auth;
