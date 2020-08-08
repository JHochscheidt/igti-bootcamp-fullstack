import express from 'express';
import { promises as fs, write } from 'fs';

const { writeFile, readFile } = fs;

const router = express.Router();

// 1. Crie um endpopint para criar uma grade
router.post('/', async (req, res, next) => {
  try {
    let data = JSON.parse(await readFile(global.fileName));

    const { student, subject, type, value } = req.body;

    if (!student || !subject || !type || !value) {
      throw new Error('Student, subject, type and value are required');
    }

    const newGrade = {
      id: data.nextId++,
      student,
      subject,
      type,
      value,
      tymestamp: new Date(),
    };

    data.grades.push(newGrade);
    writeFile(global.fileName, JSON.stringify(data, null, 2));
    console.log(newGrade);
    res.send(newGrade);
  } catch (err) {
    // console.log('Não foi possível criar grade ', err.message);
    // res.status(400).send({ error: err.message });
    next(err);
  }
});

// 2. Crie um endpoint para atualizar uma grade
router.put('/', async (req, res, next) => {
  try {
    const { id, student, subject, type, value } = req.body;
    console.log(id, student, subject, type, value);
    if (!id || !student || !subject || !type || !value) {
      throw new Error('id, student, subject, type and value are required!');
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex((grade) => grade.id === +id);

    if (index === -1) {
      throw new Error(`Grade com o id ${id} não existe`);
    }

    data.grades[index].student = student;
    data.grades[index].subject = subject;
    data.grades[index].type = type;
    data.grades[index].value = +value;

    writeFile(global.fileName, JSON.stringify(data, null, 2));
    console.log(data.grades[index]);
    res.send(data.grades[index]);
  } catch (err) {
    next(err);
  }
});

// 3. Crie um endpoint para excluir uma grade
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(await readFile(global.fileName));

    const grade = data.grades.find((grade) => grade.id === +id);
    if (!grade) {
      throw new Error(`Grade com o id ${id} não existe. Nada para remover!`);
    }

    data.grades = data.grades.filter((grade) => grade.id !== +id);
    writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send([`Grade removida: `, grade]);
  } catch (err) {
    next(err);
  }
});

// 4. Crie um endpoint para consultar uma grade em específico
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = JSON.parse(await readFile(global.fileName));

    const grade = data.grades.find((grade) => grade.id === +id);
    if (!grade) {
      throw new Error(`Grade com o id ${id} não existe!`);
    }

    res.send(grade);
  } catch (err) {
    next(err);
  }
});

// 5. Crie um endpoint para consultar a nota total de um aluno em uma disciplina
router.get('/student/subject', async (req, res, next) => {
  try {
    const { student, subject } = req.body;

    if (!student || !subject) {
      throw new Error('student and subject are required!');
    }

    const data = JSON.parse(await readFile(global.fileName));

    const notas = data.grades
      .filter((grade) => {
        return grade.student === student && grade.subject === subject;
      })
      .map((grade) => grade.value)
      .reduce((acc, curr) => acc + curr, 0);

    if (!notas) {
      throw new Error(
        'Não foi possível somar as notas com os dados informados'
      );
    }

    console.log(`Soma das notas de ${student} em ${subject}: ${notas}`);
    res.send(`Soma das notas de ${student} em ${subject}: ${notas}`);
  } catch (err) {
    next(err);
  }
});

// 6. Crie um endpoint para consultar a média das grades de determinado subject e type
router.get('/subject/type', async (req, res, next) => {
  try {
    const { subject, type } = req.body;
    if (!subject || !type) {
      throw new Error('Subject and type are required!');
    }

    const data = JSON.parse(await readFile(global.fileName));

    const gradeValues = data.grades
      .filter((grade) => {
        return grade.subject === subject && grade.type === type;
      })
      .map((grade) => grade.value);

    if (!gradeValues) {
      throw new Error(
        'Não foi encontrado registros com os parametros recebidos!'
      );
    }
    const length = gradeValues.length;
    const sum = gradeValues.reduce((acc, curr) => acc + curr, 0);
    const media = sum / length || 0;
    console.log(`Média de [${subject}] em [${type}]: ${media}`);
    res.send(`Média de [${subject}] em [${type}]: ${media}`);
  } catch (err) {
    next(err);
  }
});

// 7. Crie um endpoint para retornar as três melhores grades de acordo com determinado subject e type
router.get('/subject/type/:nBest', async (req, res, next) => {
  try {
    const { subject, type } = req.body;
    if (!subject || !type) {
      throw new Error('subject and type are required');
    }
    const { nBest } = req.params;
    if (!nBest) {
      throw new Error('nBest is required!');
    }

    const data = JSON.parse(await readFile(global.fileName));

    let grades = data.grades.filter(
      (grade) => grade.subject === subject && grade.type === type
    );

    grades = grades.sort((a, b) => b.value - a.value);

    grades = grades.slice(0, nBest);
    console.log(grades);

    res.send(grades);
  } catch (err) {
    next(err);
  }
});

// 'trata' erros
router.use((err, req, res, next) => {
  console.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
