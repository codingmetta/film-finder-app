const btnSearch = document.body.querySelector('#btn-search');
const outputEl = document.body.querySelector('.search-output');


const baseURL = `http://www.omdbapi.com/?apikey=78814a4b
`;
let filmDummy =  {
    title: "nice day",
    img: "#",
    rating: "4",
    duration: '120',
    desc: "kslenfsnfelkwelfnkwfwlefknewklfewfewnkwelknflfknwenfwkelnkwfenklwfe",
    genres: "comedy, drama"
}

let resArr = [];
let filmsArr = [];


document.getElementById('search-form').addEventListener('submit', searchFilm);

function searchFilm(e) {
    e.preventDefault();


    //querystring auslesen

    //request object für API call erstellen

    //querystring GET request an web api senden 

    fetch(`http://www.omdbapi.com/?apikey=78814a4b&s=blade&r=json`)
        .then(res => res.json())
        .then(data => {
            resArr = data.Search;
        });
    
        for (let res of resArr) {
            console.log(res.Title);
        }

    renderFilms();

}

function renderFilms(){
    let html = '';
    if(filmsArr.length === 0){
        outputEl.innerHTML= ''; 
        html = `<div> Start Exploring</div>`
    } else {
 
        for (let film of filmsArr) {
            html +=  `
        <article class="film-container">
        <div class="film-data">
            <figure class="film-poster">
                <img src="${film.img}" alt="" />
            </figure>
            <div class="film-aside">
                <div class="header-film">
                    <h3 class="film-title">${film.title}</h3>
                    <div class="rating-container">
                        <span class="star-icon">&starf; </span>
                        <p class="film-rating">${film.rating}</p>
                    </div>
                </div>
                <div class="subheader-film">
                    <p class="film-duration"> ${film.duration} min</p>
                    <p class="film-genre">${film.genres}</p>
    
                    <button class="btn-add">
                        <div class="circle">
                            <span class="span-plus">&#43;</span>
                        </div>
                        <p>Watchlist</p>
                    </button>
                </div>
                <div class="body-film">
                    <p class="film-desc">${film.desc} </p>
                </div>
            </div>
        </div>
    </article>
    
        `
    }
}

   
    outputEl.innerHTML += html; 
}