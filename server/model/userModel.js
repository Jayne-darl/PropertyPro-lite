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
    this.phonenumber = attr.phonenumber;
    this.address = attr.address;
    this.is_admin = attr.is_admin;
  }

  /**
       *
       * @returns {object} user object
       */

  static create(attr) {
    const parcel = new User(attr);
    User.table.push(parcel);
    return parcel;
  }

  /**
     * @returns {object} all delivery user array
     */
  static getAllUsers() {
    return User.table;
  }

  /**
     * @param {id} user id
     * @return {object} user with id
     */
  static getOneUser(email) {
    return User.table.find(user => user.email === email);
  }

  //   /**
  //      * @param {id} user id
  //      * @param {object} data
  //      */
  //   static update(id, data) {
  //     const user = this.getOne(id);
  //     const index = User.table.indexOf(user);
  //     User.table[index].status = data.status || user.status;
  //     User.table[index].updatedAt = new Date();
  //     return User.table[index];
  //   }
}
User.table = db.users;
User.count = db.users.length;

export default User;
