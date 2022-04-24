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

let fetchRes;
//set error to fire in 2 sec w/ setTimeOut Meth on err
setTimeout(() => {
    fetch(`${API}/films`)
            .then(res => res.json())
            .then(res => popList(res))
            .catch(err => alert(err));
}, 2000)


const popList = (res) => {
    for (let movie of res) {
        const moviesAdd = document.createElement('option')
        moviesAdd.setAttribute('value', movie.id);
        moviesAdd.textContent = movie.title;
        movieList.append(moviesAdd);
    }
}

const changeMovie = (e) => {
    e.preventDefault();
    movieDetails.innerHTML = '';

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

            fetchRes = res;
        })
        .catch(err => alert(err));

}

const submitReview = (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    let title = document.querySelector('#display-info h3')
    console.log (movieList.value);

    if (!movieList.value) {
        alert('Please select a movie first');
        return;
    }
    title = title.textContent;
    e.target.review.value = '';

    const reviewLi = document.createElement('li');

    const strong = document.createElement('strong');
    strong.textContent = `${title}: `;
    reviewLi.append(strong);
    reviewLi.append(review);
    reviewList.append(reviewLi);
}

// set a error response to fire in 2 sec
const showPeople = (e) => {
    e.preventDefault();

    setTimeout(() => {
    fetch(`${API}/people`);
    }, 2000)

    let title = document.querySelector('#display-info h3');
    if (!title) {
        alert('Please select a movie first');
        return;
    }
    title = title.textContent;
    peopleList.innerHTML = '';

    fetch(`${API}/people`)
    .then(result => result.json())
    .then(result => {
        for (let person of result) {
            for (let film of person.films) {
                let cFilm = film.split('/')
                if (cFilm[cFilm.length - 1] === fetchRes.id) {
                    let newLi = document.createElement('li');
                    newLi.textContent = person.name;
                    peopleList.append(newLi);
                }
            }
        }
    })
    .catch(err => alert(err));
}

