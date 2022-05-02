// organize all the data from API with appState template
let appState = {
    movies:[],
    people:[],
    selectMovies:{},
}

// create a variable for the Base URL from the README
const BASE_URL = "https://ghibliapi.herokuapp.com/"

// DESCRIPTION - when a user picks a movie from options the user should see; - H3 with movie title - P tag with movie release date and - P tag with description of movie (EVENT LISTENER TO SELECT TAG - titles by ID)

document.getElementById("titles").addEventListener("change", (e) => {
    //check event target - SELECT is changed an alert pops up
    // alert(e.target.value)

    // create a variable for when select option changes
    const id = e.target.value

    // when select option changes run the updateSelected function with matching movie id and add the selected movie to appState select movies object template
    appState.selectMovies = updateSelected(id)
    setMovieDescription()

})






// FETCH - wrap API call in HELPER FUNCTION then call the function at the end with SetTimeout for async
//get the data from the Base URL path of films - ENDPOINT
const getMovies = () => {
    // TEST - function is fetching info
    console.log("Getting API data")
    // fetch data from Base URL with the path of films
    fetch(BASE_URL + "films")
    .then(res => res.json())
    .then(data => { 
        //console.log(data) to make sure you are getting the right info back
        // assigning API data to appState template movies array 
        appState.movies = data
        // call the function populateSelect to add API movies to select tag as options
        populateSelect(appState.movies)
    })  
}
// SELECT - populate options tag w/ movie titles from API call  - options tag should have a value of movie id and text of movie title - first option should be blank

// create a HELPER FUNCTION to create select options  the fetch with appState.movies parameter
const populateSelect = (movies) => { 
    // TEST - movies will populate 
    console.log("Populate select options")
    // for each movie in the API call we will create an option tag w/ value movie id and text movie title 
    movies.forEach(movie => {
        const option = document.createElement("option")
        //set attribute give option tags a value 
        option.setAttribute("value", movie.id)
        option.textContent = movie.title;
        // then add those new tags to the select tag(titles by ID)
        document.getElementById("titles").appendChild(option)
    })
    
}

// HELPER FUNCTION to update the select options with movie id for the Event Listener
const updateSelected = (id) => {
    // TEST - when new option is selected
    console.log("Update select options")
    // filter through appState movies and return the movie id that matches the id
    return appState.movies.filter(movie => {
        return movie.id === id
    })
}

// HELPER FUNCTION  to get the movie desciptions for H3 and (2) P tags
const setMovieDescription = () => {
// TEST - select event listener
alert(appState.selectMovies.title)

// creating variables for the description information to the appState selectMovies object template
const { title, release_date, description } = appState.selectMovies

// creating the HTML tags with interpolation to a variable template 
const template = 
`<h3>${title}</h3><p>${release_date}</p><p>${description}</p>`


}



// set time out to run the getMovies function after 1000m/s to avoid async error
setTimeout(getMovies, 1000)



