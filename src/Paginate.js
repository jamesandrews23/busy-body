const max = 30;

function paginate(list, pageSize, pageNumber) {
    return list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

function getPageCount(listSize){
    return Math.ceil(listSize / max);
}

function getElementsPerPage(){
    return max;
}

export {paginate, getPageCount, getElementsPerPage}