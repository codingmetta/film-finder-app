import { renderFilms, checkOutputEl } from './Helper.js';

const outputEl = document.body.querySelector('.watchlist-output');
let filmsArr = [];
let isSearchView = checkOutputEl();


renderWatchList();

/** function renderWatchList()
 * @brief renders the WatchList using the renderFilms() function from Helper.js
 */
function renderWatchList() {
    filmsArr = getStorage();
    outputEl.innerHTML = renderFilms(filmsArr, isSearchView);
    registerBtnDelEventHandlers();
}


/** function getStorage()
 * @return all Items that are saved in the localStorage
 */
function getStorage() {
    var values = [],
        keys = Object.keys(window.localStorage),
        i = keys.length;

    while (i--) {
        values.unshift(JSON.parse(window.localStorage.getItem(keys[i])));
    }
    console.log(values);
    return values;
}


/** function registerBtnDelEventHandlers()
 * @brief removes Item from LocalStorage and re-renders the WatchList on screen
 */
function registerBtnDelEventHandlers() {
    const allDelBtn = document.body.querySelectorAll('.btn-delete');

    allDelBtn.forEach((value, index) => {
        value.addEventListener('click', () => deleteFromWatchList(index));
    })
}

/** function deleteFromWatchList()
 * @brief removes Item from LocalStorage and re-renders the WatchList on screen
 * @param index of Item
 */
function deleteFromWatchList(index) {
    window.localStorage.removeItem(window.localStorage.key(index));
    renderWatchList();
}