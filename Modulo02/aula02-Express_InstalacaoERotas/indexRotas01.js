import express from 'express';

const app = express();

// app.all(<rota>, <callback>) //responde a todas as requisicoes à <rota>
app.all('/testAll', (req, res) => {
  res.send(req.method);
});
// caracteres especiais em rotas
// ? - o ultimo caractere antes do ? fica sendo opcional
//   --> ex: '/teste?' responde tanto para /test como para /teste
// + - indica que a letra imediatamente antes do + pode ser repetida infinitas vezes
//   --> ex: '/testee+' responde tanto para /testee como pra /testeeeee e /testeeeeeeeeee ...
app.get('/teste?', (req, res) => {
  res.send('/teste?');
});

app.get('/buzz+', (req, res) => {
  res.send('/buzz+');
});

app.listen(3000, () => {
  console.log('API Started!');
});
