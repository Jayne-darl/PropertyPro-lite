import db from './mockdb';

class Property {
  /**
       * class constructor
       * @param {object} attr
      */
  constructor(attr) {
    Property.count += 1;
    this.id = Property.count;
    this.status = attr.status || 'available';
    this.price = attr.price;
    this.state = attr.state;
    this.city = attr.city;
    this.address = attr.address;
    this.type = attr.type;
    this.image_url = attr.image_url;
    this.created_on = attr.created_on || new Date();
    this.updated_at = attr.updated_at;
  }

  /**
       *
       * @returns {object} user object
       */

  static create(attr) {
    const advert = new Property(attr);
    Property.table.push(advert);
    return advert;
  }

  /**
     * @returns {object} all delivery user array
     */
  static getAll() {
    return Property.table;
  }

  /**
     * @param {id} user id
     * @return {object} user with id
     */
  static getOne(id) {
    return Property.table.find(advert => advert.id === id);
  }

  /**
       * @param {id} Property id
       * @param {object} data
       */
  static update(id, data) {
    const advert = this.getOne(id);
    const index = Property.table.indexOf(advert);
    Property.table[index].status = data.status || advert.status;
    Property.table[index].updated_at = new Date();
    return Property.table[index];
  }

  /**
 * @param {id} Property id
 */
  static delete(id) {
    const propertyIndex = this.getOne(id);
    if (propertyIndex) {
      Property.table.splice(propertyIndex, 1);
      return true;
    }
    return false;
  }
}

Property.table = db.property;
Property.count = db.property.length;

export default Property;
