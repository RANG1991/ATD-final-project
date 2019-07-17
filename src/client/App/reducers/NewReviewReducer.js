import initialState from "../initialState";
import NewReviewConstants from "../Constants/NewReviewConstants"

const NewReviewReducer = (state = initialState.newReview, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case NewReviewConstants.CHANGE_PARAM_VALUE:
            state = state.set(action.payload.param_name, action.payload.param_value);
            return state;
        default:
            return state;
    }
};

export default NewReviewReducer;