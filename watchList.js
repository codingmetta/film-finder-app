import {renderFilms} from './Helper.js';

let isSearchView = false;
const outputEl = document.body.querySelector('.watchlist-output');

let filmsArr = [];

renderWatchList();

function renderWatchList(){
    filmsArr = getStorage();
    outputEl.innerHTML= renderFilms(filmsArr, isSearchView);
    registerBtnDelEventHandlers();
}


/** getStorage()
 * @return all Items that are saved in the localStorage
 */
function getStorage() {
    var values = [],
        keys = Object.keys(window.localStorage),
        i = keys.length;

    while ( i-- ) {
        values.unshift(JSON.parse(window.localStorage.getItem(keys[i])) );
    }
    console.log(values);
    return values;
}


function registerBtnDelEventHandlers(){
    const allDelBtn = document.body.querySelectorAll('.btn-delete');

    allDelBtn.forEach((value, index) => {
        value.addEventListener('click', () => deleteFromWatchList(index));
    })
}
function deleteFromWatchList(index) {
    window.localStorage.removeItem(window.localStorage.key(index));
    renderWatchList();
}