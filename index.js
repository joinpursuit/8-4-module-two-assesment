const appState = {
    movieData: [],
    lastRequest: "",
}

const title = document.querySelector('h3')
const rYear = document.querySelector('#release-year')
const description = document.querySelector('#description')
//Asynchronous
const getMovies = () => {
    fetch("https://ghibliapi.herokuapp.com/films")
        .then(data => data.json())
        .then(movies => {
            appState.movieData = movies;
            appState.lastRequest = Date.now;

            const flicks = document.querySelector('#mov')//targeting the Select element

            appState.movieData.forEach(movie => {//looping through the movies, creating the option and appending them to the Select element
                const option = document.createElement("option")
                flicks.innerHTML += `<option value=${movie.id}>${movie.title}</option>`;

            })

        })
}
setTimeout(getMovies(), 1000)

const select = document.getElementById('mov');

select.addEventListener('change', (event) => {
    event.preventDefault
    console.log(select.value)
    fetch(`https://ghibliapi.herokuapp.com/films/${select.value}`)
        .then(response => response.json())
        .then(response => {
            title.innerHTML = response.title
            rYear.innerHTML = response.release_date
            description.innerHTML = response.description
        })

});


