
const BASE_URL = "https://ghibliapi.herokuapp.com/films";
start();

const img = document.querySelector("img");
img.setAttribute("src","./images/ghibli-logo.png",);
img.setAttribute("alt", "Ghibli logo")

const sectionReview = document.getElementById("reviews");
sectionReview.style.display = "block";

const option =document.createElement("option")
const dropDown = document.getElementById("dropDown");



function start (){

    fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => getMovies(data))
            .catch((error) =>console.log("Must select movie", error))
}


function getMovies (data){
    for(let i = 0; i < data.length; i++){
        const select = document.querySelector("select");

        const option = document.createElement("option");

        option.value = data[i].id;
        option.textContent = data[i].title
        select.append(option);
    } 

};


const selectForm = document.getElementById("selectMovie")
selectForm.addEventListener("select", event =>{
    event.preventDefault()

    const h3 = document.querySelector("h3");
    h3.textContent= data[i].description
    const display = document.getElementById("display-info");
    display.append(h3)

} )






