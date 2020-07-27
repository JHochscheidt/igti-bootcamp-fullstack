import { promises as fs } from 'fs';

const EXTENSION_FILE = `json`;
const PATH_CITIES_UFS_FILES = `./cidades-estados-brasil-json`;

const createUfJson = async (ufInitials) => {
  try {
    await fs.unlink(
      `${PATH_CITIES_UFS_FILES}/${ufInitials}.${EXTENSION_FILE}`,
      (err) => {
        if (err) console.log(err);
        console.log(
          `${PATH_CITIES_UFS_FILES}/${ufInitials}.${EXTENSION_FILE} removido com sucesso!`
        );
      }
    );
  } catch (err) {
    console.log('erro ao tentar deletar arquivo!' + err);
  }

  try {
    await fs.writeFile(
      `${PATH_CITIES_UFS_FILES}/${ufInitials}.${EXTENSION_FILE}`,
      JSON.stringify(['']),
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
    console.log(err);
  }
};

const run = async () => {
  const ufsJson = Array.from(
    JSON.parse(
      await fs.readFile(`${PATH_CITIES_UFS_FILES}/Estados.${EXTENSION_FILE}`)
    )
  );

  const citiesJson = Array(
    JSON.parse(
      await fs.readFile(`${PATH_CITIES_UFS_FILES}/Cidades.${EXTENSION_FILE}`)
    )
  );

  ufsJson.forEach(({ Sigla }) => createUfJson(Sigla));
};

run();
