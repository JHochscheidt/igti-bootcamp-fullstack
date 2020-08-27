import mongoose from 'mongoose';

mongoose.connect(
  'mongodb+srv://igti:igti@igti-bootcamp-fullstack.6zocg.gcp.mongodb.net/grades?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// criação do modelo
const studentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
  lastModified: {
    type: Date,
    default: Date.now(),
  },
});

// definindo o modelo da coleção
mongoose.model('student', studentSchema, 'student');

const student = mongoose.model('student');

new student({
  name: 'Jackson Henrique Hochscheidt',
  subject: 'Matemática',
  type: 'Trabalho Prático',
  value: 22,
})
  .save()
  .then(() => console.log('Documento inserido!'))
  .catch((err) => console.log('Erro ao inserir documento ' + err));
