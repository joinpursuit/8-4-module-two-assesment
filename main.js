
const API = 'https://ghibliapi.herokuapp.com/films';


const reviewList = document.querySelector('#reviews ul');
const resetButton = document.querySelector('#reset-reviews');
const peopleButton = document.querySelector('#show-people');
const peopleList = document.querySelector('#peopleList');
const movieList = document.querySelector('#movieList');
const movieDetails = document.querySelector('#display-info');
const reviewForm = document.querySelector('#reviewForm');


//interactive listeners of page
resetButton.addEventListener('click', () => resetReviews());
peopleButton.addEventListener('click', (e) => showPeople(e));
movieList.addEventListener('change', (e) => toggleMovie(e));
reviewForm.addEventListener('submit', (e) => submitReview(e));





let ApiResponse;
    fetch(`${API}`)
            .then(Response => Response.json())
            .then(Response => popList(Response))
            .catch(error => alert(error));



const popList = (response) => {
    for (let movie of response) {
        const Movies = document.createElement('option')
        Movies.setAttribute('value', movie.id);
        Movies.textContent = movie.title;
        movieList.append(Movies);
    }
}

const toggleMovie = (e) => {
    e.preventDefault();
    movieDetails.innerHTML = '';

    fetch(`${API}${e.target.value}`)
        .then(res => res.json())
        .then(res => {
            const header = document.createElement('h3');
            header.textContent = res.title;

            const year = document.createElement('p');
            year.textContent = res.release_date;

            const description = document.createElement('p');
            description.textContent = res.description;
            
            movieDetails.append(header, year, description);

            ApiResponse = res;
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

    const strong = document.createElement('strong');
    strong.textContent = `${title}: `;

    const reviewLi = document.createElement('li');
    reviewLi.append(strong);
    reviewLi.append(review);
    reviewList.append(reviewLi);
}


