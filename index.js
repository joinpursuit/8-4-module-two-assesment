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


function selectFilms(allFilms) {
    const section = document.querySelector('#titles');
    allFilms.filter(films => {
        section.innerHTML += `<option value="${films.title}">${films.title}</option>`
    })
    section.addEventListener('change', (e) => {
        if (document.querySelector('#titles option') !== '') {
            movieTitle = e.target.value;
            movieDescription(e.target.value);
            const list = document.querySelectorAll('#People li');
            list.forEach(li => li.remove())
        }
    });

}

function movieDescription(title) {
    console.log(title);
    const sectionDiv = document.querySelector('#display-info')
    allFilms.filter((film, i) => {
        if (film.title === title) {
            sectionDiv.innerHTML = `<h2>${title}</h2><p>${allFilms[i]['release_date']}</p><p>${allFilms[i]['description']}</p>`;
            movieArry = allFilms[i]['people'];
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
    if (Object.keys(allReviews).length) {
        sectionListItems = document.querySelectorAll('li')
        sectionListItems.forEach(x => x.remove());

        for (const [key, value] of Object.entries(allReviews)) {
            sectionReviews.innerHTML += `<li><strong>|<b>${key}</strong>|</b>: ${value}</li>`
        }
    }
}

function deleteReviews(){
    console.log('im here bitch')
    const listedReviews = document.querySelector('#reviews ul')
    listedReviews.innerHTML = '';
}



// ----------------------------- People Listed ----------------------------- //
let movieArry;
console.log(movieArry)

const sectionPeople = document.querySelector('#People');
sectionPeople.addEventListener("click", (e) => {
    movieArry.forEach(x => {
        console.log(x)
        getPeopleInfo(x);
    })
    document.getElementById('show-people').disabled = true;
})

function getPeopleInfo(x) {
    const sectionOL = document.querySelector('#People ol')
    fetch(x)
        .then((res) => res.json())
        .then((data) => {
            if (data.length > 1) { // For multiple names listed in an object
                data.forEach(x => {
                    sectionOL.innerHTML += `<li>${x.name}</li>`
                })
            } else {  // For one name listed at a time
                sectionOL.innerHTML += `<li>${data.name}</li>`
            }
        })
}





