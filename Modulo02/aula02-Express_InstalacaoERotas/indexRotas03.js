import express from 'express';

const app = express();

// avisar ao express que a gente está usando json
app.use(express.json());

// app.all(<rota>, <callback>) //responde a todas as requisicoes à <rota>
app.all('/testAll', (req, res) => {
  res.send(req.method);
});

/*
  #############################################
  #############################################
  #############################################
*/
// caracteres especiais em rotas

// ? - o ultimo caractere antes do ? fica sendo opcional
//   --> ex: '/teste?' responde tanto para /test como para /teste
app.get('/teste?', (req, res) => {
  res.send('/teste?');
});

// + - indica que a letra imediatamente antes do + pode ser repetida infinitas vezes
//   --> ex: '/testee+' responde tanto para /testee como pra /testeeeee e /testeeeeeeeeee ...
app.get('/buzz+', (req, res) => {
  res.send('/buzz+');
});

// * - indica que qualquer coisa pode ser colocada no lugar do *
//   --> ex: '/teste*teste' responde tanto para /testeKKKteste como pra /testeJJJJJteste ...
app.get('/one*Blue', (req, res) => {
  res.send(req.path);
});

// () - a string que estiver dentro do parenteses é tratada como unidade
//    --> ex: '/test(ing)?' - indica que a string 'ing' é opcional na URL

app.post('/test(ing)?', (req, res) => {
  console.log(req.body); // pegar parametros do body da requisicao (geralmente em POST e PUT)
  res.send('/test(ing)?');
});

// expressao regular .* - tudo que for colocado ali sera aceito
app.get(/.*Red$/, (req, res) => {
  res.send('/.*Red$/');
});

/*
  #############################################
  #############################################
  #############################################
*/
// PARAMETROS NA ROTA

app.get('/testParam/:id/:a?', (req, res) => {
  res.send(req.params.id + ' ' + req.params.a);
});

/*
  #############################################
  #############################################
  #############################################
*/
// PARAMETROS VIA QUERY
// ? - passar dados pela url
app.get('/testQuery', (req, res) => {
  res.send(req.query);
});

//next
app.get(
  '/testMultipleHandlers',
  (req, res, next) => {
    console.log('Callback 1');
    // ...
    // ...
    next();
  },
  (req, res) => {
    console.log('Callback 2');
    res.end();
  }
);

// next com array
const callback1 = (req, res, next) => {
  console.log('Callback 1');
  next();
};

function callback2(req, res, next) {
  console.log('Callback 2');
  // res.end();
  next();
}

const callback3 = (req, res) => {
  console.log('Callback 3');
  res.end();
};

app.get('/testMultipleHandlersArrays', [callback1, callback2, callback3]);

// route - todas as requisicoes que chegarem na rota serao tratadas pelo route()
// diferente do app.all(), o app.route() voce define quais metodos http voce quer que entre
// app.route() podemos definir uma callback para cada metodo http ̣
app
  .route('/testRoute')
  .get((req, res) => {
    res.send('/testRoute' + req.method);
  })
  .post((req, res) => {
    res.send('/testRoute' + req.method);
  })
  .put((req, res) => {
    res.send('/testRoute' + req.method);
  })
  .delete((req, res) => {
    res.send('/testRoute' + req.method);
  });

app.listen(3000, () => {
  console.log('API Started!');
});
