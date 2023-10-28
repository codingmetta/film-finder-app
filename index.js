const btnSearch = document.body.querySelector('#btn-search');
const outputEl = document.body.querySelector('.search-output');


const baseURL = `http://www.omdbapi.com/?apikey=78814a4b
`;
let filmsArr = [];
renderFilms(filmsArr);
document.getElementById('search-form').addEventListener('submit', searchFilm);

function searchFilm(e) {
    e.preventDefault();


    //querystring auslesen

    //request object für API call erstellen

    //querystring GET request an web api senden 
    /**/
    fetch(`http://www.omdbapi.com/?apikey=78814a4b&s=blade&r=json`)
        .then(res => res.json())
        .then(data => {
            window.localStorage.clear(); 
            window.localStorage.setItem("results", JSON.stringify(data.Search));
        })
    let resArr =JSON.parse(window.localStorage.getItem("results"));
    //console.log(resArr);

    for (let res of resArr) {
        let tempTitle = res.Title.replace(/\s/g, "+");
   
       fetch(`http://www.omdbapi.com/?apikey=78814a4b&t=${tempTitle}&r=json`)
       .then(res => res.json())
       .then(film => {
        if(window.localStorage.getItem("films") !== null
        ) {
         window.localStorage.removeItem("films")
     }
        //console.log(film);
           let filmData =  {
            title: film.Title,
            img: film.Poster,
            rating: film.imdbRating,
            duration: film.Runtime,
            desc: film.Plot,
            genres: film.Genre
            };
            filmsArr.push(filmData);
            console.log('izzzz:' + filmsArr);
            
            window.localStorage.setItem("films", JSON.stringify(filmsArr));
        })
    }
    let arr =JSON.parse(window.localStorage.getItem("films"));
    renderFilms(arr)

}
function renderFilms(filmsArr){
    let html = '';
    if(filmsArr.length === 0){
        outputEl.innerHTML= ''; 
        html = `<div> Start Exploring </div>`
    } else {
        outputEl.innerHTML= ''; 

        //console.log(filmsArr);

        for (let i = 0;  i < filmsArr.length; i++) {

            html +=  `
        <article class="film-container">
        <div class="film-data">
            <figure class="film-poster">
                <img src=${filmsArr[i].img} alt="" />
            </figure>
            <div class="film-aside">
                <div class="header-film">
                    <h3 class="film-title">${filmsArr[i].title}</h3>
                    <div class="rating-container">
                        <span class="star-icon">&starf; </span>
                        <p class="film-rating">${filmsArr[i].rating}</p>
                    </div>
                </div>
                <div class="subheader-film">
                    <p class="film-duration">${filmsArr[i].duration}</p>
                    <p class="film-genre">${filmsArr[i].genres}</p>
    
                    <button class="btn-add">
                        <div class="circle">
                            <span class="span-plus">&#43;</span>
                        </div>
                        <p>Watchlist</p>
                    </button>
                </div>
                <div class="body-film">
                    <p class="film-desc">${filmsArr[i].desc} </p>
                </div>
            </div>
        </div>
    </article>
    
        `
    }
}

   
    outputEl.innerHTML += html; 
}