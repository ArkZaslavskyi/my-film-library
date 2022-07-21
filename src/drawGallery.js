/*
 *  MAIN Function for Drawing the Gallery on Page
 */

import { IMG_BASE_URL, IMG_FILE_SIZE, MAX_GENRES_NUMBER } from "./basedConst";

export function drawGallery(galleryRef, data) {
    galleryRef.innerHTML = createGalleryMarkup(data);
    return;
};

function createGalleryMarkup(data) {
    return data.map((movie, i) => createCardMarkup(movie, i)).join('');
};

function createCardMarkup ({poster_path, genre_ids, title, release_date, vote_average}, movieNumber) {
    // Fields Description
    // ==================
    // poster_path  - relative PATH to VERTICAL image (string)
    // genre_ids    - ARRAY of all genres (array of numbers)
    // title        - title (string)
    // release_date - date (string) in format 'YYYY-MM-DD'
    // vote_average - vote (number)

    return `
    <li class="gallery__item" data-movie="${movieNumber}">
        <a class="gallery__link">
            <div class="img__wrap">
                <img class="gallery__img" src="${IMG_BASE_URL}${IMG_FILE_SIZE}${poster_path}">
            </div>
            <p class="gallery__info">
                <span class="gallery__info--title">${title}</span>
                <span class="galery__info--text">${createListOfGenres(genre_ids)} | ${release_date ? release_date.slice(0, 4) : ''}</span>
                <span class="gallery__info--vote">${vote_average.toFixed(1)}</span>
            </p>
        </a>
    </li>
    `;
}

function createListOfGenres(genre_ids) {

    // create Array of Genres Names form Array of Genres Ids 
    const genresNames = genre_ids.map(getGenresNames);
    
    if (!genresNames) return '';

    // return list of genres not more than 3
    if (genresNames.length <= MAX_GENRES_NUMBER) {
        return genresNames.join(', ');
    } else {
        return [...genresNames.slice(0,(MAX_GENRES_NUMBER - 1)), 'other...'].join(', ');
    };
}

function getGenresNames(genreId) {
    // get All Genres Names from Local Storage 
    const genresAll = JSON.parse(localStorage.getItem('genres'));

    // Find and Return the Name of Genre on Id 
    return genresAll
        .find(genre => genre.id === genreId)
        .name;
}
