const headerImage = document.createElement("img");
headerImage.setAttribute("src", "./images/ghibli-logo.png");
headerImage.setAttribute("alt", "Ghibli logo");
const header = document.querySelector("header");
header.append(headerImage);

const films_url = "https://ghibliapi.herokuapp.com/films";
function titlesPromise() {
  fetch(films_url)
    .then((response) => response.json())
    .then((json) => (response = json))
    .then((response) => {
      movieData(response);
    });
}

function movieData(response) {
  const select = document.querySelector("select");
  for (let film of response) {
    let option = document.createElement("option");
    option.setAttribute("value", film.title);
    option.textContent = film.title;
    select.append(option);
  }
  select.addEventListener("change", (event) => {
    const details = document.querySelector("#display-info");
    details.textContent = "";
    const h3 = document.createElement("h3");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    for (let film of response) {
      if (film.title === event.target.value) {
        h3.textContent = film.title;
        p1.textContent = film.release_date;
        p2.textContent = film.description;
      }
      details.append(h3, p1, p2);
    }
  });
  const form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const titles = document.querySelector("#titles").value;
    const review = event.target.review.value;
    const listReview = document.querySelector("#reviews ul");
    const li = document.createElement("li");
    if (titles === "") {
      alert("Please select a movie first");
    } else if (review === "") {
      alert("Please write review");
    } else {
      const strong = document.createElement("strong");
      strong.textContent = `${titles}: `;
      li.append(strong, review);
      listReview.append(li);
      form.reset();
    }
  });
  const reset = document.querySelector("#reset-reviews");
  reset.addEventListener("click", () => {
    const resetReviews = document.querySelector("ul");
    resetReviews.textContent = "";
  });
}

const people_url = "https://ghibliapi.herokuapp.com/people";

const people = document.querySelector("#show-people");
people.addEventListener("click", (event) => {
  event.preventDefault();
  const ol = document.querySelector("ol");
  const titles = document.querySelector("#titles").value;
  fetch(people_url)
    .then((response) => response.json())
    .then((data) => {
      for (let film of response) {
        if (film.title === titles) {
          for (let people of data) {
            if (people.films[0] === `${films_url}/${film.id}`) {
              const peopleLi = document.createElement("li");
              peopleLi.textContent = people.name;
              ol.append(peopleLi);
            }
          }
        }
      }
    });
});

setTimeout(titlesPromise, 1000);
