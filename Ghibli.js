const header = document.querySelector(".logo");




const movieSelection = document.querySelector("#movie-selection");

const displayMovie = document.querySelector("#movie-heading");
const displayYear = document.querySelector("#movie-year");
const displayDetails = document.querySelector("#movie-details");
const moviePeople = document.querySelector("#people-list");





const m_url = "https://ghibliapi.herokuapp.com";
let movieTitles = [];

fetch(`${m_url}/films`)
  .then((data) => data.json())

  .then((movies) => {
 
    movies.forEach((movie) => {
        const selectMovie = document.createElement("option"); 
        selectMovie.value = movie.id;
        selectMovie.textContent = movie.title;
        movieSelection.append(selectMovie);
  
    })
    
  
  })
  .catch((e) => alert(e));

  //people
  let person;
  fetch(`${m_url}/people`)
  .then((data) => data.json())

  .then((people) => {
 
    people.forEach((person) => {
      let personName = '';
        person.value = person.id;
        personName.textContent = person.name;
        console.log(person.name);   
  
    })



document.querySelector("#movie-selection").addEventListener("change", (event) => {
   
    fetch(`${m_url}/films/${event.target.value}`)
    .then(response => response.json())
    .then((movie) => {
      
        displayMovie.textContent = movie.title;
       displayDetails.textContent = movie.description;
       displayYear.textContent = movie.release_date;

     function getMoviePeople(people)  {
      return people.filter(person => person.films.includes(displayMovie));
         
    
       let list = document.createElement("li");
       list.innerText = person.name;
       moviePeople.appendChild(list);
     
     }           
});
      
});  
});
   




    document.querySelector("#people").addEventListener("change", (event)  => { 

          moviePeople.appendChild(list);
                
          
       }); 
  
 
  

     


 

//review

const reviewForm = document.querySelector("#reviews-form");
const reviews = document.querySelector("#reviews-list");

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let text = event.target.review.value;
  console.log(text);
  let newReview = document.createElement("li");
  newReview.setAttribute("id", "newItem");
      newReview.textContent = text;  
      reviews.append(newReview);
      reviewForm.reset();
      let resetReviews = document.querySelector("#reset-reviews");
      resetReviews.addEventListener("click", function() {
          newReview.remove()
      })
  });
  
