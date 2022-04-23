const API_URL = "https://ghibliapi.herokuapp.com/films";
const addReview = document.getElementById("addReview");
const movieDetails = document.getElementById("display-info");
const movieBox = document.querySelector("select");


fetch(API_URL)
    .then(res => res.json())
    .then(data => boxPopuli(data))
    .catch((error) => console.log("WE GOT AN ERRAH HEAH:", error));

const boxPopuli = ((data) => {
    console.log(data);
    for (let movie of data) {
        let option = document.createElement("option");
        option.setAttribute("value", movie.id);
        option.textContent = movie.title;
        movieBox.appendChild(option);
    }
    movieBox.addEventListener("change", (e) => {
        for (let movie of data){
            if (movie.id === e.target.value){
                movieDetails.textContent = movie.description;
            }
        }
        console.log(e);
    });
});

