const selectTitles = document.querySelector('#titles');
const option = document.createElement('option');
const value = document.createElement('value');
const form = document.querySelector('form');
const inputYourReview = document.querySelector('#review').text;
const submitReview = document.querySelector('#submit-review');
let movieTitle;
let movieID;
let allGhibliFilms;
const heading3 = document.createElement('h3');
const paragraph1 = document.createElement('p');
const displayInfo = document.querySelector('#display-info');
const ul = document.querySelector('#reviews ul');
const li = document.createElement('li');
const strong = document.createElement('strong');
const resetButton = document.querySelector('#reset-reviews');

const getData = () => {
  fetch('https://ghibliapi.herokuapp.com/films')
  .then((response) => response.json())
  .then((json) => {
    allGhibliFilms = json;
    for(let i = 0; i < allGhibliFilms.length; i++) {
      movieTitle = allGhibliFilms[i].title;
      movieID = allGhibliFilms[i].id;
      option.setAttribute('value', `${movieID}`);
      option.textContent = movieTitle;
      selectTitles.append(option);
      selectTitles.innerHTML += selectTitles;
    }

  selectTitles.addEventListener('change', (event) => {
    // I got the solution for getting text from a particular option from the following website: https://www.codegrepper.com/code-examples/javascript/how+to+get+the+option+text+from+dropdown+with+option+value+javascript 

    let filmTitle = selectTitles.options[selectTitles.selectedIndex].text;
    
    displayInfo.innerHTML = `<h3>${filmTitle}</h3`;
      for(let i = 0; i < allGhibliFilms.length; i++) {
        if(filmTitle === allGhibliFilms[i].title) {
          displayInfo.innerHTML += `<p>${allGhibliFilms[i].release_date}</p>`
          displayInfo.innerHTML += `<p>${allGhibliFilms[i].description}</p>`
        }
      }

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      ul.append(li);
      console.log(ul)
    
      console.log(filmTitle)
      li.append(strong);
      li.innerHTML = `<strong>${filmTitle}</strong>: ${inputYourReview}`;
      console.log(li.innerHTML)
    })


  })
})

}

      


  
setTimeout(getData, 1000);


