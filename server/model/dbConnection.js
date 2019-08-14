import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const env = process.env.NODE_ENV === 'test' ? process.env.test : process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: env,
});

export default {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool
        .query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

// // Connect to socket.io
// const server = require('https').createServer();
// const io = require('socket.io')(server);

// console.log('connected');
// io.on('disconnect', () => {
//   console.log('Disconnected');
// });
