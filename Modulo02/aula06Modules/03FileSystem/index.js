import { promises as fs } from 'fs';

// Utilizando Promises com async/await
init();
writeReadJson();

async function init() {
  try {
    await fs.writeFile('teste.txt', 'bla bla bla');
    await fs.appendFile('teste.txt', '\n teste apend file');
    const data = await fs.readFile('teste.txt', 'utf-8');
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

async function writeReadJson() {
  try {
    const arrayCarros = ['Gol', 'Palio', 'Uno'];
    const carros = {
      carros: arrayCarros,
    };
    await fs.writeFile('teste.json', JSON.stringify(carros));
    const data = JSON.parse(await fs.readFile('teste.json'));
    data.carros.push('Sandero');

    await fs.writeFile('teste.json', JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
}

// Utilizando Promises

// fs.writeFile('teste.txt', 'bla bla bla')
//   .then(() => {
//     fs.appendFile('teste.txt', '\n teste apend file')
//       .then(() => {
//         fs.readFile('teste.txt', 'utf-8')
//           .then((resp) => console.log(resp))
//           .catch((err) => console.log(err));
//       })
//       .catch((err) => console.log(err));
//   })
//   .catch((err) => console.log(err));

// Utilizando com callbacks

// import fs from 'fs';teste

// fs.writeFile('teste.txt', 'bla bla bla', function (err) {
//   console.log('2');
//   if (err) {
//     console.log(err);
//   } else {
//     fs.appendFile('teste.txt', '\nteste appendFile \n', function (err) {
//       if (err) {
//         console.log(err);
//       } else {
//         fs.readFile('teste.txt', 'utf-8', function (err, data) {
//           if (err) {
//             console.log(err);
//           } else {
//             console.log(data);
//           }
//         });
//       }
//     });
//   }
// });

// Utilizando de forma sincrona

// try {
//   console.log('1');
//   fs.writeFileSync('teste.txt', 'bla bla bla');
//   console.log('2');
//   const data = fs.readFileSync('teste.txt', 'utf-8');
//   console.log(data);
//   console.log('3');
// } catch (err) {
//   console.log(err);
// }
