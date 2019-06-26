import Helper from '../helper/helper';
import { clientError } from '../helper/httpResponse';

class ValidateUser {
  /**
                             * @method validateSignUpDetails
                             * @description Validates details of the user upon sign up
                             * @param {object} req - The Request Object
                             * @param {object} res - The Response Object
                             * @returns {object} JSON API Response
                             */
  static validateSignUpDetails(req, res, next) {
    const validate = {
      first_name: /^[a-zA-Z]+$/,
      last_name: /^[a-zA-Z]+$/,
      phone_number: /^\+[0-9]{13}$|^[0-9]{11}$/,
      password: /^[\s\S]{8,255}$/,
    };
    const {
      // eslint-disable-next-line camelcase
      email, first_name, last_name, password, phone_number, address,
    } = req.body;
    let error;

    if (!email || !Helper.isValidEmail(email)) {
      error = 'Enter a valid email';
      // eslint-disable-next-line camelcase
    } else if (!first_name || !validate.first_name.test(first_name)) {
      error = 'You need to include a valid first name';
      // eslint-disable-next-line camelcase
    } else if (!last_name || !validate.last_name.test(last_name)) {
      error = 'You need to include a valid last name';
    } else if (!password || !validate.password.test(password)) {
      error = 'You need to include password of minimum length of 8 characters';
      // eslint-disable-next-line camelcase
    } else if (!phone_number || !validate.phone_number.test(phone_number)) {
      error = 'You need to include a valid phone number';
    } else if (!address) {
      error = 'You need to include an address';
    }

    if (error) {
      return clientError(res, 400, 'status', 'error', 'message', error);
    }

    return next();
  }

  static validateLoginDetails(req, res, next) {
    const {
      // eslint-disable-next-line camelcase
      email, password,
    } = req.body;
    let error;
    if (!email || !Helper.isValidEmail(email)) {
      error = 'The email you provided is invalid';
    } else if (!password) {
      error = 'You need to provide a password';
    } else if (!/^[\s\S]{8,255}$/.test(password)) {
      error = 'Password length must be 8 characters and above';
    }
    if (error) {
      return clientError(res, 400, 'status', 'error', 'message', error);
    }
    return next();
  }
}
export default ValidateUser;
