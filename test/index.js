import Chai from 'chai';
import ChaiHttp from 'chai-http';
import 'dotenv/config';
import path from 'path';
import app from '../server/index';

Chai.should();

Chai.use(ChaiHttp);

let token;

// Index Page Test
describe('Index', () => {
  it('should welcome a user', (done) => {
    Chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.eql('Welcome to PropertyPro-lite');
        done(err);
      });
  });
  it('should inform the user on non-existing endpoint', (done) => {
    Chai.request(app)
      .get('/goat')
      .end((err, res) => {
        res.should.have.status(404);
        res.body.message.should.eql('Sorry, such endpoint does not exist');
        done(err);
      });
  });
});

// User parent block
describe('user', () => {
  /**
   * Test the /POST route for create an account
   */
  describe('POST/api/v1/auth/create', () => {
    it('should return user information if registration was successful', (done) => {
      const user = {
        first_name: 'Ada',
        last_name: 'Obi',
        email: 'obi@gmail.com',
        password: 'password',
        phone_number: '08067856433',
        address: '2 Awolo road',
      };
      Chai.request(app)
        .post('/api/v1/auth/create')
        .send(user)
        .end((err, res) => {
          token = res.body.data.token;
          res.should.have.status(201);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.data.should.have.property('token');
          done(err);
        });
    });

    /**
     * Test for exisitng user
     */
    it('should return user information if registration was successful', (done) => {
      const user = {
        first_name: 'Ada',
        last_name: 'Obi',
        email: 'obi@gmail.com',
        password: 'password',
        phone_number: '08067856433',
        address: '2 Awolo road',
      };
      Chai.request(app)
        .post('/api/v1/auth/create')
        .send(user)
        .end((err, res) => {
          res.should.have.status(403);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          res.body.error.should.eql('Action Forbidden. User already exist');
          done(err);
        });
    });
    /**
     * Test for signup route  validation for invalid email
     */
    it('should not return user with invalid email', (done) => {
      const user = {
        first_name: 'Ada',
        last_name: 'Obi',
        email: 'obigmail.com',
        password: 'password',
        phone_number: '08067856433',
        address: '2 Awolo road',
      };
      Chai.request(app)
        .post('/api/v1/auth/create')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.message.should.eql('Enter a valid email');
          done(err);
        });
    });

    /**
     * Test for signup route  validation for first_name
     */
    it('should not register user without first name', (done) => {
      const user = {
        first_name: '',
        last_name: 'Obi',
        email: 'obi@gmail.com',
        password: 'password',
        phone_number: '08067856433',
        address: '2 Awolo road',
      };
      Chai.request(app)
        .post('/api/v1/auth/create')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.message.should.eql('You need to include a valid first name');
          done(err);
        });
    });

    /**
     * Test for signup route  validation for last_name
     */
    it('should not register user without last name', (done) => {
      const user = {
        first_name: 'Ada',
        last_name: '',
        email: 'obi@gmail.com',
        password: 'password',
        phone_number: '08067856433',
        address: '2 Awolo road',
      };
      Chai.request(app)
        .post('/api/v1/auth/create')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.message.should.eql('You need to include a valid last name');
          done(err);
        });
    });

    /**
     * Test for signup route  validation for password
     */
    it('should not register user without valid password', (done) => {
      const user = {
        first_name: 'Ada',
        last_name: 'Obi',
        email: 'obi@gmail.com',
        password: 'passwo',
        phone_number: '08067856433',
        address: '2 Awolo road',
      };
      Chai.request(app)
        .post('/api/v1/auth/create')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.message.should.eql(
            'You need to include password of minimum length of 8 characters',
          );
          done(err);
        });
    });

    /**
     * Test for signup route  validation for phonenumber
     */
    it('should not register user without valid phonenumber', (done) => {
      const user = {
        first_name: 'Ada',
        last_name: 'Obi',
        email: 'obi@gmail.com',
        password: 'password',
        phone_number: '080678564',
        address: '2 Awolo road',
      };
      Chai.request(app)
        .post('/api/v1/auth/create')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.message.should.eql(
            'You need to include a valid phone number',
          );
          done(err);
        });
    });

    /**
     * Test for signup route  validation for address
     */
    it('should not register user without an address', (done) => {
      const user = {
        first_name: 'Ada',
        last_name: 'Obi',
        email: 'obi@gmail.com',
        password: 'password',
        phone_number: '08067856444',
        address: '',
      };
      Chai.request(app)
        .post('/api/v1/auth/create')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.message.should.eql('You need to include an address');
          done(err);
        });
    });
  });

  /**
   * Test for login route for a registered user
   */
  describe('POST/api/v1/auth/login', () => {
    it('should return user with an account', (done) => {
      const user = {
        email: 'obi@gmail.com',
        password: 'password',
      };
      Chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.data.should.have.property('token');
          done(err);
        });
    });

    /**
     * Test for login route for a user with wrong email
     */
    it('should return user with an account', (done) => {
      const user = {
        email: 'obi3@gmail.com',
        password: 'password',
      };
      Chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(404);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.message.should.eql('User not found');
          done(err);
        });
    });

    /**
     * Test for login route for a registered user with wrong *password
     */
    it('should not return user with wrong password', (done) => {
      const user = {
        email: 'obi@gmail.com',
        password: 'passwor5',
      };
      Chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(422);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.message.should.eql('The password you provided is incorrect');
          done(err);
        });
    });

    /**
     * Test for login route  validation for invalid email
     */
    it('should not return user with invalid email', (done) => {
      const user = {
        email: 'obigmail.com',
        password: 'password',
      };
      Chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.message.should.eql('The email you provided is invalid');
          done(err);
        });
    });

    /**
     * Test for login route  validation for empty password field
     */
    it('should not return user with empty pasword field', (done) => {
      const user = {
        email: 'obi@gmail.com',
        password: '',
      };
      Chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.message.should.eql('You need to provide a password');
          done(err);
        });
    });

    /**
     * Test for login route  validation for invalid password length
     */
    it('should not return user with invalid password', (done) => {
      const user = {
        email: 'obi@gmail.com',
        password: '1234',
      };
      Chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.should.have.property('status');
          res.body.message.should.eql(
            'Password length must be 8 characters and above',
          );
          done(err);
        });
    });
  });
});

// Property Controller
describe('Property', () => {
  /**
   * Post Advert
   */
  describe('/POST/property', () => {
    it('should return an uploaded property', (done) => {
      Chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', `Bearer ${token}`)
        .field({
          price: '20000',
          state: 'Abuja',
          city: 'Lugbe',
          address: '4 Federal Housing',
          type: '3 Bedroom',
        })
        .attach('image_url', path.join(`${__dirname}/testImage/barn.jpg`))
        .end((err, res) => {
          if (err) return done(err);
          res.should.have.status(201);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('data');
          res.body.should.have.property('status');
          res.body.data.should.have.property('image_url');
          done();
        });
    });

    /**
     * it should not post an advert without token
     */
    it('should not upload a property without an token', (done) => {
      const property = {
        price: '20000',
        state: 'Abuja',
        city: 'Lugbe',
        address: '4 Federal Housing',
        type: '3 Bedroom',
      };
      Chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', '')
        .send(property)
        .end((err, res) => {
          res.should.have.status(401);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('message');
          //   res.body.should.have.property('status');
          res.body.message.should.eql(
            'Token is not provided, Please create an account',
          );
          done(err);
        });
    });

    /**
     * it should not post an advert with an unverifiable  token
     */
    it('should not upload a property with an invalid token', (done) => {
      const property = {
        price: '20000',
        state: 'Abuja',
        city: 'Lugbe',
        address: '4 Federal Housing',
        type: '3 Bedroom',
      };
      Chai.request(app)
        .post('/api/v1/property')
        .set('Authorization', '4567575676ghghjg')
        .send(property)
        .end((err, res) => {
          res.should.have.status(403);
          // eslint-disable-next-line no-unused-expressions
          res.should.be.json;
          res.body.should.have.property('error');
          res.body.should.have.property('status');
          done(err);
        });
    });
  });
});
