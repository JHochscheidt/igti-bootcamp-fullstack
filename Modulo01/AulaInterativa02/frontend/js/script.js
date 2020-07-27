let globalUsers = [];
let globalCountries = [];
let globalUserCountries = [];
let globalFilteredUserCountries = [];

async function start() {
  // "Normal"
  // await fetchUsers();
  // await fetchCountries();

  // "Promise sequencial"
  // console.time('promise');
  // await promiseUsers();
  // await promiseCountries();
  // console.timeEnd('promise');

  // "Promise 'paralela'"
  console.time('paralelo');
  const p1 = promiseUsers();
  const p2 = promiseCountries();
  await Promise.all([p1, p2]);
  console.timeEnd('paralelo');

  hideSpinner();
  mergeUsersEndCountries();
  render();

  configFilter();
}

function promiseUsers() {
  return new Promise(async (resolve, reject) => {
    const users = await fetchUsers();
    setTimeout(() => {
      console.log('promiseUsers resolvida');
      resolve(users);
    }, 1000);
  });
}

function promiseCountries() {
  return new Promise(async (resolve, reject) => {
    const countries = await fetchCountries();
    setTimeout(() => {
      console.log('promiseCountries resolvida');
      resolve(countries);
    }, 500);
  });
}

async function fetchUsers() {
  const resource = await fetch('http://localhost:3002/users');
  const json = await resource.json();

  globalUsers = json.map(({ name, picture, login, nat }) => {
    return {
      userId: login.uuid,
      userCountry: nat,
      userName: name.first,
      userPicture: picture.large,
    };
  });
}

async function fetchCountries() {
  const resource = await fetch('http://localhost:3001/countries');
  const json = await resource.json();

  globalCountries = json.map(({ name, flag, alpha2Code }) => {
    return {
      countryId: alpha2Code,
      countryName: name,
      countryFlag: flag,
    };
  });
}

function hideSpinner() {
  const spinner = document.querySelector('#spinner');
  // A classe hide faz parte do Materialize
  spinner.classList.add('hide');
}

function mergeUsersEndCountries() {
  globalUserCountries = [];

  globalUsers.forEach((user) => {
    const country = globalCountries.find(
      (country) => country.countryId === user.userCountry
    );
    globalUserCountries.push({
      ...user,
      countryName: country.countryName,
      countryFlag: country.countryFlag,
    });
  });
  globalUserCountries.sort((a, b) => a.userName.localeCompare(b.userName));
  globalFilteredUserCountries = [...globalUserCountries];
}

function render() {
  const divUsers = document.querySelector('#users');

  divUsers.innerHTML = `
    <div class="row">
      ${globalFilteredUserCountries
        .map(({ countryFlag, countryName, userPicture, userName }) => {
          return `
          <div class="col s6 m4 l3">
            <div class='flex-row bordered'>
              <img class='avatar' src="${userPicture}" alt="${userName}"/>
              <div class='flex-column'>
                <span>${userName}</span>
                <img class='flag' src="${countryFlag}" alt="${countryName}"/>
              </div>
            </div>
          </div>
        `;
        })
        .join('')}
    </div>
  `;
}

function configFilter() {
  const buttonFilter = document.querySelector('#buttonFilter');
  const inputFilter = document.querySelector('#inputFilter');

  inputFilter.addEventListener('keyup', handleFilterKeyUp);
  buttonFilter.addEventListener('click', handleButtonClick);
}

function handleButtonClick() {
  const inputFilter = document.querySelector('#inputFilter');
  const filterValue = inputFilter.value.toLowerCase().trim();
  globalFilteredUserCountries = globalUserCountries.filter((item) => {
    return item.userName.toLowerCase().includes(filterValue);
  });
  render();
}

function handleFilterKeyUp({ key }) {
  // if (key !== 'Enter') {
  //   return;
  // }

  handleButtonClick();
}

start();
