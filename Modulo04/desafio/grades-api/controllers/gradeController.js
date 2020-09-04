import { db, studentModel } from '../models/index.js';
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  const { name, subject, type, value } = req.body;
  try {
    const newGrade = await studentModel.create({
      name,
      subject,
      type,
      value,
    });

    res.send({ message: 'Grade inserido com sucesso' });
    logger.info(`POST /grade - ${JSON.stringify(newGrade)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  const name = req.query.name;

  //condicao para o filtro no findAll
  var condition = name
    ? { name: { $regex: new RegExp(name), $options: 'i' } }
    : {};

  try {
    let grades = await studentModel.find(condition);

    // grades = Array.from(grades);

    // grades = grades.map((grade) => {
    //   const { _id: id, name, subject, type, value, lastModified } = grade;
    //   return {
    //     id,
    //     name,
    //     subject,
    //     type,
    //     value,
    //     lastModified,
    //   };
    // });
    logger.info(`GET /grade`);
    res.send(grades);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  let { id } = req.params;
  try {
    // id = db.mongoose.Types.ObjectId(id); // resolveu problema com o id/_id
    const retrieveGrade = await studentModel.findById({ id });
    res.send(retrieveGrade);
    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  // console.log(req.body);

  try {
    const { id, name, subject, type, value } = req.body;
    const updatedGrade = await studentModel.updateOne(
      { id },
      { name, subject, type, value }
    );
    res.send(updatedGrade);
    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    // const _id = db.mongoose.Types.ObjectId(id);
    const deletedGrade = await studentModel.deleteOne({ id });
    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    const deletedGrades = await studentModel.deleteMany();
    res.end();
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
