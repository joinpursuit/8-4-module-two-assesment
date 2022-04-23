const apiMovies = "https://ghibliapi.herokuapp.com/films";

let movies;

function getMovies() {
  fetch(apiMovies)
    .then((res) => res.json())
    .then((data) => {
      movies = data;
    //   console.log(movies);
      getTitles(movies);
    });
}

setTimeout(getMovies, 1000);

const dropDown = document.querySelector("select");

function getTitles(movies) {
  for (let i = 0; i < movies.length; i++) {
    dropDown.innerHTML += `<option value=${movies[i].id}>${movies[i].title}</option>`;
  };
};

const title = document.createElement("h3");
const year = document.createElement("p");
const description = document.createElement("p");
const displayArea = document.querySelector("#display-info");

dropDown.addEventListener("change", (event) => {
  movies.filter((el) => {
    if (event.target.value === el.id) {
      title.textContent = el.title;
      year.textContent = el.release_date;
      description.textContent = el.description;
      displayArea.append(title, year, description);
    };
  });
});

const form = document.querySelector('form');
const reviewList = document.querySelector('#reviews ul');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const userInput = event.target.review.value;

    movies.filter((el) => {
        if( title.textContent === el.title){
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${el.title}:</strong> ${userInput}`
            reviewList.append(listItem);
        };
    });

    form.reset();
});
