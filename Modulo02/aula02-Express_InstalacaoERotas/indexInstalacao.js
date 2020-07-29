import express from 'express';

// criando instancia do express e colocando dentro da variavel 'app'
const app = express();

// configuracao das rotas
// qual caminho que o express vai responder em cada requisicao
// app.get( <rota>, <callback>)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  const a = 3;
  const b = 5;
  const resultado = soma(a, b);
  res.send('Resultado: ' + resultado);
});

function soma(a, b) {
  return a + b;
}

// iniciar o servidor
app.listen(3000, () => {
  console.log('API Started!');
});
