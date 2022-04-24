const base_url = "https://ghibliapi.herokuapp.com";

 let peopledata;
 let data;
 
 function getdata () {
     fetch(`${base_url}/films`)
     .then((response) => response.json())
     .then((json) => {   
     data = json;
         dropdownInput(data);
     })
     .catch((err) => {
         console.log(err);
     })
 }

     const titles = document.querySelector("#titles");
     const ul = document.querySelector("ul");
     const displayInfo = document.querySelector("#display-info");

 function dropdownInput(data) {
// fill dropdown list
 for (let i = 0; i < data.length; i++){
     const option = document.createElement("option");
     option.textContent = data[i].title;
     option.value = data[i].id;
     titles.append(option);
     // console.log(data.length)
 }
 }

 function details(data) {
 displayInfo.innerHTML = "";
 for (let i = 0; i < data.length; i++){
     if (data[i].id === titles.value) {
         const h3 = document.createElement("h3");
         h3.textContent = data[i].title;
         displayInfo.append(h3);
       
         const releaseYear = document.createElement("p");
         releaseYear.textContent = data[i].release_date;
      
         displayInfo.append(releaseYear);

         const description = document.createElement('p');
         description.textContent = data[i].description;
         displayInfo.append(description);
     }
  }
 }
 
 const userReviewForm = document.querySelector("#reviewForm");
 const userReview  = document.querySelector("#review");

 userReviewForm.addEventListener("submit", (event) => {
     event.preventDefault();
   
     userReview.textContent = userReview;
     submitReview(userReview);
   
 })
// user review
 function submitReview (userReview){
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
         //console.log(hello)
     }
 }

 const resetReviews = document.querySelector("#reset-reviews");

 resetReviews.addEventListener("click", (event) => {
     ul.innerHTML = "";
 })

 const showPpl = document.querySelector("#show-people");

 showPpl.addEventListener ("click", (event => {
 event.preventDefault();

 fetch(`${base_url}/people`)
     .then((response) => response.json())
     .then((json) => {   
     peopledata = json;
    
     listOfPeople(peopledata);
     })
     .catch((err) => {
         console.log(err);
     })


     ol.innerHTML = " ";
 }));

 const ol = document.querySelector("ol");
 function listOfPeople(peopledata) {
     for (let i = 0; i < peopledata.length; i++){     
         if (peopledata[i].films[0].split("/")[4] === titles.value) {
             const li = document.createElement("li");
             li.innerHTML = `${peopledata[i].name}`
             ol.append(li);
         } 
     }
 }
 setTimeout(getdata,1000);