import axios from "axios";
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

export function getMovie(rules, queryString, pgCurrent) {
    // const API_TOKEN_v4 = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjgyYTIyYWU2NjVmNWYxN2EzMmEwNzcwMTNkMjQzYyIsInN1YiI6IjYyZDA4MTA1NmQ5ZmU4MDk0NDJhMjliOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2nF_t43BUCf_perKaDjWwMGkDKQg8Nc1YsaBHf5n2ZY';
    // const BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = 'b282a22ae665f5f17a32a077013d243c';
    const GET_RULES = {
        genres: '/genre/movie/list',
        trending: '/trending/movie/day',
        search: '/search/movie',
    };

    // API-sample: https://api.themoviedb.org/3/movie/550?api_key=b282a22ae665f5f17a32a077013d243c

    // Get List of Genres 
    // const GET_RULES = '/genre/movie/list';
    // https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US

    // IMAGES
    // IMG_BASE_URL = 'https://image.tmdb.org/t/p/';
    // IMG_FILE_SIZE = 'w780';
    // IMG_FILE_PATH = '/ kqjL17yufvn9OVLyXYpvtyrFfak.jpg'
    
    // GET TRENDING
    // const TIME_WINDOW = 'day'; // day | week
    // const GET_RULES = `/trending/movie/{TIME_WINDOW}`;
    // https://api.themoviedb.org/3/trending/{MEDIA_TYPE}/{TIME_WINDOW}?api_key=<<api_key>>
    // 
    
    
    // GET SEARCH QUERY
    // 
    // https://api.themoviedb.org/3/search/movie?api_key=b282a22ae665f5f17a32a077013d243c&query=cat&page=1&include_adult=false
    
    // const GET_RULES = '/search/movie';

    const configAxios = {
        params: {
                    api_key: API_KEY,
                    language: 'en-US',
                    include_adult: false,
                    page: pgCurrent,
                    query: queryString,
                },
    };

    const resp = axios.get(GET_RULES[rules], configAxios);
    return resp;

    // const queryStr = `${BASE_URL}${GET_RULES[rules]}?${getParams}`;
    // console.log(queryStr);
    // return fetch(`${BASE_URL}${GET_RULES[rules]}?${getParams}`).then(resp => resp.json());
};