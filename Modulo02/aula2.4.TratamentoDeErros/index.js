import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  throw new Error('Erro message test');
});

app.post('/', async (req, res, next) => {
  try {
    throw new Error('Error message Async');
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  console.log('Error 1');
  next(err);
});

app.use((err, req, res, next) => {
  console.log('Error 2');
  res.status(500).send('Ocorreu um erro, tente novamente mais tarde');
});

app.listen(3000, () => {
  console.log('API Started');
});
