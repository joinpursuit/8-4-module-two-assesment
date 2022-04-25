const BaseUrl = "https://ghibliapi.herokuapp.com/";
const filmsEndPoint = "films";
const peopleEndPoint = "people";


//Fetch People and Films Data
function getApiData() {
    fetch(`${BaseUrl}${filmsEndPoint}`)
        .then((response) => response.json())
        .then((json) => (filmsData = json))
        .then((filmsData) => getMovieTitles(filmsData));
    fetch(`${BaseUrl}${peopleEndPoint}`)
        .then((response) => response.json())
        .then((json) => (peopleData = json));
}
getApiData();


// Get Movie Titles to Populate Select 
function getMovieTitles(filmsData) {
    setTimeout(movieRequest, 1000);
    const options = document.querySelector("select");
    filmsData.forEach((movie) => {
        const option = document.createElement("option");
        option.setAttribute("value", `${movie.id}`);
        option.textContent = `${movie.title}`;
        options.append(option);
    });
}


let moviePeople;
let result;
const movieDetails = document.getElementById('titles');
movieDetails.addEventListener('change', () => {
    const movieID = movieDetails.value;
    const displaySection = document.querySelector('#display-info');
    const displayMovieTitle = document.createElement('h3');
    const displayMovieYear = document.createElement('p');
    const displayMovieDseciption = document.createElement('p');
    result = getMovieDetails(movieID);
    if (result) {
        moviePeople = result.people;
        displayMovieTitle.textContent = result.title;
        displayMovieYear.textContent = result.release_date;
        displayMovieDseciption.textContent = result.description;
    }

    displaySection.textContent = '';
    displaySection.prepend(displayMovieTitle, displayMovieYear, displayMovieDseciption);
});


//Review Details Form Add Event Listener
const reviewDetails = document.querySelector("form");
reviewDetails.addEventListener('submit', (event) => {
    event.preventDefault();

    if ((typeof (result)) === 'undefined') {
        alert('Please select a movie first');
    } else {

        const review = event.target.review.value;


        const reviewSectionUl = document.querySelector('#reviews ul');
        const reviewSectionLi = document.createElement('li');
        const movieName = document.createElement('strong');
        if (result) {
            movieName.textContent = `${result.title}: `;

        }
        reviewSectionLi.textContent = `${review}`;
        reviewSectionLi.prepend(movieName);
        reviewSectionUl.append(reviewSectionLi);
        reviewDetails.reset();
    }
});


//Review Button Add Event Listener
const reviewButton = document.querySelector("#reset-reviews");
reviewButton.addEventListener('click', (event) => {
    const sectionUl = document.querySelector('#reviews ul');
    event.preventDefault();
    sectionUl.textContent = '';
});


//Get Movie From Movie ID 
function getMovieDetails(movieID) {
    for (let i = 0; i < filmsData.length; i++) {
        if (filmsData[i].id === movieID) {
            return filmsData[i];
        }
    }
}


//People Button Add Event Listener
let people;
const peopleButton = document.querySelector("#show-people");
peopleButton.addEventListener('click', (event) => {
    event.preventDefault();
    setTimeout(request, 1000);
    people = getPeople(peopleData, moviePeople);
    const peopleSectionOl = document.querySelector("section ol");
    if (people) {
        people.forEach((person) => {
            const peopleSectionLi = document.createElement("li");
            peopleSectionLi.textContent = person;
            peopleSectionOl.append(peopleSectionLi);
        });
    }

});


//Get People Fron Movie Data
function getPeople(peopleData, moviePeople) {
    let peopleArray = [];

    peopleData.forEach(personData =>{
        moviePeople.forEach(moviePerson=> {
            if (personData.url === moviePerson) {
                 peopleArray.push(personData.name);
            }
        });
    });
    return peopleArray;
}


// SetTimeOut for Requests
function request() {
    fetch(`${BaseUrl}people`);
}
function movieRequest() {
    fetch(`${BaseUrl}films`);
}