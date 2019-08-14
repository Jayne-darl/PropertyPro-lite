import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../server/index';

const { expect } = chai;

chai.use(chaiHttp);

describe('Index', () => {
  it('should welcome a user', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body.message).to.be.equal('Welcome to PropertyPro-lite');
        done();
      });
  });
  it('should welcome a user to the endpoint', (done) => {
    request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(res.status).to.be.equal(200);
        expect(res).to.have.status('200');
        expect(res.body.message).to.be.equal('Welcome to PropertyPro-lite API Endpoints');
        done();
      });
  });
  it('should inform the user on non-existing endpoint', (done) => {
    request(app)
      .get('/goat')
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res).to.have.status('404');
        expect(res.body.message).to.be.equal('Sorry, such endpoint does not exist');
        done();
      });
  });
});
