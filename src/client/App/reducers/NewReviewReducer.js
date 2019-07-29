import initialState from "../initialState";
import NewReviewConstants from "../Constants/NewReviewConstants"
const {List, fromJS} = require('immutable');

const NewReviewReducer = (state = initialState.newReview, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case NewReviewConstants.CHANGE_PARAM_VALUE:
            state = state.set(action.payload.param_name, action.payload.param_value);
            return state;
        case NewReviewConstants.CHANGE_NAME:
            if (action.payload.name === "") {
                state = state.set('errorName', 'the name cannot be empty');
            }
            else {
                state = state.set('errorName', '')
            }
            state = state.set('name', action.payload.name);
            return state;
        case NewReviewConstants.CHANGE_LOCATION:
            state = state.set('location', action.payload.location);
            return state;
        case NewReviewConstants.ADD_IMAGES:
            state = state.set('imgs', state.get('imgs').concat(fromJS(action.payload.files)));
            return state;
        case NewReviewConstants.RESET_FORM:
            state = state.set('name', "");
            state = state.set('location', "");
            state = state.set('bathroom', 0);
            state = state.set('staff', 0);
            state = state.set('cleanliness', 0);
            state = state.set('drive', 0);
            state = state.set('delivery', 0);
            state = state.set('food', 0);
            state = state.set('imgs', List());
            return state;
        case NewReviewConstants.NAME_ERROR:
            state = state.set('errorName', 'the name cannot be empty');
            return state;
        default:
            return state;
    }
};

export default NewReviewReducer;