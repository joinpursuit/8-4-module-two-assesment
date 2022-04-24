const url = "https://ghibliapi.herokuapp.com/films";

let allFilms;
let movieTitle;
let allReviews = {};

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

// ----------------------------- Select a Movie ----------------------------- //
function selectFilms(allFilms) {
    const section = document.querySelector('#titles');
    allFilms.filter(films => {
        section.innerHTML += `<option value="${films.title}">${films.title}</option>`
    })
    section.addEventListener('change', (e) => {

        movieTitle = e.target.value;
        movieDescription(movieTitle);
        // Helps remove 'People' listed
        const list = document.querySelectorAll('#People li');
        list.forEach(li => li.remove())
        
        // Helps reset 'People' list :
        clickNumber = 0;
        document.getElementById('show-people').disabled = false;
    });
}
// ----------------------------- Error Message ----------------------------- //
function movieError(){
    window.alert('Please select a movie first');
}

// ----------------------------- Movie Description ----------------------------- //
const sectionDiv = document.querySelector('#display-info')
function movieDescription(title) {
    if(title === ''){
        sectionDiv.innerHTML = '';
    } 
    allFilms.filter((film, i) => {
        if (film.title === title) {
            sectionDiv.innerHTML = `<h2>${title}</h2><p>${allFilms[i]['release_date']}</p><p>${allFilms[i]['description']}</p>`;
            movieArry = allFilms[i];
        } 

    })
    addReviews(title);
}

// ----------------------------- Addding Reviews ----------------------------- //
const sectionForm = document.querySelector('#Add-review form');
sectionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(movieTitle)
    if (movieTitle === undefined || !movieTitle){
        movieError();
        console.log('this picks up empty value');
    } else {
        console.log(event.target.review.value);
        const input = event.target.review.value;
        allReviews[movieTitle] = input;
        addReviews(input);
        sectionForm.reset();
    } 
    
});


function addReviews() {
    const sectionReviews = document.querySelector('#reviews ul')
    if (Object.keys(allReviews).length) {
        sectionListItems = document.querySelectorAll('li')
        sectionListItems.forEach(x => x.remove());
        for (const [key, value] of Object.entries(allReviews)) {
            sectionReviews.innerHTML += `<li><strong><b>${key}</strong></b>: ${value}</li>`
        }
    } 
}

// ----------------------------- Deletes Reviews ----------------------------- //
function deleteReviews() {
    const listedReviews = document.querySelector('#reviews ul')
    listedReviews.innerHTML = '';
}

// ----------------------------- People Listed ----------------------------- //
let movieArry;

const sectionPeople = document.querySelector('#People button');
let clickNumber = 0;
sectionPeople.addEventListener("click", (e) => {
    clickNumber += 1;
    if (movieTitle === movieArry['title']){
        if(clickNumber === 1){
            getPeopleInfo('https://ghibliapi.herokuapp.com/people', movieArry['url']);
        } if (clickNumber >= 2){
            document.getElementById('show-people').disabled = true;
        }
    }
    console.log(clickNumber)
})

function getPeopleInfo(peopleURL, url) {
    const sectionOL = document.querySelector('#People ol');
    fetch(peopleURL)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            for (let i = 0; i < data.length; i++) {
                filmInfo = data[i]['films'];
                console.log(filmInfo)
                if (filmInfo.includes(url)) {
                    sectionOL.innerHTML += `<li>${data[i].name}</li>`
                }
            }
        })
}

// All tests pass after a couple refreshes. Not sure why.