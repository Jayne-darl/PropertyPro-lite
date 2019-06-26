import express from 'express';
import Router from './routes/routes';

const app = express();

app.use(express.json());

app.use('/api/v1', Router);

app.get('/', (req, res) => res.status(200).json({ message: 'YAY! Congratulations! My first endpoint is working' }));

app.all('*', (req, res) => {
  res
    .status(404)
    .json({ message: 'Sorry, such endpoint does not exist' });
});

app.listen(3000);
// console.log('app running on port ', 3000);
