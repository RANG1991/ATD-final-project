import initialState from "../initialState";
import AdvancedSearchConstants from "../Constants/AdvancedSearchConstants";

const AppReducer = (state = initialState.advancedSearch, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case AdvancedSearchConstants.CHANGE_LOCATION_SEARCH:
            state = state.set('location', action.payload.location);
            return state;
        case AdvancedSearchConstants.CHANGE_NAME_SEARCH:
            state = state.set('name', action.payload.name);
            return state;
        case AdvancedSearchConstants.ON_CLICK_SEARCH:
            let allReviews = [];
            if (state.get('name') !== '') {
                allReviews = action.payload.allReviews.filter(review => review.name === state.get('name'));
            }
            if (state.get('location') !== ''){
                allReviews = action.payload.allReviews.filter(review => review.location === state.get('location'));
            }
            if (state.get('valueRadioButton') !== 0){
                allReviews = allReviews.filter(review => calculateAverage(review) >= state.get('valueRadioButton'));
            }
            allReviews.sort((x, y) => (calculateAverage(x) - calculateAverage(y)));
            state = state.set('reviews', allReviews);
            return state;
        case AdvancedSearchConstants.ON_CHANGE_RADIO_BUTTON:
            state = state.set('valueRadioButton', action.payload.value);
            return state;
        default:
            return state;
    }
};

const calculateAverage = (review) => {
    return ((review.bathroom + review.staff + review.cleanliness
    + review.drive + review.delivery + review.food) / 6);
};

export default AppReducer;