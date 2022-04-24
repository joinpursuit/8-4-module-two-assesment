const movies = document.querySelector("#movies");
const movieInfo = document.querySelector("#display-info");
const title = document.querySelector("#title");
const releaseYear = document.querySelector("#release-year");
const description = document.querySelector("#description");
const review = document.querySelector("#review-form");
const reviews = document.querySelector("#reviews");
const peopleSection = document.querySelector("#people-section");
const peopleList = document.querySelector("#people-list");


const getData = () => {
    fetch("https://ghibliapi.herokuapp.com/films")
      .then((response) => response.json())
      .then((response) => {
        response.forEach((movie) => {
          const option = document.createElement("option");
          option.setAttribute("value", movie.id);
          option.innerHTML = movie.title;
          movies.append(option);
        });
      });  
}

movies.addEventListener("change", (e) => {
  e.preventDefault();
  fetch(`https://ghibliapi.herokuapp.com/films/${movies.value}`)
    .then((response) => response.json())
    .then((response) => {
      title.innerHTML = response.title;
      releaseYear.innerHTML = response.release_date;
      description.innerHTML = response.description;
    });
});

review.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = e.target.review.value;
  if (!movies.value){
      alert("Please select a movie first")
  } else {
    const reviewItem = document.createElement("li");
    reviewItem.classList.add("review-items");
    reviewItem.innerHTML = `<strong>${title.innerHTML}: </strong>${name}`;
    reviews.append(reviewItem);
    review.reset();
  }
});

peopleSection.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("https://ghibliapi.herokuapp.com/people/")
    .then((response) => response.json())
    .then((response) => {
      let persons = response.filter((person) => {
          return person.id = movies.value});
      persons.forEach((person) => {
        let character = document.createElement("li");
        character.innerHTML = person.name;
        peopleList.append(character);
      });
    });
});

reviews.addEventListener("click", (e) => {
    e.preventDefault();
    const allReviews = document.querySelectorAll(".review-items");
    allReviews.forEach(review => {
        review.remove()});
})
setTimeout(getData, 1000)
