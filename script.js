const API = "https://ghibliapi.herokuapp.com/";
let films = `${API}films`;


let peopleList = [];
let movieID = [];

const timeout = setTimeout(() => {

    fetch(`${films}`)
        .then((response) => response.json())
        .then((data) => ghibli(data))


    const ghibli = (data) => {
        // console.log(data)
        let list = [];
        // let movieID = []
        for (let movie of data) {
            let title = movie.title;
            let id = movie.id;
            // console.log(id)
            // console.log(title)
            if (!list.includes(title)) {
                list.push(title);
            }
            if (!movieID.includes(id)) {
                movieID.push(id);
                // console.log(movieID)
            }
            peopleList.push(movie.people);
            // console.log(peopleList)
        }

        const movieList = document.querySelector('#first #movie')
        // console.log(movieList)   

        for (let movie of list) {
            let option = document.createElement('option')
            option.textContent = movie;
            option.setAttribute('value', data.id)

            movieList.append(option)
        }

        const selectedMovie = document.querySelector('select');
        selectedMovie.addEventListener('change', (event) => description(event, data))


        let desinput;

        const description = ((event, data) => {
            event.preventDefault()
            desinput = event.target.options[event.target.selectedIndex].text;
            // console.log(input)
            const section = document.querySelector('#first')
            const title = document.createElement('h3')
            title.textContent = desinput;

            let year = document.createElement('p')
            let summary = document.createElement('p')
            // console.log(data)

            for (let movie of data) {
                if (desinput === movie.title) {
                    year.textContent = movie.release_date;
                    summary.textContent = movie.description;
                }
            }
            section.append(title)
            section.append(year)
            section.append(summary)


            const addReview = document.querySelector('#second form');
            addReview.addEventListener('submit', (event) => review(event, data))

            const review = ((event, data) => {
                event.preventDefault()
                const revinput = event.target.review.value;
                // console.log(input)
                const section = document.querySelector('#second')

                const strong = document.createElement('strong')
                const reviewul = document.createElement('ul')

                const li = document.createElement('li')

                for (let movie of data) {

                    li.textContent = desinput + ':  ' + revinput;
                    reviewul.appendChild(li);
                    strong.append(reviewul);
                    section.append(strong);

                    event.target.review.value = ' '
                }
            })


        })


    }
}, 500)




fetch(`${API}people`)

    .then((response) => response.json())
    .then((theppl) => people(theppl))

    const people = ((theppl) =>{
        // console.log(theppl)

        let pplName;
        let pplid;
        let starredIn;

        for(let peeps of theppl){
            pplName = peeps.name;
            pplid = peeps.id;
            starredIn = peeps.films;
        }        
    const showPeople = document.querySelector('#fourth #show-people');
    showPeople.addEventListener('submit', (event) => getPeople(event, theppl))


        const getPeople = ((event, theppl) =>{
            event.preventDefault();
            
            const section = document.querySelector('#fourth')
            const peopleol = document.createElement('ol')
            const li = document.createElement('li')
            
            if(starredIn.includes(`${API}films`)){
                peopleList.push(pplName);
            }
            li.textContent = peopleList;
            peopleol.append(li)
            section.append(ol)
            
            


        })
        
    }) 
    
    
    
    
