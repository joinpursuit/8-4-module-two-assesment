const BASE_URL = "https://ghibliapi.herokuapp.com";


const img = document.querySelector("img");
img.setAttribute("src","./images/ghibli-logo.png",);
img.setAttribute("alt", "Ghibli logo")

const sectionReview = document.getElementById("reviews");
sectionReview.style.display = "block";

const option = document.querySelector("option");
option.value = "";
const dropDown = document.getElementById("dropDown");
// dropDown.empty();

let url = "https://ghibliapi.herokuapp.com/films";

fetch(url)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((error) =>console.log("Must select movie", error))



// function getMovies (data){
//     for(let i = 0; i < data.length; i++){
//         option.value = data[i].id;
//         option.textContent = data[i].title
        
    












