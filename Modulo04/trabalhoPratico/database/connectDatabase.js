import mongoose from 'mongoose';
const DBNAME = process.env.DB_NAME;
const PASSWORD = process.env.DB_PWD;

const connectDatabase = async () => {
  try {
    const database = await mongoose.connect(
      `mongodb+srv://igti:${PASSWORD}@igti-bootcamp-fullstack.6zocg.gcp.mongodb.net/${DBNAME}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    console.log(`Conectado a '${DBNAME}' no mongoDB!`);
    return database;
  } catch (err) {
    console.log(`Erro ao conectar a '${DBNAME}' no mongoDB! ` + err);
  }
};

export { connectDatabase };
