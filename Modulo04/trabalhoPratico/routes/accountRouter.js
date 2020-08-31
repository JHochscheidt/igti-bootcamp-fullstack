import express from 'express';
import { accountModel } from '../models/accountModel.js';
const router = express();

router.get('/account', async (_, res) => {
  try {
    const accounts = await accountModel.find({});
    res.send(accounts);
  } catch (err) {
    res.status(500).send(err);
  }
});


router.post('/account', async (req, res) => {
  try {
    const newAccount = await new accountModel(req.body);
    await newAccount.save();
    res.send(newAccount);
  } catch (err) {
    res.status(500).send(`Erro ao adicionar nova conta! ` + err);
  }
});

/*
  4) Crie um endpoint para registrar um depósito em uma conta.
  Parametros: agencia, numero da conta e valor do depósito
  To do: atualizar balance da conta incrementando com valor do depósito
  Retorna: saldo atual da conta
*/
router.patch('/account/deposit', async (req, res) => {
  const { deposit, conta, agencia } = req.body;
  try {
    if (deposit <= 0) {
      throw 'Valor de depósito negativo!';
    }
    const patchedAccount = await accountModel.findOneAndUpdate(
      { conta, agencia },
      { $inc: { balance: deposit } },
      { new: true }
    );

    res.send(patchedAccount);
  } catch (err) {
    res.status(500).send(`Erro ao tentar fazer depósito! ` + err);
  }
});

/*
  5) Crie  um  endpoint  para  registrar  um  saque  em  uma  conta.
  Parametros: agencia, numera da conta e valor do saque
  To do: atualizar balance da conta decrementando com o valor do saque adicionando uma tarifa de (1%)
  Validate: Não permitir saque caso seu valor negative o saldo da conta
  Retorna: saldo atual da conta
*/
router.patch('/account/draft', async (req, res) => {
  const { conta, agencia } = req.body;
  let { draft } = req.body;
  try {
    // if (draft < 0) {
    //   draft = Math.abs(draft);
    // }
    const patchedAccount = await accountModel.findOneAndUpdate(
      { conta, agencia, balance: { $gte: draft + 1 } },
      { $inc: { balance: -draft - 1 } },
      { new: true }
    );
    res.send(patchedAccount);
  } catch (err) {
    res.status(500).send(`Erro ao tentar efetuar saque! ` + err);
  }
});

/*
  6) Crie  um  endpoint  para  consultar  o  saldo  da  conta.
  Parametros: agencia e numero da conta
  Retorna: balance da conta
*/
router.get('/account/balance', async (req, res) => {
  const { agencia, conta } = req.body;
  try {
    const balance = await accountModel.findOne(
      { agencia, conta },
      { _id: 0, balance: 1 }
    );
    if (!balance) {
      throw 'Conta inexistente!';
    }
    res.send(balance);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*
  7) Crie  um  endpoint  para  excluir  uma  conta.
  Parametros: agencia e numero da conta
  Retorna: numero de contas ativas para esta agencia
*/
router.delete('/account', async (req, res) => {
  const { agencia, conta } = req.body;
  try {
    // remove conta
    await accountModel.findOneAndDelete({
      agencia,
      conta,
    });

    // busca pelas contas diferentes da que foi removida e conta
    const quantidadeAccounts = await accountModel
      .find({ agencia: { $eq: agencia }, conta: { $ne: conta } })
      .countDocuments();
    res.send({
      agencia,
      contas: quantidadeAccounts,
    });
  } catch (err) {
    res.sendStatus(500).send(err);
  }
});

/*
  8) Crie  um  endpoint  para  realizar  transferências  entre  contas.
  Parametros: numero da conta (origem), numero da conta (destino) e o valor da transferência
  Validate: Se as contas são da mesma agência;
            Se for de agências diferentes, adicionar tarifa de 8% na conta origem
  Retorna: o saldo da conta origem
*/
router.patch('/account/transfer', async (req, res) => {
  try {
    const { origem, destino, value } = req.body;
    const query = await accountModel.find(
      {
        $or: [{ conta: { $eq: origem } }, { conta: { $eq: destino } }],
      },
      { _id: 0, agencia: 1, balance: 1 }
    );

    if (query.length !== 2) {
      throw 'Uma das contas não existe';
    } else {
      const [contaOrigem, contaDestino] = query;
      if (contaOrigem.agencia === contaDestino.agencia) {
        // transferencia sem taxa
        if (contaOrigem.balance < value)
          throw 'Saldo insuficiente para realização da transferência!';
        const resultQuery = await accountModel.bulkWrite([
          {
            // atualiza conta origem
            updateOne: {
              filter: {
                agencia: contaOrigem.agencia,
                conta: origem,
                balance: { $gte: value },
              },
              update: {
                $inc: { balance: -value },
              },
              options: {
                new: true,
              },
            },
          },
          {
            //atualiza conta destino
            updateOne: {
              filter: {
                agencia: contaDestino.agencia,
                conta: destino,
              },
              update: {
                $inc: { balance: value },
              },
              options: {
                new: true,
              },
            },
          },
        ]);
        res.send(resultQuery);
      } else {
        //transferencia com taxa de 8%
        if (contaOrigem.balance < value + 8) {
          throw 'Saldo insuficiente para realização da transferência!';
        }
        const resultQuery = await accountModel.bulkWrite([
          {
            // atualiza conta origem
            updateOne: {
              filter: {
                agencia: contaOrigem.agencia,
                conta: origem,
                balance: { $gte: value + 8 },
              },
              update: {
                $inc: { balance: -value - 8 },
              },
              options: {
                new: true,
              },
            },
          },
          {
            //atualiza conta destino
            updateOne: {
              filter: {
                agencia: contaDestino.agencia,
                conta: destino,
              },
              update: {
                $inc: { balance: value },
              },
              options: {
                new: true,
              },
            },
          },
        ]);
        res.send(resultQuery);
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

/*
  9) Crie  um  endpoint  para  consultar  a  média  do  saldo  dos  clientes  de  determinada agência. 
  Parametros: agencia
  Retorna: média do balance das contas da agencia passada por parametro
*/
router.get('/agency/avg', async (req, res) => {
  const { agencia } = req.body;
  try {
    const avgBalance = await accountModel.aggregate([
      { $match: { agencia: parseInt(agencia) } },
      {
        $group: { _id: { agencia: '$agencia' }, balance: { $avg: '$balance' } },
      },
    ]);

    res.send({
      avgBalance: parseFloat(avgBalance[0].balance.toFixed(2)),
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

/*
  10) Crie um endpoint para consultar os clientes com o menor saldo em conta.
  Parametros: quantidade de clientes a serem listados
  Retorna: Em ordem crescente pelo saldo a lista de clientes(agencia, conta, saldo)
*/
router.get('/account/lessBalance', async (req, res) => {
  const { limit } = req.body;
  try {
    const result = await accountModel
      .find({}, { _id: 0, agencia: 1, conta: 1, balance: 1 })
      .sort({ balance: 1 })
      .limit(limit);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*
  11) Crie um endpoint para consultar os clientes mais ricos do banco.
  Parametros: quantidade de clientes a serem listados
  Retorna:  Retornar os clientes (agencia, conta, nome e saldo) 
            Em ordem decrescente pelo saldo, crescente pelo nome
*/
router.get('/account/rich', async (req, res) => {
  const { limit } = req.body;
  try {
    const result = await accountModel
      .find({}, { _id: 0, balance: 1, name: 1 })
      .sort({ balance: -1 })
      .sort({ name: 1 })
      .limit(limit);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

/*
  12) Crie  um  endpoint  que  irá  transferir  o  cliente  com  maior  saldo  em  contade  cada agência para a agência private agencia=99. 
  Parametros: nenhum
  Retorna: lista com os clientes da agencia private
*/
router.post('/agency/private', async (req, res) => {
  try {
    const result = await accountModel.aggregate([
      {
        $sort: {
          balance: -1
        }
      },
      {
        $group: {
          _id: '$agencia',
          name: { $first: '$name' },
          conta: { $first: '$conta' },
          // agencia: { $first: '$agencia' },
          balance: { $max: '$balance' },
        },
      },
      {
        $set: {
          agencia: 99,
        },
      },
    ]);

    result.forEach((rich) => delete rich._id);

    const newRich = await accountModel.insertMany(result);
    res.send(newRich);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { router as accountRouter };
