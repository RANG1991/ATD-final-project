import initialState from "../initialState";
import AllReviewsConstants from "../Constants/AllReviewsConstants"

const AllReviewsReducer = (state = initialState.allReviews, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case AllReviewsConstants.SORT_BY:
            state = state.set('sortBy', action.payload.sortMethod);
            return state;
        default:
            return state;
    }
};

export default AllReviewsReducer;