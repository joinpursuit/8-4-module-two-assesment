const API = 'https://ghibliapi.herokuapp.com';

const searchList = document.getElementById("searchList");
const movieInfo = document.getElementById("display-info");
const reviewForm = document.getElementById("reviewForm");
const resetButton = document.getElementById("reset-reviews");


searchList.addEventListener('change', (e) => selectMovie(e));
reviewForm.addEventListener('submit', (e) => submitReview(e));
resetButton.addEventListener('click', () => resetReviews());


let currentRes;

const start = () => {

    fetch(`${API}/films`)
            .then(res => res.json())
            .then(res => (res))
            .catch(err => alert(err));
};
setTimeout(start,1000)






const getMovie = (res) => {
    for (let i = 0; i < movie.length; i++) {
        const movie = document.createElement('option')
        movie.setAttribute('value', movie.id);
        movie.textContent = movie.title;
        searchList.append(movie);
    }
}

const selectMovie = (e) => {
    e.preventDefault();
    movieInfo.innerHTML = '';

    fetch(`${API}/films/${e.target.value}`)
        .then(res => res.json())
        .then(res => {
            const header = document.createElement('h3');
            header.textContent = res.title;

            const year = document.createElement('p');
            year.textContent = res.release_date;

            const description = document.createElement('p');
            description.textContent = res.description;
            
            movieInfo.append(header, year, description);

            currentRes = res;
        })
        .catch(err => alert(err));

}

const submitReview = (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    let title = document.querySelector('#display-info h3')
    console.log (searchList.value);

    if (!searchList.value) {
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

