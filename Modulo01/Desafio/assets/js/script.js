window.addEventListener('load', script);

let users = [];
let inputUser = null;
let inputFilter = null;
let divUsers = null;
let divStats = null;
let divResults = null;

function script() {
    fetchAPI();

    inputUser = document.querySelector('#user');
    inputFilter = document.querySelector('#filter');

    results = document.querySelector('.results');
    divUsers = document.querySelector('#users');

    divStats = document.querySelector('#stats');

    inputUser.addEventListener('keyup', handleSearchUsers);
}

const fetchAPI = async() => {
    const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo')
    const { results: json } = await res.json();

    // extrair name(first + last) , picture, dob.age, gender
    users = json.map((user) => {
        let { name: { first } = first, name: { last } = last, picture: { thumbnail: pic } = pic, dob: { age } = age, gender } = user;
        return {
            name: `${first} ${last}`,
            pic,
            age,
            gender,
        }
    });
};

const handleSearchUsers = ({ key }) => {
    let inputUsersValue = inputUser.value;
    let results = searchUsers(inputUsersValue);

    if (inputUsersValue.trim().length === 0) results = [];
    divUsers.innerHTML = renderUsers(results);

    divStats.innerHTML = renderStats(results);

};

const searchUsers = (search) => {
    return users.filter((user) => {
        return user.name.toUpperCase().includes(search.toUpperCase());
    });
};

const renderUsers = (users) => {
    let usersHTML = `<div id="users">`;

    let spanHTML = users.length === 0 ? `<span>None user(s) filtered!</span>` : `<span>${users.length} user(s) found!</span>`;

    usersHTML += spanHTML;

    users.forEach(user => {
        usersHTML += newUser(user);
    });

    usersHTML += `</div>`;

    return usersHTML;

};

const renderStats = (users) => {
    let statsHTML = `<div>`;

    let spanHTML = users.length === 0 ? `<span>Nothing to  show!</span>` : `<span>Statistics</span>`;

    statsHTML += spanHTML;


    let male = (users.filter(user => user.gender === 'male')).length;


    let female = (users.filter(user => user.gender === 'female')).length;


    let sumAges = users.reduce((sum, user) => sum += user.age, 0);

    let avgAges = users.length !== 0 ? Number(+sumAges / +users.length).toFixed(2) : 0;



    statsHTML += newStats({ male, female, sumAges, avgAges });


    statsHTML += `</div>`;
    return statsHTML;
};

const newUser = ({ name, age, pic }) => {
    return (`
      <div class='user'>
        <div class='img'>
          <img src="${pic}" alt="${name}"/>
        </div>
        <div class='name'>
          <span>${name}, ${age} years</span> 
        </div>
      </div>
    `);
};

const newStats = ({ male, female, sumAges, avgAges }) => {
    return (`
    <div class='stat'>
      <span>Male: ${male}</span>
      <span>Female: ${female}</span>
      <span>Sum of Ages: ${sumAges}</span>
      <span>Average Ages: ${avgAges}</span>
    </div>
  `);
};