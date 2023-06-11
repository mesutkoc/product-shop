import PROJECT_CONSTANTS from './constants';

const getPageCount = (totalResults) => {
    const pageNumber = [];
    const pageCount = Math.ceil(totalResults / PROJECT_CONSTANTS.FILM_COUNT_FOR_PER_PAGE);
    for (let count = 1; count < pageCount + 1; count++) {
        pageNumber.push(count)
    }
    return pageNumber;
}


export { getPageCount }