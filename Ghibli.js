const header = document.querySelector(".logo");

const movieSelection = document.querySelector("#movie-selection");
const displayMovie = document.querySelector("#movie-details");
displayMovie.setAttribute("style", "strong");
const displayYear = document.querySelector("#movie-year");
const displayDetails = document.querySelector("#display-details");
const moviePeople = document.querySelector("#people-list");

const m_url = "https://ghibliapi.herokuapp.com";
let movieTitles = [];

fetch(`${m_url}/films`)
  .then((data) => data.json())

  .then((movies) => {
    movies.forEach((movie) => {
      const selectMovie = document.createElement("option");
      selectMovie.setAttribute("id", "option-value");
      selectMovie.value = movie.id;
      selectMovie.textContent = movie.title;
      movieSelection.append(selectMovie);
      // let moviePeopleArr = movie.people;
      // const peopleNames = moviePeopleArr.filter(people => people.name);
      // console.log(peopleNames);
  })
})
  .catch((e) => alert(e));


//people
let person;
fetch(`${m_url}/people`)
  .then((data) => data.json())

  .then((people) => {
    people.forEach((person) => {
      let personName = "";
      person.value = person.id;
  
      personName.textContent = person.name;
    //   console.log(person.name);
    });

    document
      .querySelector("#movie-selection")
      .addEventListener("change", (event) => {
        fetch(`${m_url}/films/${event.target.value}`)
          .then((response) => response.json())
          .then((movie) => {
            displayMovie.textContent = movie.title;
            displayDetails.textContent = movie.description;
            displayYear.textContent = movie.release_date;

          });

      });
  });

document.querySelector("#people").addEventListener("change", (event) => {
  moviePeople.appendChild(list);
});

//review
const onFail = (error) => {
    error = "Please make a selection";
    error.target.reset();
}
const reviewForm = document.querySelector("#review");
const reviews = document.querySelector("#reviews-list");

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let input = document.querySelector("#option-value")
  if(!input) {
     onFail(error);
  } else {
    let text = event.target.review.value;
  let newReview = document.createElement("li");
//   newReview.setAttribute("id", "newItem");
  newReview.textContent = text;
  reviews.append(newReview);
  console.log(text);
  reviewForm.reset();
 
  let resetReviews = document.querySelector("#reset-reviews");
  resetReviews.addEventListener("click", function () {
    newReview.remove();
 
  });
}
});
