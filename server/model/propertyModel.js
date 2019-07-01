import db from './mockdb';

class Property {
  /**
   * class constructor
   * @param {object} attr
   */
  constructor(attr) {
    Property.count += 1;
    this.id = Property.count;
    this.owner = attr.owner;
    this.status = 'available';
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
   * @returns {object} property object
   */

  static create(attr) {
    const advert = new Property(attr);
    Property.table.push(advert);
    return advert;
  }

  /**
   * @returns {object} all property array
   */
  static getAll() {
    return Property.table;
  }

  /**
   * @param {id} property id
   * @return {object} property with id
   */
  static getOne(id) {
    return Property.table.find(advert => advert.id === id);
  }

  /**
   * @param {id} Property id
   * @param {object} data
   * @return {object} property
   */
  static update(id, data) {
    const advert = this.getOne(id);
    const index = Property.table.indexOf(advert);
    Property.table[index].state = data.state || advert.state;
    Property.table[index].city = data.city || advert.city;
    Property.table[index].address = data.address || advert.address;
    Property.table[index].type = data.type || advert.type;
    Property.table[index].image_url = data.image_url || advert.image_url;
    Property.table[index].price = data.price || advert.price;
    Property.table[index].updated_at = new Date();
    return Property.table[index];
  }


  /**
  * @param {id} Property id
  * @return {object} property
  */
  static sold(id) {
    const advert = this.getOne(id);
    const index = Property.table.indexOf(advert);
    Property.table[index].status = 'Sold';
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
