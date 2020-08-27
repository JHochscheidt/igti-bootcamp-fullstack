const MongoClient = require('mongodb').MongoClient;
const uri =
  'mongodb+srv://igti:igti@igti-bootcamp-fullstack.6zocg.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect(async (err) => {
  const collection = client.db('grades').collection('student');
  // perform actions on the collection object

  // const documents = await collection.find({ subject: 'Historia' }).toArray();

  // console.log(documents);

  const databaseList = await client.db().admin().listDatabases();

  console.log('Databases:');

  databaseList.databases.forEach((db) => console.log(` - ${db.name}`));

  client.close();
});
