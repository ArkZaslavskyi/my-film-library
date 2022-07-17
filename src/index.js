import { getMovie } from "./getMovie";

// const movieGenres = getMovie('genres', '', 1).then(data => console.log(data));

const gallery = document.querySelector('.gallery');
const pages = document.querySelector('#pages');

localStorage.setItem('pgTrends', 1);
getInitialDates();


async function getInitialDates() {
    const genres = await getGenres();
    await console.log(genres);
    await localStorage.setItem('genres', JSON.stringify(genres.sort((a, b) => a.id - b.id)));

    await reDrawTrends(1);
};

async function reDrawTrends(pgNum) {
    console.log('reDrawTrends started');

    const trends = await getTrends(pgNum);
    await console.log(trends);
    await localStorage.setItem('trends', JSON.stringify(trends));

    await drawGallery(trends.results);
    await drawPgNums(trends.page);

    await gallery.addEventListener('click', onGalleryClk);
};

function onGalleryClk(e) {
    // <li id="movie"...>
    const movieNumberEl = e.target.closest('.gallery__item');
    console.log(e.target);

    console.log(movieNumberEl);
    console.log(movieNumberEl.dataset.movie);

};

function drawGallery(data) {
    gallery.innerHTML = createGalleryMarkup(data);
    return;
};

async function getGenres() {
    try {
        const resp = await getMovie('genres', '', 1);
        return resp.data.genres;
    } catch (error) {
        
    }
}

async function getTrends(pgNum) {
    try {
        const resp = await getMovie('trending', '', pgNum);
        return resp.data;
    } catch (error) {
        
    }
} 

function drawPgNums(pgCurrent) {
    pgNumsMarkup = `
            <button type="button" class="pg-btn" data-page="prev">&lt;-</button>
            <button type="button" class="num-btn" data-page="first">1</button>
            <span class="num-btn">...</span>    
            ${pgNumsCurrPgMarkup(pgCurrent)}
            <span class="num-btn">...</span>    
            <button type="button" class="num-btn" data-page="last">20</button>
            <button type="button" class="pg-btn" data-page="next">-&gt;</button>
        `;
    
    pages.innerHTML = pgNumsMarkup;

    pages.addEventListener('click', onPgNumClk);
}

function pgNumsCurrPgMarkup(pg) {
    let pgBegin = 0;
    let pgEnd = 0;
    let markup = '';

    if (pg < 3) {
        pgBegin = 1;
        pgEnd = 5;
    } else if (pg > 17) {
        pgBegin = 16;
        pgEnd = 20;
    } else {
        pgBegin = pg - 2;
        pgEnd = pg + 2;
    };

    for (let i = pgBegin; i <= pgEnd; i++) {
        markup += `<span class="${i !== pg ? 'num-btn' : 'pg-btn pg-btn--cur'}" data-page="${i}">${i}</span>`;
        // if (i !== pg) {
        //     markup += `<span class="${i !== pg ? 'num-btn' : 'pg-btn pg-btn--cur'}" data-page="${i}">${i}</span>`;
        // } else {
        //     markup += `<span class="pg-btn pg-btn--cur" data-page="${i}">${i}</span>`;
        // };
    };
        return markup;
}


function onPgNumClk(e) {
    console.log('target: ', e.target); // button
    console.log('dataset.page', e.target.dataset.page);
    // console.log('currentTarget: ', e.currentTarget); // div

    let pageNum = +localStorage.getItem('pgTrends');
    switch (e.target.dataset.page) {
        case 'first': {
            pageNum = 1;
            break;
        };
        case 'last': {
            pageNum = 20;
            break;
        };
        case 'prev': {
            if (pageNum === 1) return;
            pageNum--;
            break;
        };
        case 'next': {
            if (pageNum === 20) return;
            pageNum++;
            break;
        };
        default:
            pageNum = +e.target.dataset.page;
    }
    // console.log('new value of pageNum: ', pageNum);

    localStorage.setItem('pgTrends', pageNum);
    reDrawTrends(pageNum);
};

// console.log(genres);

    // GET TRENDING
    // const MEDIA_TYPE = 'movie';
    // const TIME_WINDOW = 'day'; // day | week
    // https://api.themoviedb.org/3/trending/{MEDIA_TYPE}/{TIME_WINDOW}?api_key=<<api_key>>
    // 
    
    
    // GET SEARCH QUERY
    // 
    // https://api.themoviedb.org/3/search/movie?api_key=b282a22ae665f5f17a32a077013d243c&query=cat&page=1&include_adult=false
function createGalleryMarkup(data) {
    console.log('createGalleryMarkup started...');
    console.log(data);

    return data.map((trend, i) => createCardMarkup(trend, i)).join('');
};

function createCardMarkup ({poster_path, genre_ids, title, release_date, vote_average}, movieNumber) {
    // backdrop_path - relative PATH to image (string)
    // genre_ids - ARRAY of all genres (array of numbers)
    // title - title (string)
    // release_date - date (string) in format 'YYYY-MM-DD'
    // vote_average - vote (number)

    const IMG_BASE_URL = 'https://image.tmdb.org/t/p/';
    const IMG_FILE_SIZE = 'w780';
    // IMG_FILE_PATH = '/ kqjL17yufvn9OVLyXYpvtyrFfak.jpg'

    // console.log('| INPUT DATES |', backdrop_path, genre_ids, title, release_date, vote_average);
    const markup = `
    <li class="gallery__item" data-movie="${movieNumber}">
        <a class="gallery__link">
            <div class="img__wrap">
                <img class="gallery__img" src="${IMG_BASE_URL}${IMG_FILE_SIZE}${poster_path}">
            </div>
            <p class="gallery__info">
                <span class="gallery__info--title">${title}</span>
                <span class="galery__info--text">${createListOfGenres(genre_ids)} | ${release_date.slice(0, 4)}</span>
                <span class="gallery__info-vote">${vote_average.toFixed(1)}</span>
            </p>
        </a>
    </li>
    `;
    return markup;
}

function createListOfGenres(genres) {
    // create Array of genres
    const genresNames = genres.map(genre => getGenreName(genre));
    // return list of genres not more than 3
    if (genresNames.length < 4) {
        return genresNames;
    } else {
        return [...genresNames.slice(0,2), 'Other'];
    };
}

function getGenreName(genreId) {
    // get All Genres from local storage 
    const genresAll = JSON.parse(localStorage.getItem('genres'));

    // Find and Return the Name of Genre on Id 
    return genresAll
        .find(genre => genre.id === genreId)
        .name;
}