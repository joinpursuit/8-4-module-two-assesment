let link = "https://ghibliapi.herokuapp.com/films";

let apiData;
function getApiData() {
  fetch(link)
    .then((response) => response.json())
    .then((json) => (apiData = json))
    .then((apiData) => getFilmName(apiData));
}

getApiData();
function getFilmName(apiData) {
  const title = [];
  for (let i = 0; i < apiData.length; i++) {
    for (let j = 0; j < apiData[i].title.length; j++) {
      if (apiData[i].title) {
        category.push(apiData[i].title[j]);
      }
    }
  }
}
const titleSet = new Set(title);
  const options = document.querySelector("select");
  titleSet.forEach((title) => {
    const option = document.createElement("option");
    option.setAttribute("value", `${title}`);