import express from 'express';
import dotenv from 'dotenv'; 

dotenv.config()

import { connectDatabase } from './database/connectDatabase.js';
import { accountRouter } from './routes/accountRouter.js';
const PORT = process.env.SERVER_PORT;

const database = connectDatabase();

const app = express();

app.use(express.json());
app.use(accountRouter);

app.listen(PORT , () => {
  console.log('API Started at port : ' + PORT);
});
