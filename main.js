const apiMovies = "https://ghibliapi.herokuapp.com/films";

let movies;

function getMovies() {
  fetch(apiMovies)
    .then((res) => res.json())
    .then((data) => {
      movies = data;
      // console.log(movies);
      getTitles(movies);
    });
}

//enclose getMovies function in a setTimeout so that getTitles runs first and populates the select with options
setTimeout(getMovies, 1000);

const dropDown = document.querySelector("select");

//this function will add all the movie titles as options into the select tag
function getTitles(movies) {
  for (let i = 0; i < movies.length; i++) {
    dropDown.innerHTML += `<option value=${movies[i].id}>${movies[i].title}</option>`;
  }
}

//create the different elements of the movie description
const title = document.createElement("h3");
const year = document.createElement("p");
const description = document.createElement("p");
const displayArea = document.querySelector("#display-info");

//when a movie is selected, add the relevant contents to the display area

//hold all selected movie id's to be used later in 'show people'
let optionsSelected = [];

dropDown.addEventListener("change", (event) => {
  movies.filter((el) => {
    if (event.target.value === el.id) {
      title.textContent = el.title;
      year.textContent = el.release_date;
      description.textContent = el.description;
      displayArea.append(title, year, description);
      optionsSelected.push(event.target.value);
      // console.log(optionsSelected)
    }
  });
});

//call the review form and ul list
const form = document.querySelector("form");
const reviewList = document.querySelector("#reviews ul");

//when a review is submitted the value(text) is saved to a variable and used to populate the li elements
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const userInput = event.target.review.value;

  //does not pass cypress
  if(userInput && document.querySelector('select').value === ''){
    alert("Please select a movie first")
  }else{
      movies.filter((el) => {
        if (title.textContent === el.title) {
          const listItem = document.createElement("li");
          listItem.innerHTML = `<strong>${el.title}:</strong> ${userInput}`;
          reviewList.append(listItem);
          form.reset();
        }
      });
  }
});

//call the reset button and remove all elements inside the ul
const resetButton = document.querySelector("#reset-reviews");

resetButton.addEventListener("click", () => {
  reviewList.remove();
});

///////SHOW PEOPLE////////

const peopleAPI = "https://ghibliapi.herokuapp.com/people";

const showPeople = document.querySelector("#show-people");

showPeople.addEventListener("click", () => {
    const peopleList = document.querySelector("section ol");

    fetch(peopleAPI)
    .then((res) => res.json())
    .then((data) => {
        for (let option of optionsSelected) {
          data.filter((person) => {
            person.films.filter((link) => {
              if (link.includes(option)) {
                const numberedItem = document.createElement("li");
                peopleList.append(numberedItem);
                numberedItem.textContent = person.name;
              }
            });
          });
        }
    });
});
