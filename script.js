const titles = document.querySelector("#titles");

const movieName = document.querySelector("#movie-name");
const year = document.querySelector("#year");
const description = document.querySelector("#description");

const sec2 = document.querySelector("#sec2");
const form = document.querySelector("form");
const review = document.querySelector("#review");
const reviews = document.querySelector("#reviews");
const reviewsList = document.querySelector("#reviews-list");
const peopleList = document.querySelector("#people-list")

const sec4 = document.querySelector("#sec4");

function getData(){
fetch("https://ghibliapi.herokuapp.com/films")
  .then((response) => response.json())
  .then((response) => {
    response.forEach((movie) => {
      let option = document.createElement("option");
      option.setAttribute("value", movie.id);
      option.innerHTML = movie.title;
      titles.append(option);
    });
  });
}

titles.addEventListener("change", (e) => {
  fetch(`https://ghibliapi.herokuapp.com/films/${titles.value}`)
    .then((response) => response.json())
    .then((response) => {
    if(titles.value)
      movieName.innerHTML = response.title;
      year.innerHTML = response.release_date;
      description.innerHTML = response.description;
    });
});

sec2.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!titles.value) {
    alert("Please select a movie first");
  } else {
    let userReview = document.createElement("li");
    userReview.classList.add("userReview")
    userReview.innerHTML = `<b>${movieName.innerText}.</b>: ${review.value}`;
    reviewsList.append(userReview);
    form.reset();
  }
});

reviews.addEventListener("click", (e) => {
  e.preventDefault();
  const allLi = document.querySelectorAll(".userReview");
  allLi.forEach((li) => {
    li.remove();
  });
});

sec4.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("https://ghibliapi.herokuapp.com/people/")
    .then((response) => response.json())
    .then((response) => {
      let people = response.filter((person) => {
        return (person.id = titles.value);
      });
      people.forEach((person) => {
        let name = document.createElement("li");
        name.innerHTML = person.name
        peopleList.append(name)
      })
    });
});

setTimeout(getData, 1000)