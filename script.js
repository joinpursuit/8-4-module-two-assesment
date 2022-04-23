let data;

function fetchTitles() {
  fetch("https://ghibliapi.herokuapp.com/films")
    .then((response) => response.json())
    .then((json) => (data = json))
    .then((data) => displayTitles(data));
}

function displayTitles(data) {
  console.log(data);
  const select = document.querySelector("select");
  data.forEach((film) => {
    const options = document.createElement("option");
    options.setAttribute("value", film.title);
    options.textContent = film.title;
    select.append(options);
  });
  return data;
}

const select = document.querySelector("select");
select.addEventListener("change", (event) => {
  document.getElementById("display-info").textContent = "";
  const selection = document.getElementById("titles").value;
  const h3 = document.createElement("h3");
  const releaseYear = document.createElement("p");
  const description = document.createElement("p");
  h3.textContent = selection;
  data.forEach((film) => {
    if (film.title === selection) {
      releaseYear.textContent = film.release_date;
      description.textContent = film.description;
    }
  });
  document.getElementById("display-info").append(h3, releaseYear, description);
  document.querySelector('ol').textContent = ''
});

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const selection = document.getElementById("titles").value;
  const review = event.target.review.value;
  const reviewsList = document.querySelector("#reviews ul");
  const li = document.createElement("li");
  if (selection === "") {
    alert("Please select a movie first");
  } else {
    li.innerHTML = `<strong>${selection}:</strong>${review}`;
    reviewsList.append(li);
    event.target.review.value = ''
  }
});

const reset = document.querySelector('#reset-reviews')
reset.addEventListener('click', (event) => {
  document.querySelector('ul').textContent = ''
})

const people = document.querySelector('#show-people')
people.addEventListener('click', (event) => {
  const ol = document.querySelector('ol')
  const selection = document.getElementById("titles").value;
  fetch('https://ghibliapi.herokuapp.com/people')
  .then((response) => response.json())
  .then((response) => {
    data.forEach((film) => {
      if(film.title === selection){
        response.forEach((people) =>{
          if(people.films[0] === `https://ghibliapi.herokuapp.com/films/${film.id}`){
            const li = document.createElement('li')
            li.textContent = people.name
            ol.append(li)
          }
        })
      }
    })
  })
})




setTimeout(fetchTitles, 1000);
