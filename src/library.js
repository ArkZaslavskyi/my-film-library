import { drawGallery } from "./drawGallery";
import { drawPagination } from "./drawPagination";
import { calcNewPgNum } from "./calcNewPgNum";
// 
const queueBtnRef = document.querySelector('#queue');
const watchedBtnRef = document.querySelector('#watched');
const buttonsRef = document.querySelector('.header__buttons');
const galleryRef = document.querySelector('.gallery');
const paginationRef = document.querySelector('#pagination');
const pageNumRef = document.querySelector('#page-numbers');
// 
const MOVIES_PER_PAGE = 20;
const LOCAL_MOVIES_KEY = 'localMovies';
// 
const STORAGE_KEYS = {
    watched: 'watchedAll',
    queue: 'queueAll',
}
// 
const LOCAL_MOVIES_RULES = {
    watched: 'watched',
    queue: 'queue',
};
//

/* Rendering Initial Values*/
reDrawLocalMovies(LOCAL_MOVIES_RULES.watched, 1);

/*
 * ===================
 */

/* MAIN Content Rendering Function */
function reDrawLocalMovies(rules, pgNum) {
    // Get movies Full List from needed Local Storage  
    const movies = JSON.parse(localStorage.getItem(STORAGE_KEYS[rules]));

    if (movies) {
        const localMovies = {
            page: pgNum,
            total_pages: movies.total_pages,
            total_results: movies.total_results,
            results: movies.results.slice(MOVIES_PER_PAGE * (pgNum - 1), MOVIES_PER_PAGE * pgNum),
            rules,
        }

        localStorage.setItem(LOCAL_MOVIES_KEY, JSON.stringify(localMovies));

        drawGallery(galleryRef, localMovies.results);
        drawPagination(pageNumRef, pgNum, localMovies.total_pages);
    
        paginationRef.addEventListener('click', onPgNumClk);
        galleryRef.addEventListener('click', onGalleryClk);
    } else {

        drawEmptyGallery();
};
    
    window.scrollTo(0, 0);
    buttonsRef.addEventListener('click', onBtnClk);
};

function drawEmptyGallery() {
    galleryRef.innerHTML = '<h1>EMPTY gallery</h1>';
    pageNumRef.innerHTML = '';
}

function onBtnClk(e) {
    buttonsRef.removeEventListener('click', onBtnClk);
    
    if (e.target.id === 'watched') {
        watchedBtnRef.classList.add('btn--is-active')
        queueBtnRef.classList.remove('btn--is-active');

        reDrawLocalMovies(LOCAL_MOVIES_RULES.watched, 1)
    } else {
        watchedBtnRef.classList.remove('btn--is-active')
        queueBtnRef.classList.add('btn--is-active');

        reDrawLocalMovies(LOCAL_MOVIES_RULES.queue, 1)
    };
}


function onGalleryClk(e) {
    const movieNumberEl = e.target.closest('.gallery__item');
    // console.log(e.target);
    // console.log(movieNumberEl);
    console.log(`%c${movieNumberEl.dataset.movie}`, 'color: yellow; background-color: red; display: inline-block; padding: 5px; font-weight: bold;');
};

function onPgNumClk(e) {
    if (!e.target.closest('[data-page]')) {
        return
    };

    pageNumRef.removeEventListener('click', onPgNumClk);

    const targetPageNum = e.target.closest('[data-page]').dataset.page;

    // if (!targetPageNum) {
    //     return;
    // }

    const localMovies = JSON.parse(localStorage.getItem(LOCAL_MOVIES_KEY));

    const currentPageNum = localMovies.page;
    const totalPages = localMovies.total_pages;

    const newPageNum = calcNewPgNum(currentPageNum, targetPageNum, totalPages);

    reDrawLocalMovies(localMovies.rules, newPageNum);
};

    // GET TRENDING
    // const MEDIA_TYPE = 'movie';
    // const TIME_WINDOW = 'day'; // day | week
    // https://api.themoviedb.org/3/trending/{MEDIA_TYPE}/{TIME_WINDOW}?api_key=<<api_key>>
    // 
    
    
    // GET SEARCH QUERY
    // 
    // https://api.themoviedb.org/3/search/movie?api_key=b282a22ae665f5f17a32a077013d243c&query=cat&page=1&include_adult=false
