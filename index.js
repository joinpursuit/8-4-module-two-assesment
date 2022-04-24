let BASE_URL = 'https://ghibliapi.herokuapp.com/films';
let People_URL = 'https://ghibliapi.herokuapp.com/people';




const getFilms = []
const selectTitles = document.querySelector('select')



fetch(BASE_URL)
  .then((response) => response.json())
  .then((filmsData) => {
    console.log(filmsData);

    filmsData.forEach((filmData) => {
      getFilms.push(filmData);

      const option = document.createElement('option');

      option.value = filmData.title;

      option.textContent = filmData.title;

      selectTitles.append(option);
    });
  })
  .catch((e) => {
    errors(e);
  });




    selectTitles.addEventListener('change', () => {
      const getFilm = getFilms.find(
        (getFilm) => getFilm.title === selectTitles.value
      );

      const { release_date, title, description } = getFilm;

      const heading = document.createElement('h3');

      const date = document.createElement('p');

      const descriptionP = document.createElement('p');

      heading.textContent = title;
      date.textContent = release_date;
      descriptionP.textContent = description;

      document
        .querySelector('#display-info')

        .replaceChildren(heading, date, descriptionP);
    });

     const form = document.querySelector('#review')
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const reviewDesc = document.createElement('li');
      const reviewTitle = document.createElement('strong');

      reviewTitle.textContent = selectTitles.value + ':';

      const review = document.createTextNode(event.target.review.value);

      reviewDesc.append(reviewTitle, review);

      document.querySelector('ul').append(reviewDesc);

   form.reset();
    });

   const button = document.getElementById('reset-reviews');
   button.addEventListener('click', () => {
     document.querySelectorAll('ul li').forEach((item) => item.remove());
   });


const peopleButton = document.querySelector('#show-people')
const peopleOL = document.querySelector('ol')

peopleButton.addEventListener('click', (event)=>{
    event.preventDefault();
    peopleOL.innerHTML = ""

let movieTitle = selectTitles.value
  fetch(People_URL)
  .then((response) => {
    return response.json();
  })
 
      });
  






