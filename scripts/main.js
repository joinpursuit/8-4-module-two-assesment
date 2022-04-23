//ENV variables
const API = 'https://ghibliapi.herokuapp.com';

//global html elements
const movieList = document.getElementById('movieList');
const movieDetails = document.getElementById('display-info');
const reviewForm = document.getElementById('reviewForm');
const reviewList = document.querySelector('#reviews ul');
const resetButton = document.getElementById('reset-reviews');
const peopleButton = document.getElementById('show-people');
const peopleList = document.getElementById('peopleList');

//event listeners
movieList.addEventListener('change', (e) => changeMovie(e));
reviewForm.addEventListener('submit', (e) => submitReview(e));
resetButton.addEventListener('click', () => resetReviews());
peopleButton.addEventListener('click', (e) => showPeople(e));

//global var for current movie and all the people
// because this seems easiest...I want useState() plz
let currentRes;
let people;

fetch(`${API}/films`)
    .then(res => res.json())
    .then(res => populateList(res))
    .catch(err => alert(err));


fetch(`${API}/people?limit=250`)
    .then(res => res.json())
    .then(res => people = res)
    .catch(err => alert(err));


const populateList = (res) => {
    for (let movie of res) {
        const newMovie = document.createElement('option')
        newMovie.setAttribute('value', movie.id);
        newMovie.textContent = movie.title;
        movieList.append(newMovie);
    }
}

const changeMovie = (e) => {
    movieDetails.innerHTML = ''; //ideally this would be a loop to remove all children

    fetch(`${API}/films/${e.target.value}`)
        .then(res => res.json())
        .then(res => {
            const header = document.createElement('h3');
            header.textContent = res.title;

            const year = document.createElement('p');
            year.textContent = res.release_date;

            const description = document.createElement('p');
            description.textContent = res.description;

            movieDetails.append(header, year, description);

            currentRes = res;
        })
        .catch(err => alert(err));

}

const submitReview = (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    let title = document.querySelector('#display-info h3')
    if (!title) {
        alert('Please select a movie first');
        return;
    }
    title = title.textContent;
    e.target.review.value = '';

    const strong = document.createElement('strong');
    strong.textContent = `${title}: `;

    const reviewLi = document.createElement('li');

    reviewLi.append(strong);
    reviewLi.append(review);
    
    reviewList.append(reviewLi);
}

const showPeople = (e) => {
    let title = document.querySelector('#display-info h3');
    if (!title) {
        alert('Please select a movie first');
        return;
    }
    title = title.textContent;
    peopleList.innerHTML = '';

    for (let person of people) {
        for (let film of person.films) {
            let cFilm = film.split('/')
            console.log (cFilm[cFilm.length - 1]);
            if (cFilm[cFilm.length - 1] === currentRes.id) {
                console.log (person.name);
                let newLi = document.createElement('li');
                newLi.textContent = person.name;
                peopleList.append(newLi);
            }
        }
    }

    console.log (people);
    console.log (currentRes);



}

const resetReviews = () => reviewList.innerHTML = '';



