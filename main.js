const headerImage = document.createElement("img");
headerImage.setAttribute("src", "./images/ghibli-logo.png");
headerImage.setAttribute("alt", "Ghibli logo");
const header = document.querySelector("header");
header.append(headerImage);

const base_url = "https://ghibliapi.herokuapp.com/films";
fetch(base_url)
  .then((response) => response.json())
  .then((response) => {
    movieData(response);
  });

function movieData(response) {
  const titles = document.querySelector("#titles");
  for (let film of response) {
    let option = document.createElement("option");
    option.setAttribute("value", film.id);
    option.textContent = film.title;
    titles.append(option);
  }
  titles.addEventListener("change", (event) => {
    const details = document.querySelector("#display-info");
    const h3 = document.createElement("h3")
    const p1 =document.createElement("p") 
    const p2 =document.createElement("p") 
    for (let film of response) {
      if (film.id === event.target.value) {
        h3.textContent = film.title;
        p1.textContent = film.release_date
        p2.textContent = film.description; 
      }
      details.prepend(h3,p1,p2)
    }
  });
}
