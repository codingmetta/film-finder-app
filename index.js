import { renderFilms, checkOutputEl } from './Helper.js';


/************************************************/
/*
*   INSERT YOUR API KEY LIKE THIS RIGHT BELOW:
*       
*    -> const YOUR_API_KEY = {*YOUR_API_KEY*};
*/

const YOUR_API_KEY = '78814a4b';
/***********************************************/




const baseURL = `http://www.omdbapi.com/?apikey=${YOUR_API_KEY}`;
const outputEl = document.body.querySelector('.search-output');
const inputEl = document.getElementById('site-search');

let filmsArr = [];
let resArr = [];
let isSearchView = checkOutputEl();

setup();


function setup() {
    cleanup();
    outputEl.innerHTML = renderFilms(filmsArr, isSearchView);
    document.getElementById('search-form').addEventListener('submit', searchFilm);
}


async function getSearchRes(queryStr) {
    try {
        const res = await fetch(`${baseURL}&s=${queryStr}&r=json`)
        const data = await res.json()
        resArr = data.Search;

        for (let res of resArr) {
            let tempTitle = res.Title.replace(/\s/g, "+");
            res.Title = tempTitle;
        }
    } catch (e) {
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

    let currentQuery = inputEl.value;
    cleanup();

    await getSearchRes(currentQuery);
    await initFilmsArr();
    outputEl.innerHTML = renderFilms(filmsArr, isSearchView);
    registerBtnAddEventHandlers();
}


function cleanup() {
    resArr = [];
    filmsArr = [];
    outputEl.innerHTML = '';
    inputEl.value = '';
}


function registerBtnAddEventHandlers() {
    const allAddBtn = document.body.querySelectorAll('.btn-add');

    allAddBtn.forEach((value, index) => {
        value.addEventListener('click', () => addToWatchList(index));
    })
}

function addToWatchList(index) {
    window.localStorage.setItem(JSON.stringify(filmsArr[index].title), JSON.stringify(filmsArr[index]));
}


