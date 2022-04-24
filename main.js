const selectMovie = document.querySelector('#titles');
const idValue = document.createElement('value');
const movieOptions = document.createElement('option');







const BASE_URL = "https://ghibliapi.herokuapp.com/films";

fetch(BASE_URL)
.then((response) => response.json())
.then((json) => {
   const ghibliFilms = json;
   
   for(let i = 0; i < ghibliFilms.length; i++) {
       let titleMovie = ghibliFilms[i].title;
       let movieId = ghibliFilms[i].id;
       console.log(titleMovie);
       console.log(movieId);
       movieOptions.setAttribute('value', `${movieId}`);
       movieOptions.textContent = titleMovie;
       selectMovie.append(movieOptions);
       selectMovie.innerHTML += selectMovie;
   }
   selectMovie.addEventListener('change',(event) => {
       // researched change event: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
        let titleOfFilm = selectMovie.options[selectMovie.selectedIndex].text
        // researched selectedIndex : https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/selectedIndex
   })
})
