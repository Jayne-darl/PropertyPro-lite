import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import Seed from '../server/model/seed';
import app from '../server/index';

const { expect } = chai;

chai.use(chaiHttp);

describe('/api/v1/flag', () => {
  // let admin;
  // let user;
  // before(async () => {
  //   admin = await request(app)
  //     .post('/api/v1/auth/signup')
  //     .set('content-type', 'application/json')
  //     .send(Seed.adminAccount);

  //   user = await request(app)
  //     .post('/api/v1/auth/signin')
  //     .set('content-type', 'application/json')
  //     .send(Seed.account);
  // });
  describe('POST /api/v1/flag', () => {
    it('should post a flagged advert report', (done) => {
      request(app)
        .post('/api/v1/flag')
        .set('Accept', 'application/json')
        .send({
          property_id: '2',
          name: 'Okeke Adamu',
          email: 'adamu@gmail.com',
          reason: 'Bad building',
          description: 'Red building',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(201);
          expect(res).to.have.status('201');
          expect(res.body).to.include.key('status');
          expect(res.body).to.include.key('data');
          done();
        });
    });
    it('should return an error if the property_id is not a number', (done) => {
      request(app)
        .post('/api/v1/flag')
        .set('Accept', 'application/json')
        .send({
          property_id: 'er',
          name: 'Okeke Adamu',
          email: 'adamu@gmail.com',
          reason: 'Bad building',
          description: 'Red building',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res).to.have.status('400');
          expect(res.body).to.include.key('status');
          expect(res.body).to.include.key('message');
          expect(res.body.message).to.be.equal('Property_id must be a number');
          done();
        });
    });
    it('should return an error if name field is empty', (done) => {
      request(app)
        .post('/api/v1/flag')
        .set('Accept', 'application/json')
        .send({
          property_id: '2',
          name: '',
          email: 'adamu@gmail.com',
          reason: 'Bad building',
          description: 'Red building',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res).to.have.status('400');
          expect(res.body).to.include.key('status');
          expect(res.body).to.include.key('message');
          expect(res.body.message).to.be.equal('Ensure name field  is filled and with filled with alphabetical characters');
          done();
        });
    });
    it('should return an error if email is invalid', (done) => {
      request(app)
        .post('/api/v1/flag')
        .set('Accept', 'application/json')
        .send({
          property_id: '1',
          name: 'adamu okeke',
          email: 'adamu@gmail',
          reason: 'Bad building',
          description: 'Red building',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res).to.have.status('400');
          expect(res.body).to.include.key('status');
          expect(res.body).to.include.key('message');
          expect(res.body.message).to.be.equal('Please fill in a valid email');
          done();
        });
    });
    it('should return an error if reason field is empty', (done) => {
      request(app)
        .post('/api/v1/flag')
        .set('Accept', 'application/json')
        .send({
          property_id: '1',
          name: 'adamu okeke',
          email: 'adamu@gmail.com',
          reason: '',
          description: 'Red building',
        })
        .end((err, res) => {
          expect(res.status).to.be.equal(400);
          expect(res).to.have.status('400');
          expect(res.body).to.include.key('status');
          expect(res.body).to.include.key('message');
          expect(res.body.message).to.be.equal('please fill in your resaon for flagging this order');
          done();
        });
    });
  });
  //   describe('GET/api/v1/flags', () => {
  //     it(' should return all valid flagged advert', async () => {
  //       const result = await request(app)
  //         .get('/api/v1/flags')
  //         .set('Authorization', `Bearer ${admin.body.data.token}`);
  //       expect(result.status).to.equal(200);
  //     });
  //   });
});
