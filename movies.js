// import films from "./cypress/support/intercept/films";

// import films from "./cypress/support/intercept/films";

// import films from "./cypress/support/intercept/films";

console.log('This is connected');

const appState = {
    filmsData: []
};

const BASE_URL = "https://ghibliapi.herokuapp.com/films/";

const getFilms = () => {
    console.log('This is working');
    fetch (BASE_URL)
        .then(data => data.json())
        .then(movies => {
            appState.filmsData = movies;
            populateSelectbox();
            createMovieDetails();
        })
};
setTimeout(getFilms, 1000);

const select = document.getElementById('titles');
const h3 = document.querySelector('#title');
const p1 = document.querySelector('#release-year');
const p2 = document.querySelector('#description');

const populateSelectbox = () => {
    appState.filmsData.forEach(film => {
        const option = document.createElement('option');
        option.value = `${film.id}`;
        option.innerHTML = `${film.title}`;
        select.appendChild(option);
        // console.log(film)
    });
};

const createMovieDetails = () => {
    select.addEventListener('change', (e) => {
        console.log(e.target.value)
        e.preventDefault();
        fetch(`${BASE_URL}${select.value}`)
            .then(data => data.json())
            .then(data => {
                h3.innerHTML = `${data.title}`
                p1.innerHTML = `${data.release_date}`
                p2.innerHTML = `${data.description}`
        });
    });
};

const form = document.querySelector('#form-review');
const ul = document.querySelector('ul')
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!select.value) {
        alert('Need to select movie.')
    } else {
        const input = document.getElementById('review').value
        const li = document.createElement('li');
        li.innerHTML = `<strong>${h3.innerHTML}: </strong>  ${input}`;
        console.log(li.innerHTML)
        ul.appendChild(li)
        form.reset();
    };
});