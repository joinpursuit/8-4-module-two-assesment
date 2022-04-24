const BASE_URL = "https://ghibliapi.herokuapp.com"
let data;
function getTitles() {
     fetch(`${BASE_URL}/films`)
      .then((response) => response.json())
      .then((json) => {
          data = json
          movieTitles(data)
        });
};

function movieTitles(data) {
const titles = document.querySelector('#titles');
 data.forEach((film) => {
    const options = document.createElement('option');
      options.setAttribute('value', film.title);
      options.textContent = film.title;
      titles.append(options);
    });
    return data;
};
  
  const selectOption = document.querySelector("select")
  selectOption.addEventListener('change', (e) => {
    document.getElementById('display-info').textContent = "";
    const selection = document.getElementById('titles').value
    const h3 = document.createElement('h3');
    const releaseYear = document.createElement('p');
    const description = document.createElement('p');
    h3.textContent = selection;
    data.forEach((film) => {
      if (film.title === selection) {
        releaseYear.textContent = film.release_date;
        description.textContent = film.description;
      }
    });
    document.getElementById('display-info').append(h3, releaseYear, description)
    document.querySelector('ol').textContent = ''
  });
  
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    const title = document.getElementById('titles').value;
    const review = review.value;
    const reviewList = document.querySelector('#reviews ul');
    const li = document.createElement('li');
    if (title === "") {
      alert('Please select a movie first');
    } else {
      li.innerHTML = `<strong>${selection}:</strong>${review}`;
      reviewList.append(li);
      review.value = ''
    }
  });
  
  const reset = document.querySelector('#reset-reviews')
  reset.addEventListener('click', (e) => {
  document.querySelector('ul').textContent = ''
  })
  
  const people = document.querySelector('#show-people')
  people.addEventListener('click', (e) => {
    const selection = document.getElementById('titles').value;
    fetch(`${BASE_URL}/people`)
    .then((response) => response.json())
    .then((response) => {
      data.forEach((film) => {
        if(film.title === selection){
          response.forEach((people) =>{
            if(people.films[0] === `${BASE_URL}/films/${film.id}`){
              const li = document.createElement('li')
              li.textContent = people.name
              const ol = document.querySelector('ol')
              ol.append(li)
            };
          });
        };
      });
    });
  });

  setTimeout(getTitles, 1000)




   




    
    