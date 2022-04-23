const base_url = "https://ghibliapi.herokuapp.com/films";
let data;

//get the data. 
fetch(`${base_url}`)
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


    //set up all the titles. 
function dropdownInput(data) {
const titles = document.querySelector("#titles");

//populate all of the title into the drop down
for (let i = 0; i < data.length; i++){
    const option = document.createElement("option");
    option.textContent = data[i].title;
    option.value = data[i].id;
    titles.append(option);

    //console.log(data[i].id)
}


//console.log(titles);

}




//when a movie is selected using the dropdown - change the description. - eventlistener on click for the select. --- also when movie is selected - review box show. so make a input box and append.

//reviews.eventlistener - to on submit - reset. make a form for it?










