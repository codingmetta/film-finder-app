import {renderFilms} from './Helper.js';

const outputEl = document.body.querySelector('.search-output');
const inputEl = document.getElementById('site-search');


const baseURL = `http://www.omdbapi.com/?apikey=78814a4b
`;
let filmsArr = [];
let resArr = [];
let isSearchView = true;

cleanup();
outputEl.innerHTML= renderFilms(filmsArr, isSearchView);

document.getElementById('search-form').addEventListener('submit', searchFilm);


async function getSearchRes(queryStr) {
    try {
        const res = await fetch(`${baseURL}&s=${queryStr}&r=json`)
        const data = await res.json()
        resArr = data.Search;
    
        for (let res of resArr) {
            let tempTitle = res.Title.replace(/\s/g, "+");
            res.Title = tempTitle;
        }
    } catch(e){
        outputEl.innerHTML = `<div class="no-search-results">Oh! It seems like, what you're looking for does not exist :( </div>`; 
    }
}

async function getFilm(title) {
    const res = await fetch(`${baseURL}&t=${title}&r=json`);
    const film = await res.json();
    filmsArr.push({
        title: film.Title,
        img: film.Poster,
        rating: film.imdbRating,
        duration: film.Runtime,
        desc: film.Plot,
        genres: film.Genre
    })
}

async function initFilmsArr() {
    for (let res of resArr) {
        const films = await getFilm(res.Title);
    }
}

/*To do : Promise States( PENDING, REJECTED) noch implementieren*/
async function searchFilm(e) {
    e.preventDefault();
    //querystring auslesen
    let queryStr = inputEl.value;

    cleanup();

    //querystring GET request an web api senden 
    const initSearch = await getSearchRes(queryStr);
    const films = await initFilmsArr();
    outputEl.innerHTML= renderFilms(filmsArr, isSearchView);
    registerBtnAddEventHandlers();
}


function cleanup() {
    resArr = [];
    filmsArr = [];
    outputEl.innerHTML = '';
    inputEl.value= '';
}


function registerBtnAddEventHandlers(){
    const allAddBtn = document.body.querySelectorAll('.btn-add');

    allAddBtn.forEach((value, index) => {
        value.addEventListener('click', () => addToWatchList(index));
    })
}

function addToWatchList(index) {
    window.localStorage.setItem(JSON.stringify(filmsArr[index].title), JSON.stringify(filmsArr[index]));
}


