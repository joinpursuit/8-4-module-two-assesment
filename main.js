const movies = document.querySelector("#movies");
const movieInfo = document.querySelector("#display-info");
const title = document.querySelector("#title");
const releaseYear = document.querySelector("#release-year");
const description = document.querySelector("#description");
const review = document.querySelector("#review-form")
const reviews = document.querySelector("#review-list")


fetch("https://ghibliapi.herokuapp.com/films")
    .then(response => response.json())
    .then(response => {
        response.forEach((movie) => {
            const option = document.createElement("option");
            option.setAttribute("value", movie.id);
            option.innerHTML = movie.title;
            movies.append(option);
        });
    })

movies.addEventListener("change", (e) => {
    e.preventDefault();
    fetch(`https://ghibliapi.herokuapp.com/films/${movies.value}`)
    .then(response => response.json())
    .then( response => {
        title.innerHTML = response.title;
        releaseYear.innerHTML = response.release_date;
        description.innerHTML = response.description;
    })
})

review.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = e.target.review.value;
    if(name){
        const reviewItem = document.createElement("li");
        reviewItem.innerHTML = `<strong>${title.innerHTML}: </strong>${name}`;
        reviews.append(reviewItem)
    }

})

