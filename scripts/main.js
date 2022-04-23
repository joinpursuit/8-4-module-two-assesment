//ENV variables
const API = 'https://ghibliapi.herokuapp.com';

//global html elements
const movieList = document.getElementById('movieList');
const movieDetails = document.getElementById('display-info');
const reviewForm = document.getElementById('reviewForm');
const reviewList = document.querySelector('#reviews ul');
const resetButton = document.getElementById('reset-reviews');

//event listeners
movieList.addEventListener('change', (e) => changeMovie(e));
reviewForm.addEventListener('submit', (e) => submitReview(e));
resetButton.addEventListener('click', (e) => resetReviews());

fetch(`${API}/films`)
    .then(res => res.json())
    .then(res => populateList(res))
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

        })
        .catch(err => alert(err));

}

const submitReview = (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    const title = document.querySelector('#display-info h3').textContent;
    e.target.review.value = '';

    const strong = document.createElement('strong');
    strong.textContent = `${title}: `;

    const reviewLi = document.createElement('li');

    reviewLi.append(strong);
    reviewLi.append(review);
    
    reviewList.append(reviewLi);
}

const resetReviews = (e) => reviewList.innerHTML = '';



