

const API = 'https://ghibliapi.herokuapp.com';


let currentdata;


    fetch(`${API}/films`)
            .then(res => res.json())
            .then(res => populateList(res))
            .catch(err => alert(err));








