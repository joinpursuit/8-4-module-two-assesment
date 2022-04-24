const base_url = "https://ghibliapi.herokuapp.com";

let data;
let peopledata;

//get the data. 
function getdata () {
    fetch(`${base_url}/films`)
    .then((response) => response.json())
    .then((json) => {   
    data = json;
    //console.log(data);
//function that use the data to populate the dropdown.
        dropdownInput(data);
    })
    .catch((err) => {
        console.log(err);
    })

}

//global 
    const titles = document.querySelector("#titles");
    //const br = document.createElement("br");
    const ul = document.querySelector("ul");
    const displayInfo = document.querySelector("#display-info");
    
    //set up all the titles. 
function dropdownInput(data) {

//populate all of the title into the drop down
for (let i = 0; i < data.length; i++){
    const option = document.createElement("option");
    option.textContent = data[i].title;
    option.value = data[i].id;
    titles.append(option);
    //console.log(data[i].id)
}


}




//when a movie is selected using the dropdown - change the description. - eventlistener on click for the select. --- also when movie is selected - review box show. so make a input box and append.


function details(data) {
//console.log(titles.value);

displayInfo.innerHTML = "";


//need to search using the id?. 
for (let i = 0; i < data.length; i++){
    if (data[i].id === titles.value) {
        const h3 = document.createElement("h3");
        h3.textContent = data[i].title;
        displayInfo.append(h3);
        //displayInfo.reset();

        const releaseYear = document.createElement("p");
        releaseYear.textContent = data[i].release_date;
        //displayInfo.append(br);
        displayInfo.append(releaseYear);
        

        const description = document.createElement('p');
        description.textContent = data[i].description;
        displayInfo.append(description);

    }



 }


}


//reviews.eventlistener - to on submit - reset. make a form for it?
const userReviewForm = document.querySelector("#reviewForm");
const userReview  = document.querySelector("#review");

userReviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    //console.log(userReview);
    userReview.textContent = userReview;
    submitReview(userReview);
   
    //userReviewForm.reset();
})



function submitReview (userReview){//get the user input. 
    const title = document.querySelector('h3');

 if (!title) {
        alert('Please select a movie first');
        userReview.textContent = userReview.value;
        return;
    } else {

        const li = document.createElement("li");
        li.innerHTML = `<strong>${title.textContent}:</strong> ${userReview.value}`
        ul.append(li);
        userReview.value = ""
    }


}



const resetReview = document.querySelector("#reset-reviews");

resetReview.addEventListener("click", (event) => {
    ul.innerHTML = "";
})


const showPeople = document.querySelector("#show-people");

showPeople.addEventListener ("click", (event => {
event.preventDefault();

fetch(`${base_url}/people`)
    .then((response) => response.json())
    .then((json) => {   
    peopledata = json;
    //console.log(peopledata);
    populatePeople(peopledata);
    })
    .catch((err) => {
        console.log(err);
    })


    ol.innerHTML = " ";
}));


const ol = document.querySelector("ol");

function populatePeople(peopledata) {
   // console.log(titles.value);//
    //peopledata.length;
    for (let i = 0; i < peopledata.length; i++){
        //console.log(peopledata[i].films[0].split("/")[4])
        
        if (peopledata[i].films[0].split("/")[4] === titles.value) {
            //console.log(peopledata[i].name);

            const li = document.createElement("li");
            li.innerHTML = `${peopledata[i].name}`
            ol.append(li);
        } 

    }
}

setTimeout(getdata,1000);
