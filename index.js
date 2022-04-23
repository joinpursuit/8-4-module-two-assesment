const url = "https://ghibliapi.herokuapp.com/films";
let allFilms;
function getFilms() {
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            allFilms = data;
            selectFilms(allFilms)
        })
        .catch((error) => {
            console.log(error)
        })
}
getFilms();

let movieTitle;
let allReviews = {};

function selectFilms(allFilms) {
    const section = document.querySelector('#titles');
    allFilms.filter(films => {
        section.innerHTML += `<option value="${films.title}">${films.title}</option>`
    })
    section.addEventListener('change', (e) => {
        if (document.querySelector('#titles option') !== ''){
            movieTitle = e.target.value;
            movieDescription(e.target.value);
        }
    });

}

function movieDescription(title) {
    console.log(title);
    const sectionDiv = document.querySelector('#display-info')
    allFilms.filter((film, i) => {
        if (film.title === title) {
            sectionDiv.innerHTML = `<h2>${title}</h2><p>${allFilms[i]['release_date']}</p><p>${allFilms[i]['description']}</p>`;
            getPeople(allFilms[i]);
        }
       
    })
    addReviews(title);
}


const sectionForm = document.querySelector('#Add-review form');
sectionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event.target.review.value);
    const input = event.target.review.value;
    allReviews[movieTitle] = input;
    addReviews(input);
    sectionForm.reset();
});


function addReviews(title) {
    const sectionReviews = document.querySelector('#reviews ul')
    // console.log(allReviews);

    if (Object.keys(allReviews).length) {
        sectionListItems = document.querySelectorAll('li')
        sectionListItems.forEach(x => x.remove());


        for (const [key, value] of Object.entries(allReviews)) {
            sectionReviews.innerHTML += `<li><span>${key}</span>: ${value}</li>`
        }
    }
}
let peopleObj;

function getPeopleInfo(x){
    fetch(x)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        peopleObj = data

    })
}
function getPeople(movieArry){
    console.log(movieArry);
    const peopleArry = movieArry['people'];
    console.log(peopleArry[0])
    peopleArry.forEach(x => {
       
    })

}