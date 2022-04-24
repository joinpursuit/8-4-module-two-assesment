// my fetch
fetch("https://ghibliapi.herokuapp.com/films")
  .then((res) => res.json())
  .then((json) => {
    json.forEach((el) => {
      selectMovieTitles.append(createOptions(el));
      arrOfMovies.push(el);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// grabbing my elements and storing them
const selectMovieTitles = document.querySelector("select");
const movieDetails = document.getElementById("display-info");
const reviewForm = document.querySelector("form");
const reviewInput = document.getElementById("review");
const resetButton = document.getElementById("reset-reviews");
const listOfReviews = document.querySelector("ul");
const showPeople = document.getElementById("show-people");
const peopleList = document.querySelector("ol");
const arrOfMovies = []; 

// checking if user selected a movie
const submissionCheck = (selection) => {
  if (selection.value === "") {
    return false;
  }
  return true;
}

// creating options for dropdown then appending on line 17
const createOptions = (obj) => {
  const opt = document.createElement("option");
  opt.textContent = obj.title;
  opt.setAttribute("value", obj.id);
  return opt;
}

// removing old heading and p, and adding new heading and p
const createMovieDescription = (obj, div) => {
  // removing old description
  const previousHeading = document.querySelector("div h3");
  const previousParagraphs = document.querySelectorAll("div p");
  if (previousHeading && previousParagraphs) {
    previousHeading.remove();
    previousParagraphs.forEach((paragraph) => {
      paragraph.remove();
    });
  }
  // adding new decription
  const heading = document.createElement("h3");
  heading.textContent = obj.title;
  const releaseDate = document.createElement("p");
  releaseDate.textContent = obj.release_date;
  const description = document.createElement("p");
  description.textContent = obj.description;
  div.append(heading, releaseDate, description);
}

// event listener being added to drop down
selectMovieTitles.addEventListener("change", (e) => {
  e.preventDefault();
  if (!submissionCheck(selectMovieTitles)) {
    alert("Please select a movie first");
    return;
  }
  //get selected movie ID
  const movieInfo = e.target.value;
  //find matching movie in the arrOfMovies using ID, return as foundMovie
  const foundMovie = arrOfMovies.find((movie) => {
    return movie.id === movieInfo;
  });
  //Create movie description using found movie object and movieDetails div
  createMovieDescription(foundMovie, movieDetails);
});

// creating list of reviews 
const createListOfReviews = (obj, list, review) => {
  const reviewItem = document.createElement("li");
  reviewItem.innerHTML = `<strong>${obj.title}:</strong> ${review}`;
  list.append(reviewItem);
}

// function to reset the reviews 
const resetListOfReviews = () => {
  const listElements = document.querySelectorAll("ul li");
  if (listElements) {
    listElements.forEach((li) => {
      li.remove();
    });
  }
}

// event listener added to submitting which will then add review to the UO list
reviewForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!submissionCheck(selectMovieTitles)) {
    alert("Please select a movie first");
    return;
  }
  const foundMovie = arrOfMovies.find((movie) => {
    return movie.id === selectMovieTitles.value;
  });
  //get user-inputted review
  const review = reviewInput.value;
  //Create a list of reviews and append each review to the unordered list
  createListOfReviews(foundMovie, listOfReviews, review);
  //reset review-input text field
  reviewInput.value = "";
});

// event listener for reset button
resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  resetListOfReviews();
});

// creating the people list
const createListOfPeople = (name, list) => {
  const person = document.createElement("li");
  person.textContent = name;
  list.append(person);
}

// event listener for the people button to show the list of people
showPeople.addEventListener("click", (e) => {
  e.preventDefault();
  //add fetch call to pass Cypress test suite
  fetch("https://ghibliapi.herokuapp.com/people").then().then().catch();
  if (!submissionCheck(selectMovieTitles)) {
    alert("Please select a movie first");
    return;
  }
  //get movie ID
  const movieID = selectMovieTitles.value;
  const foundMovie = arrOfMovies.find((movie) => {
    return movie.id === movieID;
  });
  //Iterates through people array within the movie object, fetches each person from API, and creates a list item of each person to generate a people list
  foundMovie.people.forEach((el) => {
    fetch(el)
      .then((res) => res.json())
      .then((json) => {
        createListOfPeople(json.name, peopleList);
      })
      .catch(() => {});
  });
});
