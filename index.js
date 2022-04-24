const API_URL = "https://ghibliapi.herokuapp.com/films";
const PEOPLE_URL = "https://ghibliapi.herokuapp.com/people";

const addReview = document.getElementById("addReview");
const reviewList = document.getElementById("reviewList");
const reviewReset = document.getElementById("reset-reviews");

const movieDetails = document.getElementById("display-info");
const movieBox = document.querySelector("select");

const peopleButton = document.getElementById("show-people");
const listOfPeople = document.getElementById("people");

setTimeout(() => {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => boxPopuli(data))
        .catch((error) => console.log("WE GOT AN ERRAH HEAH:", error));
}, 1000);
//Setting my fetch to wait a dang second is the only way I can get cypress to not freak out

//Setting my fetch to wait a dang second is the only way I can get cypress to stop freaking out

const boxPopuli = ((data) => {
    console.log(data);
    for (let movie of data) {
        let option = document.createElement("option");
        option.setAttribute("value", movie.id);
        option.textContent = movie.title;
        movieBox.appendChild(option);
    }
});

movieBox.addEventListener("change", (e) => {
    e.preventDefault();
    chooseMovie(e);
    let neutronBomb = document.querySelectorAll("ol li");
    console.log(neutronBomb);
    neutronBomb.forEach((x) => {
        x.remove();
    });
});

const chooseMovie = (e) => {
    movieDetails.textContent = "";
    fetch(`${API_URL}/${e.target.value}`)
        .then(res => res.json())
        .then(res => {
            let header = document.createElement('h3');
            header.textContent = res.title;

            let year = document.createElement('p');
            year.textContent = res.release_date;

            let movieInfo = document.createElement('p');
            movieInfo.textContent = res.description;

            movieDetails.append(header, year, movieInfo);
        })
        .catch(error => console.log(error));
};

addReview.addEventListener("submit", (e) => {
    e.preventDefault();
    let selectedMovie = movieBox.selectedIndex;

    let strong = document.createElement("strong");

    strong.textContent = movieBox[selectedMovie].textContent + ": ";

    let reviewLi = document.createElement("li");
    reviewLi.append(strong);
    if (movieBox[selectedMovie].textContent === "") {
        alert("Please select a movie first");
    } else if (e.target.review.value === "") {
        alert("Please input a review");
    } else {
        reviewLi.append(`: ${e.target.review.value}`);
        reviewList.append(reviewLi);
        e.target.review.value = "";
    }
});

reviewReset.addEventListener("click", (e) => {
    e.preventDefault();
    let allReviews = document.querySelectorAll("ul li");
    for (let review of allReviews) {
        review.remove();
    }
});

peopleButton.addEventListener("click", (e) => {
    let selectedFilm = movieBox[movieBox.selectedIndex];
    fetch(PEOPLE_URL)
        .then (res => res.json())
        .then (people => {            
            for (let person of people){ //Individual people
                let personLI = document.createElement("li");                
                console.log(person);
                for (let film of person.films){ //Films of people                    
                    let split = film.split("/");                    
                    for (let x of split){ //Breaking the film array                        
                        if (x===selectedFilm.getAttribute('value')) {
                            personLI.textContent = person.name;
                            console.log('gottem');
                            listOfPeople.append(personLI);
                        }
                    }
                }
            }
        })
});