export function drawPagination(pgRef, pgCurrent, totalPages) {
    const pgNumsMarkup = `
            <button type="button" class="pg-btn" data-page="prev">&lt;-</button>
            <button type="button" class="num-btn" data-page="first">1</button>
            <span class="num-btn">...</span>    
            ${pgNumsCurrPgMarkup(pgCurrent, totalPages)}
            <span class="num-btn">...</span>    
            <button type="button" class="num-btn" data-page="last">${totalPages}</button>
            <button type="button" class="pg-btn" data-page="next">-&gt;</button>
        `;
    
    pgRef.innerHTML = pgNumsMarkup;
}

function pgNumsCurrPgMarkup(pgCurrent, totalPages) {
    const NUMS_PER_PAGE = 5;

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
