import initialState from "../initialState";
import NewReviewConstants from "../Constants/NewReviewConstants"

const NewReviewReducer = (state = initialState.newReview, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case NewReviewConstants.CHANGE_PARAM_VALUE:
            state = state.set(action.payload.param_name, action.payload.param_value);
            return state;
        case NewReviewConstants.CHANGE_NAME:
            state = state.set('name', action.payload.name);
            return state;
        case NewReviewConstants.ADD_IMAGES:
            state = state.update('imgs', e => e.push(...action.payload.files.map(x => URL.createObjectURL(x))));
            return state;
        default:
            return state;
    }
};

export default NewReviewReducer;