const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


pool.on('connect', () => {
  console.log('connected to the db');
});

const createUsersTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      Users(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        password VARCHAR NOT NULL,
        phone_number VARCHAR(24),
        address VARCHAR,
        is_admin boolean DEFAULT false,
        registered TIMESTAMP DEFAULT now(),
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Users table has been created!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const createPropertyTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      Property(
        id SERIAL PRIMARY KEY,
        owner integer REFERENCES users,
        status VARCHAR DEFAULT 'available',
        price VARCHAR NOT NULL,
        state VARCHAR NOT NULL,
        city VARCHAR NOT NULL,
        address VARCHAR NOT NULL,
        type VARCHAR NOT NULL,
        image_url TEXT,
        created_on TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP 
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Property table has been created!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createFlagsTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
      Flags(
        id SERIAL PRIMARY KEY,
        property_id INTEGER,
        created_on TIMESTAMP,
        reason VARCHAR(50),
        description VARCHAR(200)
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Flags table has been created!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Users table has been dropped!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


const dropPropertyTable = () => {
  const queryText = 'DROP TABLE IF EXISTS Property';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Property table has been dropped!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropFlagsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS Flags';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
      console.log('Flags table has been dropped!');
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


module.exports = {
  createUsersTable,
  dropUsersTable,
  createPropertyTable,
  dropPropertyTable,
  createFlagsTable,
  dropFlagsTable,
};

require('make-runnable');
