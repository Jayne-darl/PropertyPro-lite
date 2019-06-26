import bcrypt from 'bcrypt';

class Helper {
  /**
     * Hash Password Method
     * @params {string} password
     * @returns {string} returns hashed password
     */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
     * Compare Password
     * @params {string} hashedPassword
     * @params {string} password
     * @returns {Boolean} True or False
     */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
     * isValidEmail helper method
     * @params {string} email
     * @returns {Boolean} True or False
     */
  static isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

export default Helper;
