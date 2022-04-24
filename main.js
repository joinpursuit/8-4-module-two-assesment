let data
let dropDown = document.querySelector("#titles")
let divDescription = document.querySelector("#display-info")
let reviewsSection = document.querySelector("#reviews")
const ul = document.querySelector("ul")
const form = document.querySelector("form")
let resetReviews = document.querySelector("#reset-reviews")
let showPeople = document.querySelector("#show-people")
const ol = document.querySelector("ol")

function getMovies(){
    fetch("https://ghibliapi.herokuapp.com/films/")
    .then((response) => response.json())
    .then((json) => {
        data = json
        addOptions(data)
    })
}

function addOptions(data){
    let titlesArr = []
    data.forEach((el) => {
        if(!titlesArr.includes(el)){
            titlesArr.push(el.title)
        }
    })
    for(let title of titlesArr){
        let option = document.createElement("option")
        option.value = title
        option.text = title
        dropDown.append(option)
    }
    
}

dropDown.addEventListener("change", (event) =>{
    event.preventDefault()
    if(event.target.value){
        divDescription.style.display = "block"
        getDescription(data)
    } else {
        divDescription.style.display = "none"
    }
})

function getDescription(data){
    for(let i = 0; i < data.length; i++){
        if(dropDown.options[dropDown.selectedIndex].value === data[i].title){
            divDescription.innerHTML=""
            let divh3 = document.createElement("h3")
            let divp1 = document.createElement("p")
            let divp2 = document.createElement("p")
            divh3.textContent = data[i].title
            divp1.textContent= data[i]["release_date"]
            divp2.textContent = data[i].description
            divDescription.append(divh3, divp1, divp2)
        }
        
    }
}
form.addEventListener("submit", (event) => {
    event.preventDefault()
    const inputText = event.target.review.value
    const listItem = document.createElement("li")
    for(let i = 1; i < dropDown.options.length; i++){
        if(dropDown.options[i].selected){
            listItem.innerHTML= `<strong>${dropDown.options[dropDown.selectedIndex].text}.</strong> ${inputText}`
            ul.append(listItem)
            form.reset()
        }
        if(dropDown.options[dropDown.selectedIndex].value === ""){
            window.alert("Please select a movie first")
        }
        }
    })
    
    resetReviews.addEventListener("click", (event) => {
        ul.innerHTML= ""
    })
    
    showPeople.addEventListener("click", (event) => {
        fetch("https://ghibliapi.herokuapp.com/people")
        .then((response) => response.json())
        .then((json) => {
            dataPeople = json
            for(singleData of data){
                for(dataPerson of dataPeople){
                    if(singleData.people.includes(dataPerson.url)){
                        let peopleListItem = document.createElement("li")
                        peopleListItem.textContent = `${dataPerson.name}`
                        ol.append(peopleListItem)
                        
                    }
                }
            }
        })
    })
    setTimeout(getMovies(), 2000)