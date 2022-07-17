export function createGalleryMarkup(data) {
    return data.map((trend, i) => createCardMarkup(trend, i)).join('');
};

function createCardMarkup ({poster_path, genre_ids, title, release_date, vote_average}, movieNumber) {
    // Fields Description
    // ==================
    // poster_path  - relative PATH to VERTICAL image (string)
    // genre_ids    - ARRAY of all genres (array of numbers)
    // title        - title (string)
    // release_date - date (string) in format 'YYYY-MM-DD'
    // vote_average - vote (number)

    const IMG_BASE_URL = 'https://image.tmdb.org/t/p/';
    const IMG_FILE_SIZE = 'w780';

    return `
    <li class="gallery__item" data-movie="${movieNumber}">
        <a class="gallery__link">
            <div class="img__wrap">
                <img class="gallery__img" src="${IMG_BASE_URL}${IMG_FILE_SIZE}${poster_path}">
            </div>
            <p class="gallery__info">
                <span class="gallery__info--title">${title}</span>
                <span class="galery__info--text">${createListOfGenres(genre_ids)} | ${release_date.slice(0, 4)}</span>
                <span class="gallery__info--vote">${vote_average.toFixed(1)}</span>
            </p>
        </a>
    </li>
    `;
}

function createListOfGenres(genres) {
    const MAX_GENRES_NUMBER = 3;

    // create Array of genres
    const genresNames = genres.map(getGenreName);

    // return list of genres not more than 3
    if (genresNames.length <= MAX_GENRES_NUMBER) {
        return genresNames.join(', ');
    } else {
        return [...genresNames.slice(0,(MAX_GENRES_NUMBER - 1)), 'other...'].join(', ');
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
