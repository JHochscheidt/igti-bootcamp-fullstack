import { promises as fs } from 'fs';

const EXTENSION_FILE = `json`;
const PATH_CITIES_UFS_FILES = `./cidades-estados-brasil-json`;

let ufsJson = null;
let citiesJson = null;
let citiesByUf = [];

let citiesByUfsFull = [];
let allCitiesFromBrazil = [];

const createUfJson = async (ufInitials) => {
  try {
    await fs.writeFile(
      `${PATH_CITIES_UFS_FILES}/${ufInitials}.${EXTENSION_FILE}`,
      '', // para iniciar o arquivo para um json
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log(
          `Arquivo ${ufInitials}.${EXTENSION_FILE} criado com sucesso!`
        );
      }
    );
  } catch (err) {
    console.error(err);
  }
};

// const countCitiesByUf = () => {
//   try {
//     ufsJson.forEach(async (uf) => {
//       let cities = await readFileJson(`${uf.Sigla}.${EXTENSION_FILE}`);
//       let countCities = cities.length;
//       let cityByUf = {
//         Sigla: uf.Sigla,
//         countCities,
//       };
//       citiesByUf.push(cityByUf);
//       citiesByUf.sort((a, b) => {
//         return a.countCities - b.countCities;
//       });
//       // showUfsByCountCities(0, 5, 'Less Cities: ');
//       // showUfsByCountCities(-5, citiesByUf.length, 'More Cities: ');
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

const createFilesToUfs = () => {
  ufsJson.forEach((uf) => {
    createUfJson(uf.Sigla);
    let index = citiesByUfsFull.findIndex(
      (ufArray) => ufArray.Sigla === uf.Sigla
    );
    console.log(citiesByUfsFull);
    fs.writeFile(
      `${PATH_CITIES_UFS_FILES}/${uf.Sigla}.${EXTENSION_FILE}`,
      JSON.stringify(citiesByUfsFull[index])
    );
  });
};

const readFileJson = async (nameFile) => {
  try {
    return Array.from(
      JSON.parse(await fs.readFile(`${PATH_CITIES_UFS_FILES}/${nameFile}`))
    );
  } catch (err) {
    console.error(
      `Não foi possível ler o arquivo ${PATH_CITIES_UFS_FILES}/${nameFile}`
    );
    console.error(err);
  }
};

// ***************************
// ***************************
// ***************************
// ***************************
// ***************************
// ***************************
// ***************************
// ***************************

const createObjCitiesByUfsFull = () => {
  // para cada estado filtra as cidades e joga em um objeto
  ufsJson.forEach((uf) => {
    let nomeCities = citiesJson
      .filter((city) => city.Estado === uf.ID)
      .map((city) => city.Nome);
    let newUf = {
      Sigla: uf.Sigla,
      cities: nomeCities,
    };
    citiesByUfsFull.push(newUf);
  });
};

const countCitiesByUf = () => {
  citiesByUfsFull.forEach((uf) => {
    console.log(`${uf.Sigla} : ${uf.cities.length} cities`);
  });
};

const sortArrayUfs = () => {
  citiesByUfsFull.sort((a, b) => {
    return b.cities.length - a.cities.length;
  });
};

const showUfsByCountCities = (
  what,
  initPos,
  endPos = citiesByUfsFull.length
) => {
  let result = citiesByUfsFull.slice(initPos, endPos);
  result = result.map((uf) => {
    return ` ${uf.Sigla} - ${uf.cities.length} `;
  });
  result.join(',');

  console.log(`${what} [${result}]`);
};

const showBiggerCityNameByUf = () => {
  citiesByUfsFull.forEach((uf) => {
    uf.cities
      .sort((a, b) => {
        // ordena em ordem alfabetica decrescente
        // a = a.split('(')[0];
        // b = b.split('(')[0];
        return a.localeCompare(b);
      })
      .sort((a, b) => {
        // ordena em ordem cresccente as cidades com maior nome
        // a = a.split('(')[0];
        // b = b.split('(')[0];
        return b.length - a.length;
      });
    console.log(`${uf.cities[0]} - ${uf.Sigla}`);
  });
};

const showSmallerCityNameByUf = () => {
  citiesByUfsFull.forEach((uf) => {
    uf.cities
      .sort((a, b) => {
        // ordena em ordem alfabetica decrescente
        // a = a.split('(')[0];
        // b = b.split('(')[0];
        return a.localeCompare(b);
      })
      .sort((a, b) => {
        // ordena em ordem decrescente as cidades com menor nome
        // a = a.split('(')[0];
        // b = b.split('(')[0];
        return a.length - b.length;
      });
    console.log(`${uf.cities[0]} - ${uf.Sigla}`);
  });
};

const showBiggerCityNameForCountry = () => {
  let biggerCityEachUf = [];
  showBiggerCityNameByUf();
  citiesByUfsFull.forEach((uf) => {
    // console.log(uf.Sigla + ' ' + uf.cities[0]);
    let biggerCityUf = {
      Sigla: uf.Sigla,
      city: uf.cities[0],
    };
    biggerCityEachUf.push(biggerCityUf);
  });

  biggerCityEachUf
    .sort((a, b) => {
      // a.city = a.city.split('(')[0];
      // b.city = b.city.split('(')[0];
      return a.city.localeCompare(b.city);
    })
    .sort((a, b) => {
      // a.city = a.city.split('(')[0];
      // b.city = b.city.split('(')[0];
      return b.city.length - a.city.length;
    });
  console.log(`${biggerCityEachUf[0].city} - ${biggerCityEachUf[0].Sigla}`);
};

const showSmallerCityNameForCountry = () => {
  let smallerCityEachUf = [];
  showSmallerCityNameByUf();
  citiesByUfsFull.forEach((uf) => {
    let smallerCityUf = {
      Sigla: uf.Sigla,
      city: uf.cities[0],
    };
    smallerCityEachUf.push(smallerCityUf);
  });

  smallerCityEachUf
    .sort((a, b) => {
      // a.city = a.city.split('(')[0];
      // b.city = b.city.split('(')[0];
      return a.city.localeCompare(b.city);
    })
    .sort((a, b) => {
      // a.city = a.city.split('(')[0];
      // b.city = b.city.split('(')[0];
      return a.city.length - b.city.length;
    });
  console.log(`${smallerCityEachUf[0].city} - ${smallerCityEachUf[0].Sigla}`);
};

const run = async () => {
  try {
    ufsJson = await readFileJson(`Estados.${EXTENSION_FILE}`);
    citiesJson = await readFileJson(`Cidades.${EXTENSION_FILE}`);

    createObjCitiesByUfsFull();
    sortArrayUfs();

    console.log('\nUFs and respective quantity of cities: \n');
    countCitiesByUf();

    console.log('\nShow data for de Ufs with More and Less Cities:\n');
    showUfsByCountCities('Less Cities', -5);
    showUfsByCountCities('More Cities', 0, 5);

    // console.log(`\n Bigger Name City By UF: \n`);
    // showBiggerCityNameByUf();

    // console.log(`\n Smaller Name City By UF: \n`);
    // showSmallerCityNameByUf();

    // console.log(`\n Bigger Name City From Brazil: \n`);
    // showBiggerCityNameForCountry();

    console.log(`\n Smaller Name City From Brazil: \n`);
    showSmallerCityNameForCountry();
  } catch (err) {
    console.error(err);
  }
};

run();
