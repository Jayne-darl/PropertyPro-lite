import '@babel/polyfill';
import express from 'express';
import Router from './routes/routes';

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use('/api/v1', Router);

app.get('/', (req, res) => res
  .status(200)
  .json({ message: 'Welcome to PropertyPro-lite' }));
app.get('/api/v1', (req, res) => res
  .status(200)
  .json({ message: 'Welcome to PropertyPro-lite API Endpoints' }));

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Sorry, such endpoint does not exist' });
});

app.listen(port);
// console.log('app running on port ', 3000);

export default app;
