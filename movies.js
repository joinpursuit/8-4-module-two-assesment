console.log('This is connected');

const BASE_URL = "https://ghibliapi.herokuapp.com/films/";

const getMovies = () => {
    console.log('This is working');
    fetch (BASE_URL)
        .then(data => data.json())
        .then(movies => console.log(movies))
}