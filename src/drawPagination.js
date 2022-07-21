/*
 *  MAIN Function for Drawing Pagination on the current Movies Gallery
 */

import { NUMS_PER_PAGE } from "./basedConst";

export function drawPagination(pgRef, pgCurrent, totalPages) {
    const pgNumsMarkup = `
            <button type="button" class="num-btn mobile-hiding" data-page="first">1</button>
            <span class="num-btn mobile-hiding" data-page="${pgCurrent}">...</span>    
            ${pgNumsCurrPgMarkup(pgCurrent, totalPages)}
            <span class="num-btn mobile-hiding" data-page="${pgCurrent}">...</span>    
            <button type="button" class="num-btn mobile-hiding" data-page="last">${totalPages}</button>
        `;

    pgRef.innerHTML = pgNumsMarkup;
}

function pgNumsCurrPgMarkup(pgCurrent, totalPages) {
    let pgBegin = 1;
    let pgEnd = totalPages;

    let markup = '';

    if (totalPages > NUMS_PER_PAGE) {
        if (pgCurrent < 3) {
            pgEnd = NUMS_PER_PAGE;
        } else if (pgCurrent > (totalPages - 3)) {
            pgBegin = totalPages - NUMS_PER_PAGE + 1;
            pgEnd = totalPages;
        } else {
            pgBegin = pgCurrent - 2;
            pgEnd = pgCurrent + 2;
        };
    }

    for (let i = pgBegin; i <= pgEnd; i++) {
        markup += `
        <span
            class="${i !== pgCurrent ? 'num-btn' : 'pg-btn pg-btn--cur'}"
            data-page="${i}">${i}</span>
        `;
    };
    
    return markup;
}
