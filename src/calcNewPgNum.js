/*
 *  Function to Calculate New Page Number based on the Current and Target Numbers  
 */
export function calcNewPgNum(currPgNum, targetPage, totalPages) {
        switch (targetPage) {
        case 'first': {
            return 1;
        };
        case 'last': {
            return totalPages;
        };
        case 'prev': {
            return (currPgNum === 1) ? 1 : currPgNum - 1;
        };
        case 'next': {
            return (currPgNum === totalPages) ? totalPages : currPgNum + 1;
        };
        default:
            return +targetPage;
    }
}
