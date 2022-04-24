
const BASE_URL = "https://ghibliapi.herokuapp.com/films";
getMovies();

const img = document.querySelector("img");
img.setAttribute("src","./images/ghibli-logo.png",);
img.setAttribute("alt", "Ghibli logo")


const select = document.createElement("select")
const option = document.createElement("option")



function getMovies (){

    fetch(BASE_URL)
            .then((res) => res.json())
            .then((data) => selectMenu(data))
            .catch((error) =>console.log("Must select movie", error))
}


function selectMenu (data){
    for(let i = 0; i < data.length; i++){
        const select = document.querySelector("select");
        const option = document.createElement("option");

        option.value = data[i].id;
        option.textContent = data[i].title
        select.append(option);
    } 
};


const selectForm = document.querySelector("form")
console.log(selectForm);
selectForm.addEventListener("select", event =>{
    event.preventDefault()

    if(option.value === data.id){
        const h3 = document.querySelector("h3");
        h3.textContent= data.title
        const p1 = document.querySelector("p")
        p1.textContent = data.release_date
        const p2 = document.querySelector("p")
        p2.textContent = data.desrciption
        const display = document.getElementById("display-info");
        display.append(h3)
    }else{
        alert("Must select a movie")
    }



} )






