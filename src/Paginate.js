const max = 30;

function paginate(list, pageSize, pageNumber) {
    if(list.length <= max){
        return list; //if it's not more than the max, no pages are necessary
    }

    return list.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}

function getPageCount(listSize){
    return Math.ceil(listSize / max);
}

function getElementsPerPage(){
    return max;
}

export {paginate, getPageCount, getElementsPerPage}