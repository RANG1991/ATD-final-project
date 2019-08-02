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
            let allImages = action.payload.files.map(x => URL.createObjectURL(x));
            state = state.set('imgs', state.get('imgs').concat(fromJS(allImages)));
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
            state = state.set('selectedRestaurantName' , '');
            state = state.set('selectedRestaurantLocation' , '');
            return state;
        case NewReviewConstants.NAME_ERROR:
            state = state.set('errorName', 'the name cannot be empty');
            return state;
        case NewReviewConstants.CHANGE_SELECTED_RESTAURANT:
            state = state.set('selectedRestaurantName' , action.payload.name);
            state = state.set('selectedRestaurantLocation' , action.payload.location);
            return state;
        default:
            return state;
    }
};

export default NewReviewReducer;