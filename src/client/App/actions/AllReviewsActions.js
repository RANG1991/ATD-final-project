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

function openDialogEditReview(open) {
    return {
        type: AllReviewsConstants.OPEN_DIALOG_EDIT_REVIEW,
        payload: {open}
    }
}

let AllReviewsActions  = {
    sortBy,
    changeValueEdit,
    openDialogEditReview,
};

export default AllReviewsActions