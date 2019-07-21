import AllReviewsConstants from "../Constants/AllReviewsConstants"

function sortBy(sortMethod) {
    return {
        type: AllReviewsConstants.SORT_BY,
        payload: {sortMethod}
    }
}

let AllReviewsActions  = {
    sortBy,
};

export default AllReviewsActions