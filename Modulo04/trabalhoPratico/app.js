import express from 'express';

import { connectDatabase } from './database/connectDatabase.js';
import { accountRouter } from './routes/accountRouter.js';


const database = connectDatabase();

const app = express();

app.use(express.json());
app.use(accountRouter);

app.listen(process.env.SERVER_PORT , () => {
  console.log('API Started at port : ' + PORT);
});
