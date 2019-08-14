import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import Seed from '../server/model/seed';
import db from '../server/model/dbConnection';
import app from '../server/index';

const { expect } = chai;

chai.use(chaiHttp);

before(async () => {
  try {
    await db.query(
      'TRUNCATE users CASCADE; ALTER SEQUENCE users_id_seq RESTART WITH 1;',
    );
    await db.query(
      'TRUNCATE property; ALTER SEQUENCE property_id_seq RESTART WITH 1;',
    );
    await db.query(
      'TRUNCATE flag; ALTER SEQUENCE flag_id_seq RESTART WITH 1;',
    );
  } catch (error) {
    // console.log(error);
  }
});

const signup = '/api/v1/auth/signup';
// let token;

describe('POST /api/v1/auth/create', () => {
  it('should create a new user account', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.account)
      .end((err, res) => {
        // token = res.body.token;
        expect(res.status).to.be.equal(201);
        expect(res).to.have.status('201');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        done();
      });
  });

  it('should return an error if a user does not supply the first name', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.emptyFirstName)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('You need to supply a valid first name');
        done();
      });
  });
  it('should return an error if a user does not supply the last name', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.emptyLastName)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('You need to supply a valid last name');
        done();
      });
  });

  it('should return an error if the email supplied is invalid', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.invalidEmail)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Enter a valid email');
        done();
      });
  });

  it('should return an error if the password format supplied is wrong', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.inValidPassword)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('You need to supply password of minimum length of 8 characters');
        done();
      });
  });

  it('should return an error if the phone number format supplied is wrong', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.inValidNumber)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('You need to supply a valid phone number');
        done();
      });
  });
  it('should return an error if no address is supplied', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.emptyAddressField)
      .end((err, res) => {
        expect(res.status).to.be.equal(400);
        expect(res).to.have.status('400');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('You need to supply an address');
        done();
      });
  });

  it('should return an error if the email has been registered before', (done) => {
    request(app)
      .post(signup)
      .set('Accept', 'application/json')
      .send(Seed.account)
      .end((err, res) => {
        expect(res.status).to.be.equal(403);
        expect(res).to.have.status('403');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('error');
        expect(res.body.error).to.be.equal('Action Forbidden. User already exist');
        done();
      });
  });
});

const login = '/api/v1/auth/signin';

describe('POST /api/v1/auth/login ', () => {
  it('should login a user', (done) => {
    request(app)
      .post(login)
      .set('Accept', 'application/json')
      .send(Seed.logIn)
      .end((err, res) => {
        console.log(res.body.data.token);
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('data');
        expect(res.body.data).to.include.key('token');
        expect(res.body.data).to.include.key('id');
        expect(res.body.data).to.include.key('email');
        expect(res.body.data).to.include.key('first_name');
        expect(res.body.data).to.include.key('last_name');
        expect(res.body.data).to.include.key('password');
        expect(res.body.data).to.include.key('phone_number');
        expect(res.body.data).to.include.key('address');
        expect(res.body.data).to.include.key('is_admin');
        expect(res.body.data).to.include.key('registered');
        done();
      });
  });
  it("should return an error if password isn't supplied", (done) => {
    request(app)
      .post(login)
      .set('Accept', 'application/json')
      .send(Seed.emptyPassword)
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('You need to provide a password');
        done();
      });
  });
  it("should return an error if email isn't supplied", (done) => {
    request(app)
      .post(login)
      .set('Accept', 'application/json')
      .send(Seed.emptyEmail)
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Ensure you provided an email and it is correct');
        done();
      });
  });
  it('should return an error if an invalid email is supplied', (done) => {
    request(app)
      .post(login)
      .set('Accept', 'application/json')
      .send(Seed.wrongPassword)
      .end((err, res) => {
        expect(res.status).to.be.equal(422);
        expect(res).to.have.status('422');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('The password you provided is incorrect');
        done();
      });
  });
  it('should return an error if an invalid password is supplied', (done) => {
    request(app)
      .post(login)
      .set('Accept', 'application/json')
      .send(Seed.invalidPassword)
      .end((err, res) => {
        expect(res.status).to.be.equal(401);
        expect(res).to.have.status('401');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('Password length must be 8 characters and above');
        done();
      });
  });
  it('should return an error for a non existing account', (done) => {
    request(app)
      .post(login)
      .set('Accept', 'application/json')
      .send(Seed.nonExistingAccount)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body).to.include.key('status');
        expect(res.body).to.include.key('message');
        expect(res.body.message).to.be.equal('User not found');
        done();
      });
  });
});
