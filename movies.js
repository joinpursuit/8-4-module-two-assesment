// import films from "./cypress/support/intercept/films";

// import films from "./cypress/support/intercept/films";

console.log('This is connected');

const appState = {
    filmsData: [],
}

const BASE_URL = "https://ghibliapi.herokuapp.com/films/";

const getFilms = () => {
    console.log('This is working');
    fetch (BASE_URL)
        .then(data => data.json())
        .then(json => {
            appState.filmsData = json;
            console.log(appState.filmsData)
        })
}
setTimeout(getFilms, 1000);

// const select = document.getElementById('titles');
// const option = document.createElement('option')
// option.innerHTML = `${appState.filmsData[0].title[0]}`;
// select.appendChild(option)