import '@babel/polyfill';
import express from 'express';
import Router from './routes/routes';


const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.use('/api/v1', Router);

app.get('/', (req, res) => res
  .status(200)
  .json({ message: 'Welcome to PropertyPro-lite' }));

app.all('*', (req, res) => {
  res.status(404).json({ message: 'Sorry, such endpoint does not exist' });
});

app.listen(port);
// console.log('app running on port ', 3000);

export default app;
