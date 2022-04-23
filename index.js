const API_URL = "https://ghibliapi.herokuapp.com/films";
const PEOPLE_URL = "https://ghibliapi.herokuapp.com/people";

const addReview = document.getElementById("addReview");
const reviewList = document.getElementById("reviewList");
const reviewReset = document.getElementById("reset-reviews");

const movieDetails = document.getElementById("display-info");
const movieBox = document.querySelector("select");

const peopleButton = document.getElementById("show-people");
const listOfPeople = document.getElementById("people");

let movie;

setTimeout(() => {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => boxPopuli(data))
        .catch((error) => console.log("WE GOT AN ERRAH HEAH:", error));    
}, 1000);

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
    //listPeople(e);
    //console.log(e.target.value);
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
    if (movieBox[selectedMovie].textContent===""){
        alert("Please select a movie first");
    } else if (e.target.review.value==="") {
        alert("Please input a review");
    } else {
        reviewLi.append(`: ${e.target.review.value}`);
        reviewList.append(reviewLi);
        e.target.review.value="";
    }
});

reviewReset.addEventListener("click", (e) => {
    e.preventDefault();
    let allReviews = document.querySelectorAll("ul li");
    for(let review of allReviews){
        review.remove();
    }
    console.log(allReviews);
});