import db from './mockdb';

class User {
  /**
   * class constructor
   * @param {object} attr
   */
  constructor(attr) {
    User.count += 1;
    this.id = User.count;
    this.email = attr.email;
    this.first_name = attr.first_name;
    this.last_name = attr.last_name;
    this.password = attr.password;
    this.phone_number = attr.phone_number;
    this.address = attr.address;
    this.is_admin = attr.is_admin;
  }

  /**
   *
   * @returns {object} user object
   */

  static create(attr) {
    const user = new User(attr);
    User.table.push(user);
    return user;
  }

  /**
   * @returns {object} all users array
   */
  static getAll() {
    return User.table;
  }

  /**
   * @param {id} user email
   * @return {object} user
   */
  static getOneUser(email) {
    return User.table.find(user => user.email === email);
  }
}
User.table = db.users;
User.count = db.users.length;

export default User;
