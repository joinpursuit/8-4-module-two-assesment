const titleOptions = document.querySelector("#titles");
let apiFilms 

//Completed
titleOptions.addEventListener("change", (event) => {
  event.preventDefault();
  description(apiFilms, titleOptions.value)
  // showPeople(apiFilms, titleOptions.value)
  resetReviews()
})


//Completed
const apiCall = () => {
  const API = "https://ghibliapi.herokuapp.com/films";
  fetch(API)
  .then((response) => response.json())
  .then((json) => {
    apiFilms = json;
    apiFilms.forEach((film)=>{
      const title = document.createElement('option')
      title.textContent = film.title
      titleOptions.append(title)
      })
    })
    .catch((error) => console.log(error));
  }
  setTimeout(apiCall, 1000)


//Completed
const filmTitle = document.createElement('h3')
const filmDate = document.createElement('p')
filmDate.setAttribute('class','date')
const filmDescription = document.createElement('p')
filmDescription.setAttribute('class','description')
const section1 = document.querySelector('#display-info')
section1.append(filmTitle,filmDate,filmDescription)
const description = (apiFilms,title) => {
  const ol = document.querySelector('ol')
  ol.innerHTML = ''
  
  apiFilms.find((film)=>{
    if(film.title === title){
      const filmTitle = document.querySelector('h3')
      filmTitle.textContent = film.title
      const filmDate = document.querySelector('.date')
      filmDate.textContent = film.release_date
      //console.log(film)
      const filmDescription = document.querySelector('.description')
      filmDescription.textContent = film.description
      showPeople(apiFilms, title)
      }
    })
  }

//Completed
const review = document.querySelector('form')
const yourReview = document.querySelector('#review')
const submit = document.querySelector('.submit')

const ul = document.querySelector('ul')
const reviewForm = () => {

const filmTitle = document.querySelector('h3')
const select = document.querySelector('select')
let listReview
  review.addEventListener('submit',(event)=>{
    event.preventDefault()
    if(!select.value){
      alert('Please select a movie first')
      //yourReview.value = ''!filmTitle.textContent
      return
    }else if(!yourReview.value){
      alert('Please write a Review')
      return
    }else{
      listReview = document.createElement('li')
    }
    listReview.innerHTML = `<strong>${filmTitle.textContent}:</strong> ${yourReview.value}`
    ul.append(listReview)
    // resetReviews()
    review.reset()
    
  })
}
reviewForm()

//Completed
const resetReviews = () =>{
  const ul = document.querySelector('ul')

  const resetButton = document.querySelector('#reset-reviews') 
  resetButton.addEventListener('click',(event)=>{
    event.preventDefault()

    ul.innerHTML = ''
  })
}



const showPeople = (films, value) =>{
  const actorsButton = document.querySelector('#show-people')
  const ol = document.querySelector('ol')
  
  
  actorsButton.addEventListener('click',(event)=>{
  setTimeout(peopleTimeout, 1000)
  resetPeople()
    event.preventDefault()
    films.filter((film)=>{
      if(film.title === value){        
        film.people.forEach((actor)=>{
          const API = `${actor}`;
          fetch(API)
          .then((response) => response.json())
          .then((json) => {
            apiActor = json;

            if(!!apiActor.name){
              const li = document.createElement('li')
              li.textContent = apiActor.name
              console.log(apiActor.name)
              ol.append(li) 
            }
            })
            .catch((error) => console.log(error));
        })
      }
    })
  })
}

const resetPeople = () =>{
  const ol = document.querySelector('ol')
  ol.innerHTML = ''
}
const peopleTimeout = () =>{
  fetch('https://ghibliapi.herokuapp.com/people')
  
}