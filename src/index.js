import { getGenres, getTrends } from "./getMovies";
import { createGalleryMarkup } from "./createGalleryMarkup";
import { drawPagination } from "./drawPagination";

// const movieGenres = getMovie('genres', '', 1).then(data => console.log(data));

const gallery = document.querySelector('.gallery');
const pageNumRef = document.querySelector('#pages');

getInitialDates();

async function getInitialDates() {
    const genres = await getGenres();
    await localStorage.setItem('genres', JSON.stringify(genres.sort((a, b) => a.id - b.id)));

    await reDrawTrends(1);
};

async function reDrawTrends(pgNum) {
    const trends = await getTrends(pgNum);
    await localStorage.setItem('trends', JSON.stringify(trends));

    await drawGallery(trends.results);
    await drawPagination(pageNumRef, trends.page, 20);

    await pageNumRef.addEventListener('click', onPgNumClk);
    await gallery.addEventListener('click', onGalleryClk);
};

function onGalleryClk(e) {
    const movieNumberEl = e.target.closest('.gallery__item');
    console.log(e.target);

    console.log(movieNumberEl);
    console.log(movieNumberEl.dataset.movie);

};

function drawGallery(data) {
    gallery.innerHTML = createGalleryMarkup(data);
    return;
};

function onPgNumClk(e) {
    const targetPageNum = e.target.dataset.page;
    
    if (!targetPageNum) {
        return;
    }

    const currentPageNum = JSON.parse(localStorage.getItem('trends')).page;
    const newPageNum = calcNewPgNum(currentPageNum, targetPageNum);

    reDrawTrends(newPageNum);
};

function calcNewPgNum(currPgNum, targetPage) {
        switch (targetPage) {
        case 'first': {
            return 1;
        };
        case 'last': {
            return 20;
        };
        case 'prev': {
            return (currPgNum === 1) ? 1 : currPgNum - 1;
        };
        case 'next': {
            return (pageNum === 20) ? 20 : currPgNum - 1;
        };
        default:
            return +targetPage;
    }
}

    // GET TRENDING
    // const MEDIA_TYPE = 'movie';
    // const TIME_WINDOW = 'day'; // day | week
    // https://api.themoviedb.org/3/trending/{MEDIA_TYPE}/{TIME_WINDOW}?api_key=<<api_key>>
    // 
    
    
    // GET SEARCH QUERY
    // 
    // https://api.themoviedb.org/3/search/movie?api_key=b282a22ae665f5f17a32a077013d243c&query=cat&page=1&include_adult=false
