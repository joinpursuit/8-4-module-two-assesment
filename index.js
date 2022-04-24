const BASE_URL = "https://ghibliapi.herokuapp.com/films";

const selectTag = document.querySelector("select");
let option = document.querySelector("option");
const displayInfoTag = document.querySelector("#display-info");
const title = document.getElementById("title-h3");
const year = document.getElementById("year");
const description = document.getElementById("description");
const form = document.querySelector("form");

let movies;

const getMovies = () => {
  fetch(`${BASE_URL}`)
    .then((response) => response.json())
    .then((json) => {
      movies = json;
      console.log(movies);
      getOptions(json);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getMovieDescription = (movieSelected) => {
  const displayInfoTag = document.querySelector("#display-info");
  title.innerHTML = `${movieSelected.title}`;
  year.innerHTML = `${movieSelected.release_date}`;
  description.innerHTML = `${movieSelected.description}`;

  displayInfoTag.appendChild(title);
  displayInfoTag.appendChild(year);
  displayInfoTag.appendChild(description);
};

const getOptions = (movies) => {
  movies.forEach((movie) => {
    //movie title is a string
    const movieTitle = movie.title;
    const movieId = movie.id;
    const option = document.createElement("option");

    option.textContent = movieTitle;
    option.setAttribute("value", movieId);
    selectTag.appendChild(option);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector("#review").value;
  addListItems(input);
  form.reset();
});

const addListItems = (input) => {
  const li = document.createElement("li");

  li.innerText = input;
  document.querySelector("ul").appendChild(li);
};

// event listeners
//Domcontentloaded listens to the whole app/browser window as soon as page loads it calls the getmovie function
document.addEventListener("DOMContentLoaded", getMovies);

selectTag.onchange = () => {
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id === selectTag.value) {
      getMovieDescription(movies[i]);
      return;
    }
  }
};
