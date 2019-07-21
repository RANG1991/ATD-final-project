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
            if (state.get('location') !== '') {
                allReviews = allReviews.filter(review => review.location === state.get('location'));
            }
            state = state.set('reviews', allReviews);
            return state;
        case AdvancedSearchConstants.ON_CHANGE_RADIO_BUTTON_NAME:
            state = state.set('valueRadioButtonName', action.payload.value);
            return state;
        case AdvancedSearchConstants.ON_CHANGE_RADIO_BUTTON_LOCATION:
            state = state.set('valueRadioButtonLocation', action.payload.value);
            return state;
        default:
            return state;
    }
};

export default AppReducer;