const BASE_URL = "https://ghibliapi.herokuapp.com/films";

const movTitles = document.querySelector("#movTitles");
const filmName = document.querySelector("#filmName");
const relYear = document.querySelector("#relYear");
const filmDesc = document.querySelector("#filmDesc");

const userReview = document.querySelector("#userRev");
const form = document.querySelector("form");
const input = document.querySelector("#review");

const myUl = document.querySelector("ul");

const showReview = document.querySelector("#reviews");
const peopleList = document.querySelector("#people");
const OlList = document.querySelector("#list");

const fetchData = () => {
  fetch(`${BASE_URL}`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      response.forEach((film) => {
        let createOpt = document.createElement("option");
        createOpt.setAttribute("value", film.id);
        createOpt.innerHTML = film.title;
        movTitles.append(createOpt);
      });
    });
};

movTitles.addEventListener("change", (event) => {
  fetch(`${BASE_URL}/${movTitles.value}`)
    .then((response) => response.json())
    .then((response) => {
      if (movTitles.value) {
        filmName.innerHTML = response.title;
        relYear.innerHTML = response.release_date;
        filmDesc.innerHTML = response.description;
      } else {
        filmName.innerHTML = "";
        relYear.innerHTML = "";
        filmDesc.innerHTML = "";
      }
    });
});

userReview.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!movTitles.value) {
    alert("Please select a movie first");
  } else {
    let usRev = document.createElement("li");
    usRev.classList.add("usRev");
    usRev.innerHTML = `<b>${filmName.innerText}.</b>: ${input.value}`;
    myUl.append(usRev);
    form.reset();
  }
});

showReview.addEventListener("click", (event) => {
  event.preventDefault();
  const resetRev = document.querySelectorAll(".usRev");
  resetRev.forEach((item) => {
    item.remove();
  });
});

peopleList.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("https://ghibliapi.herokuapp.com/people/")
    .then((response) => response.json())
    .then((response) => {
      let eachPerson = response.filter((person) => {
        return (person.id = movTitles.value);
      });
      eachPerson.forEach((person) => {
        let indName = document.createElement("li");
        indName.innerHTML = person.name;
        OlList.append(indName);
      });
    });
});

//

setTimeout(fetchData, 1000);
