import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import path from 'path';
import app from '../server/index';

const { expect } = chai;

chai.use(chaiHttp);

// eslint-disable-next-line prefer-destructuring

const { token } = process.env;
describe('POST /api/v1/property', () => {
  it('should  not post a new property with wrong image file', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .field({
        status: 'available',
        price: 20000,
        state: 'Abuja',
        city: 'Lugbe',
        address: '4 Federal Housing',
        type: '3 Bedroom',
      })
      .attach('image_url', path.join(`${__dirname}/testImage/localFile.zip`))
      .end((err, res) => {
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });
  it('should post a new property', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .field({
        status: 'available',
        price: 20000,
        state: 'Abuja',
        city: 'Lugbe',
        address: '4 Federal Housing',
        type: '3 Bedroom',
      })
      .attach('image_url', path.join(`${__dirname}/testImage/barn.jpg`))
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res).to.have.status('201');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });

  it('should return an error if invalid token is provided', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .set('Authorization', 'ksehfdslfiwefhbjhsvdkcjhshj')
      .field({
        status: 'available',
        price: 20000,
        state: 'Abuja',
        city: 'Lugbe',
        address: '4 Federal Housing',
        type: '3 Bedroom',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(403);
        expect(res).to.have.status('403');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        done();
      });
  });
  it('should return an error if no token is provided', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .field({
        status: 'available',
        price: 20000,
        state: 'Abuja',
        city: 'Lugbe',
        address: '4 Federal Housing',
        type: '3 Bedroom',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        done();
      });
  });
  it('should return an error if no price is provided', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .field({
        status: 'available',
        price: '',
        state: 'Abuja',
        city: 'Lugbe',
        address: '4 Federal Housing',
        type: '3 Bedroom',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Ensure price field is filled and with numeric characters');
        done();
      });
  });
  it('should return an error if no price is provided', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .field({
        status: 'available',
        price: 20000,
        state: '',
        city: 'Lugbe',
        address: '4 Federal Housing',
        type: '3 Bedroom',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Ensure state field  is filled and with filled with alphabetical characters');
        done();
      });
  });
  it('should return an error if no price is provided', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .field({
        status: 'available',
        price: 20000,
        state: 'aba',
        city: '',
        address: '4 Federal Housing',
        type: '3 Bedroom',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Ensure city field and with filled with alphabetical characters');
        done();
      });
  });
  it('should return an error if no price is provided', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .field({
        status: 'available',
        price: 20000,
        state: 'aba',
        city: 'lugbe',
        address: '',
        type: '3 Bedroom',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Ensure address field and with filled with alphabetical characters');
        done();
      });
  });
  it('should return an error if no price is provided', (done) => {
    request(app)
      .post('/api/v1/property')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .field({
        status: 'available',
        price: 20000,
        state: 'aba',
        city: 'lugbe',
        address: '2 akerele street',
        type: '',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Ensure type field is not empty');
        done();
      });
  });
});

describe('PATCH /api/v1/property/:property_id', () => {
  it('should update property details', (done) => {
    request(app)
      .patch('/api/v1/property/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .field({
        // state: 'Abuja',
        // city: 'Lugbe',
        // address: '4 Federal Housing',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        // expect(res.body).to.include.key('token');
        done();
      });
  });
  it('should return an error for invalid id type', (done) => {
    request(app)
      .patch('/api/v1/property/y')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .field({
        type: 'Abuja',
        city: 'Lugbe',
        address: '4 Federal Housing',
      })
      .attach('image_url', path.join(`${__dirname}/testImage/barn.jpg`))
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Id must be a number');
        done();
      });
  });
  it('should return an error if property is non existent', (done) => {
    request(app)
      .patch('/api/v1/property/1200')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .field({
        state: 'Abuja',
        city: 'Lugbe',
        address: '4 Federal Housing',
      })
      .attach('image_url', path.join(`${__dirname}/testImage/barn.jpg`))
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('You have not created any advert with this id');
        done();
      });
  });
  it('should return an error if no token is provided', (done) => {
    request(app)
      .patch('/api/v1/property/1')
      .set('Accept', 'application/json')
      .field({
        status: 'available',
        price: 20000,
        state: 'Abuja',
        city: 'Lugbe',
        address: '4 Federal Housing',
        type: '3 Bedroom',
      })
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        done();
      });
  });
});

describe('PATCH /api/v1/property/:property_id/sold', () => {
  it('should return an error if no token is provided', (done) => {
    request(app)
      .patch('/api/v1/property/1/sold')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        done();
      });
  });
  it('should mark a property as sold', (done) => {
    request(app)
      .patch('/api/v1/property/1/sold')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        expect(res.body.data.status).to.be.equal('Sold');
        done();
      });
  });
  it('should return an error for invalid id type', (done) => {
    request(app)
      .patch('/api/v1/property/y/sold')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Id must be a number');
        done();
      });
  });
  it('should return an error for non existent property', (done) => {
    request(app)
      .patch('/api/v1/property/1200/sold')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('You are not authorize to mark this advert as sold');
        done();
      });
  });
});

describe('GET /api/v1/property', () => {
  it('should get all posted property adverts', (done) => {
    request(app)
      .get('/api/v1/property')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });
  it('should get all posted property adverts of same type', (done) => {
    request(app)
      .get('/api/v1/property?type=3 Bedroom')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });
  it('should return error for unavaible property adverts of same type', (done) => {
    request(app)
      .get('/api/v1/property?type=4 Bedroom')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        done();
      });
  });
});

describe('GET /api/v1/property/:property_id', () => {
  it('should get a posted property advert', (done) => {
    request(app)
      .get('/api/v1/property/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });
  it('should get a posted property advert', (done) => {
    request(app)
      .get('/api/v1/property/u')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Id must be a number');
        done();
      });
  });
  it('should return an error if the property is not found', (done) => {
    request(app)
      .get('/api/v1/property/1200')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.be.an('object');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Advert not found');
        done();
      });
  });
});
describe('DELETE /api/v1/property/:property_id', () => {
  it('should return an error if no token is provided', (done) => {
    request(app)
      .delete('/api/v1/property/1')
      .set('Accept', 'application/json')
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        done();
      });
  });
  it('should return delete a property', (done) => {
    request(app)
      .delete('/api/v1/property/1')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        expect(res.body.data).to.be.equal('Advert Successfully deleted');
        done();
      });
  });
  it('should return error for invalid id type', (done) => {
    request(app)
      .delete('/api/v1/property/u')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Id must be a number');
        done();
      });
  });
  it('should return an error is property not found', (done) => {
    request(app)
      .delete('/api/v1/property/1200')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Advert not found');
        done();
      });
  });
});
