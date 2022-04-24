let BASE_URL = "https://ghibliapi.herokuapp.com/";
let films;
const firstSection = document.querySelector("#display-info");
const movieSelector = document.querySelectorAll("#titles");
const h3 = document.createElement("h3");
const pYear  = document.createElement("p");
const pDes = document.createElement("p");
let value = "films"
let movieId;


fetch(`${BASE_URL}${value}`)
  .then((response) => response.json())
  .then((response) => {
   films = response;
   dropDown(films); 
   getPeople();
  });


function dropDown(films) {
    let dropDownO = document.querySelector("#titles");
    let allFilms = [];
    let movieName;
    films.forEach((film) => {
      let moviesT = film.title;
          allFilms.push(moviesT);
    });
    
    allFilms.map((mov) => {
      let option = document.createElement("option");
      option.textContent = mov;
      dropDownO.append(option);
    });
        dropDownO.addEventListener("change",(e) => {
             
            console.log(e.target.value);
            const firstSection = document.querySelector("#display-info");
            firstSection.append(h3);
            movieName = e.target.value;
            h3.textContent = movieName;
            let index = allFilms.indexOf(e.target.value);
            
            pYear.textContent = films[index].release_date;
            pDes.textContent = films[index].description;
            firstSection.append(pYear);
            firstSection.append(pDes);
            movieId = films[index].id;
            console.log(movieId)
            e.preventDefault();
             
        });
        reviewsForm(movieName);
    }
    function reviewsForm(movieName) {  
    const reviewForm = document.querySelector("#reviewForm");
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault(); 
        if (h3.innerHTML === "") {

            window.alert('You need to select a movie in order to write a review');
       
        } else {
        
        const ul = document.querySelector("#reviews ul")
        const pRev = document.createElement("p");
        const strong = document.createElement("strong"); 
        const li = document.createElement("li");
        const reviewI = document.querySelector("#review");
        let input = reviewI.value;
        
        strong.textContent = h3.innerHTML +":";
        pRev.textContent = ` ${input}`;
        pRev.prepend(strong);
        console.log(input);
        li.append(pRev);
        ul.append(li);
       reviewForm.reset();
        }
      });
      resetReviews();
    }
    function resetReviews() {
    const resetBtn = document.querySelector("#reset-reviews");
    const ul = document.querySelector('#reviews ul');
    resetBtn.addEventListener("click",(event)=> {
     ul.textContent = "";
    });
  }

  function getPeople(){
    value = "people";
    fetch(`${BASE_URL}${value}`)
  .then((response) => response.json())
  .then((response) => {
   people = response;
  });
    const showPeople = document.querySelector("#show-people");
    showPeople.addEventListener("click", event =>{
      console.log(movieId);
      people.forEach(person =>{
        console.log(person);
      })
     
      
      
    })
  }
 
    




