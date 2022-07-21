import { getGenres, getMovies } from "./getMovies";
import { drawGallery } from "./drawGallery";
import { drawPagination } from "./drawPagination";
import { calcNewPgNum } from "./calcNewPgNum";
import { showErrorMsg, hideErrorMsg } from "./errorMessage";

// const movieGenres = getMovie('genres', '', 1).then(data => console.log(data));

const galleryRef = document.querySelector('.gallery');
const pageNumRef = document.querySelector('#pages');
const formRef = document.querySelector('.form');

const MOVIES_PER_PAGE = 20;
// 
const MOVIES_KEY = 'movies';
// 
const GET_MOVIES_RULES = {
    genres: 'genres',
    trends: 'trends',
    search: 'search',
};
// 
const STORAGE_KEYS = {
    watched: 'watchedAll',
    queue: 'queueAll',
}

getAndRenderInitialValues();

formRef.addEventListener('submit', onFormSubmit);

/*
 * ===================
 */ 
/* Getting and Rendering Initial Values*/
async function getAndRenderInitialValues() {
    const genres = await getGenres();
    await localStorage.setItem('genres', JSON.stringify(genres.sort((a, b) => a.id - b.id)));

    await reDrawMovies(GET_MOVIES_RULES.trends, 1);
};
/* MAIN Content Rendering Function */
async function reDrawMovies(rules, pgNum, queryString) {
    hideErrorMsg();

    const movies = await getMovies(rules, pgNum, queryString);
    if (await isNoMovies(movies)) {
        showErrorMsg();
        return;
    };

    await localStorage.setItem(MOVIES_KEY, JSON.stringify({ ...movies, rules, search_string: queryString }));

    await drawGallery(galleryRef, movies.results);
    await drawPagination(pageNumRef, movies.page, movies.total_pages > 20 ? 20 : movies.total_pages);

    await pageNumRef.addEventListener('click', onPgNumClk);
    await galleryRef.addEventListener('click', onGalleryClk);

    await window.scrollTo(0, 0);
};
/* Check for an empty list of movies */
function isNoMovies(movies) {
    return !movies.total_results;
}
/* = */
function onFormSubmit(e) {
    e.preventDefault();
    const searchString = e.target.elements.input.value;
    console.log('search: ', searchString);

    if (!searchString) { return };

    reDrawMovies(GET_MOVIES_RULES.search, 1, searchString)
}
/* = */
function onGalleryClk(e) {
    const movieNumberEl = e.target.closest('.gallery__item');
    // console.log(e.target);
    // console.log(movieNumberEl);
    console.log(`%c${movieNumberEl.dataset.movie}`, 'color: yellow; background-color: red; display: inline-block; padding: 5px; font-weight: bold;');

    const movie = JSON.parse(localStorage.getItem(MOVIES_KEY))
        .results[movieNumberEl.dataset.movie];
    
    // console.log(movieNumberEl.dataset.movie);
    // console.log(movie);

//  ===|     function CALLING_A_MODAL_WINDOW_BY_CLICK_ON_A_MOVIE_IN_THE_GALLERY () {}   |====
    
    // Add movie to local storage - used from modal windoow
    addMovieToStorage('queue', movie);
};

/* = */
function onPgNumClk(e) {
    const targetPageNum = e.target.dataset.page;
    
    if (!targetPageNum) {
        return;
    }

    const movies = JSON.parse(localStorage.getItem(MOVIES_KEY))

    const currentPageNum = movies.page;
    const totalPages = movies.total_pages;

    const newPageNum = calcNewPgNum(currentPageNum, targetPageNum, totalPages > 20 ? 20 : totalPages);

    reDrawMovies(movies.rules, newPageNum, movies.search_string);
};
/*  Add movie to local storage - Used from Modal Window */
function addMovieToStorage(storageKey, movie) {
    console.log('addMovieToStorage started... storageKey: ', storageKey, 'movie: ', movie);
    console.log('STORAGE_KEYS[storageKey]: ', STORAGE_KEYS[storageKey]);

    if (!isMovieInStorage(storageKey, movie.id)) {
        let storageMovies = JSON.parse(localStorage.getItem(STORAGE_KEYS[storageKey]));

        if (!storageMovies) {
            storageMovies = {
                results: [],
                total_results: 0,
                total_pages: 0
            };
        }

        storageMovies.results.push(movie);
        storageMovies.total_results += 1;
        storageMovies.total_pages = Math.ceil(storageMovies.total_results / MOVIES_PER_PAGE);
        
        localStorage.setItem(STORAGE_KEYS[storageKey], JSON.stringify(storageMovies));

        // === | CHANGE Button Style to ACTIVE | ===
    } else {
        // === | DELETE Current Movie and CHANGE Button Style to inACTIVE | ===
    }
};

function isMovieInStorage(storageKey, movieId) {
    const storageMovies = JSON.parse(localStorage.getItem(STORAGE_KEYS[storageKey]));
    if (!storageMovies) return false;

    return storageMovies.results.find(movie => movie.id === movieId)
        ? true
        : false;
}