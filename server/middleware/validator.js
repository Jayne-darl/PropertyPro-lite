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
      error = 'You need to supply a valid first name';
      // eslint-disable-next-line camelcase
    } else if (!last_name || !validate.last_name.test(last_name)) {
      error = 'You need to supply a valid last name';
    } else if (!password || !validate.password.test(password)) {
      error = 'You need to supply password of minimum length of 8 characters';
      // eslint-disable-next-line camelcase
    } else if (!phone_number || !validate.phone_number.test(phone_number)) {
      error = 'You need to supply a valid phone number';
    } else if (!address) {
      error = 'You need to supply an address';
    }

    if (error) {
      return clientError(res, 400, ...['status', 'error', 'message', error]);
    }

    return next();
  }

  /**
   * @method validateLogInDetails
   * @description Validates details of the user upon login
   * @param {object} req - The Request Object
   * @param {object} res - The Response Object
   * @returns {object} JSON API Response
   */
  static validateLoginDetails(req, res, next) {
    const {
      // eslint-disable-next-line camelcase
      email, password,
    } = req.body;
    let error;
    if (!email || !Helper.isValidEmail(email)) {
      error = 'Ensure you provided an email and it is correct';
    } else if (!password) {
      error = 'You need to provide a password';
    } else if (!/^[\s\S]{8,255}$/.test(password)) {
      error = 'Password length must be 8 characters and above';
    }
    if (error) {
      return clientError(res, 401, ...['status', 'error', 'message', error]);
    }
    return next();
  }

  static validatePropertyPostFields(req, res, next) {
    const {
      price, state, city, address, type,
    } = req.body;
    let error;

    if (price === '' || !Number(price)) {
      error = 'Ensure price field is filled and with numeric characters';
    } else if (state === '') {
      error = 'Ensure state field  is filled and with filled with alphabetical characters';
      // eslint-disable-next-line camelcase
    } else if (city === '') {
      error = 'Ensure city field and with filled with alphabetical characters';
    } else if (address === '') {
      error = 'Ensure address field and with filled with alphabetical characters';
      // eslint-disable-next-line camelcase
    } else if (type === '') {
      error = 'Ensure type field is not empty';
    }
    if (error) {
      return clientError(res, 400, ...['status', 'error', 'message', error]);
    }

    return next();
  }

  static validateIdParameter(req, res, next) {
    const { id } = req.params;
    if (!Number(id)) {
      return clientError(res, 400, ...['status', 'error', 'message', 'Id must be a number']);
    }
    return next();
  }

  static validateFlagFields(req, res, next) {
    const {
      // eslint-disable-next-line camelcase
      property_id, name, email, reason,
    } = req.body;
    let error;
    if (!Number(property_id)) {
      error = 'Property_id must be a number';
    } else if (name === '') {
      error = 'Ensure name field  is filled and with filled with alphabetical characters';
    } else if (!Helper.isValidEmail(email)) {
      error = 'Please fill in a valid email';
    } else if (reason === '') {
      error = 'please fill in your resaon for flagging this order';
    }
    if (error) {
      return clientError(res, 400, ...['status', 'error', 'message', error]);
    }
    return next();
  }
}
export default ValidateUser;
