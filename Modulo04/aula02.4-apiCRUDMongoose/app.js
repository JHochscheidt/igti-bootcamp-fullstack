import express from 'express';
import mongoose from 'mongoose';

import { studentRouter } from './routes/studentRouter.js';

// connect to mongoDB
(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://igti:igti@igti-bootcamp-fullstack.6zocg.gcp.mongodb.net/grades?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log('Conectado ao MongoDB');
  } catch (err) {
    console.log('Erro ao conectar ao MongoDB! ' + err);
  }
})();

const app = express();

app.use(express.json());

app.use(studentRouter);

app.listen(3000, () => {
  console.log('Server Started!');
});
