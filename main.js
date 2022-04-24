//Links to retrieve data from API
const BASE_URL = "https://ghibliapi.herokuapp.com/";
const film_url = `${BASE_URL}films/`;
const people_url = `${BASE_URL}people/`;

//DOM element - dropdown menu to select any movie from a list of all movies' titles
const select = document.querySelector("select");
const dropdown = document.getElementById("dropdown");

//Created elements for the Movies' titles, release years and descriptions
const display = document.getElementById("display-info");
const h3Title = document.createElement("h3");
const releaseYear = document.createElement("p");
const movieDescription = document.createElement("p");

//DOM Element - Form used to Submit Reviews for movies
const reviewForm = document.querySelector("form");

//Shows the list of people's names related to the movie
const showPeople = document.getElementById("show-people");
const peopleNames = document.querySelector("ol");

const ul = document.querySelector("ul");

fetch(`${film_url}`)
  .then((response) => response.json())
  .then((json) => {
    for (let e of json) {
      //Populate the list of all movie titles in the dropdown menu's Select Box
      const option = new Option(e.title, e.id);
      option.textContent = e.title;
      option.value = e.id;
      dropdown.append(option);

      dropdown.addEventListener("change", (event) => {
        event.preventDefault();
        let filmId = event.target.value;
        for (let movie of json) {
          if (filmId === movie.id) {
            display.textContent = "";
            h3Title.textContent = movie.title;
            releaseYear.textContent = movie.release_date;
            movieDescription.textContent = movie.description;
            display.append(h3Title, releaseYear, movieDescription);
            peopleNames.textContent = "";
          }
        }

        showPeople.addEventListener("click", (event) => {
          event.preventDefault();
          fetch(`${people_url}`)
            .then((response) => response.json())
            .then((people) => {
              people.innerHTML = "";
              for (let person of people) {
                for (let film of person.films) {
                  if (film === `${film_url}${filmId}`) {
                    let list = document.createElement("li");
                    list.textContent = person.name;
                    peopleNames.append(list);
                  }
                }
              }
            });
        });
      });
    }
    generateReviews(json);
  })
  .catch((error) => {
    console.log(error);
  });

/**
 * generateReviews - function to display reviews by users in the Reviews section
 * 1) Array of objects retrieved from API with all movies' information
 * 2) An alert message - shown if select box has no movie title & user presses Submit Review button
 */
const generateReviews = (json) => {
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let reviewInput = document.getElementById("review").value;
    if (dropdown.value === "") {
      alert("Please select a movie first"); //Create alert popup window
    } else {
      let movie = json.find((movie) => movie.id === dropdown.value);
      let li = document.createElement("li");
      li.innerHTML = `<strong>${movie.title}:</strong> ${reviewInput}`;
      ul.append(li);
      reviewForm.reset();
    }
  });
};

//Reset Button to remove all submitted reviews
const resetReview = document.getElementById("reset-reviews");
resetReview.addEventListener("click", (event) => {
  event.preventDefault();
  ul.textContent = "";
});
