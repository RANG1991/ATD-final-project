import AllReviewsConstants from "../Constants/AllReviewsConstants"

function sortBy(sortMethod) {
    return {
        type: AllReviewsConstants.SORT_BY,
        payload: {sortMethod}
    }
}

function changeValueEdit(name, value) {
    return {
        type: AllReviewsConstants.CHANGE_VALUE_EDIT,
        payload: {name, value}
    }
}

let AllReviewsActions  = {
    sortBy,
    changeValueEdit,
};

export default AllReviewsActions