import chai from 'chai';
import chaiHttp from 'chai-http';
import request from 'supertest';
import app from '../server/index';
import Seed from '../server/model/seed';

const { expect } = chai;

chai.use(chaiHttp);

describe('/api/v1/user', () => {
  let admin;
  let user;
  before(async () => {
    admin = await request(app)
      .post('/api/v1/auth/signup')
      .set('content-type', 'application/json')
      .send(Seed.adminAccount);

    user = await request(app)
      .post('/api/v1/auth/signin')
      .set('content-type', 'application/json')
      .send(Seed.account);
  });

  describe('PATCH /api/v1/users/:id/set-admin', () => {
    it('should return 403 if user is not an admin', async () => {
      const result = await request(app)
        .patch('/api/v1/users/3/set-admin')
        .set('Authorization', `Bearer ${user.body.data.token}`);
      expect(result.status).to.equal(403);
    });
    it('should return 404 if the user is not found', async () => {
      const result = await request(app)
        .patch('/api/v1/users/1000000/set-admin')
        .set('Authorization', `Bearer ${admin.body.data.token}`);
      expect(result.status).to.equal(404);
    });
    it('should return 200 if the user is_admin field is set to true', async () => {
      const result = await request(app)
        .patch(`/api/v1/users/${user.body.data.id}/set-admin`)
        .set('Authorization', `Bearer ${admin.body.data.token}`);
      expect(result.status).to.equal(200);
    });
  });
  describe('GET/api/v1/flags', () => {
    it(' should return all valid flagged advert', async () => {
      const result = await request(app)
        .get('/api/v1/flags')
        .set('Authorization', `Bearer ${admin.body.data.token}`);
      expect(result.status).to.equal(200);
      expect(result).to.have.status('200');
      expect(result.body).to.include.key('status');
      expect(result.body).to.include.key('data');
    });
    it(' should return a valid flagged advert', async () => {
      const result = await request(app)
        .get('/api/v1/flags/1')
        .set('Authorization', `Bearer ${admin.body.data.token}`);
      expect(result.status).to.equal(200);
      expect(result).to.have.status('200');
      expect(result.body).to.include.key('status');
      expect(result.body).to.include.key('data');
    });
    it(' should return error for non available property in flagged report', async () => {
      const result = await request(app)
        .get('/api/v1/flags/100')
        .set('Authorization', `Bearer ${admin.body.data.token}`);
      expect(result.status).to.equal(404);
      expect(result).to.have.status('404');
      expect(result.body).to.include.key('status');
      expect(result.body).to.include.key('message');
      expect(result.body.message).to.be.equal('No record found');
    });
    it(' should return a error for non numeric id', async () => {
      const result = await request(app)
        .get('/api/v1/flags/r')
        .set('Authorization', `Bearer ${admin.body.data.token}`);
      expect(result.status).to.equal(400);
      expect(result).to.have.status('400');
      expect(result.body).to.include.key('status');
      expect(result.body).to.include.key('message');
      expect(result.body.message).to.be.equal('Id must be a number');
    });
  });
});
