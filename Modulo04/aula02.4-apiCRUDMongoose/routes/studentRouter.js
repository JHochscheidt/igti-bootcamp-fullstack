import express from 'express';
import { studentModel } from '../models/studentModel.js';

const app = express();

app.post('/student', async (req, res) => {
  try {
    const student = new studentModel(req.body);
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/student', async (req, res) => {
  try {
    const student = await studentModel.find({});
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.patch('/student/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentModel.findByIdAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    res.send(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete('/student/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const student = await studentModel.findByIdAndDelete({ _id: id });

    if (!student) {
      res.status(404).send('Documento não encontrado na coleção');
    } else {
      res.status(200).send();
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

export { app as studentRouter };
