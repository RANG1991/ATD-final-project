import initialState from "../initialState";
import AdvancedSearchConstants from "../Constants/AdvancedSearchConstants";
import {fromJS} from "immutable";

const AdvancedSearchReducer = (state = initialState.advancedSearch, action) => {
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
            if (state.get('name') !== '' && (state.get('enableName'))) {
                allReviews = action.payload.allReviews.filter(review => review.name === state.get('name'));
            }
            if (state.get('location') !== '' && (state.get('enableLocation'))) {
                allReviews = action.payload.allReviews.filter(review => review.location === state.get('location'));
            }
            if (state.get('valueRadioButton') !== 0){
                allReviews = allReviews.filter(review => calculateAverage(review) >= state.get('valueRadioButton'));
            }
            allReviews.sort((x, y) => (calculateAverage(x) - calculateAverage(y)));
            state = state.set('reviews', fromJS(allReviews));
            return state;
        case AdvancedSearchConstants.ON_CHANGE_RADIO_BUTTON:
            state = state.set('valueRadioButton', action.payload.value);
            return state;
        case AdvancedSearchConstants.ON_CHANGE_RADIO_BUTTON_SEARCH_BY:
            switch(action.payload.value) {
                case 1:
                    state = state.set('enableLocation', false);
                    state = state.set('enableName', true);
                    state = state.set('enableButtons', true);
                    break;
                case 2:
                    state = state.set('enableName', false);
                    state = state.set('enableLocation', true);
                    state = state.set('enableButtons', true);
                    break;
                case 3:
                    state = state.set('enableButtons', false);
                    state = state.set('enableName', true);
                    state = state.set('enableLocation', true);
                    break;
                default:
                    break;
            }
            return state;
        default:
            return state;
    }
};

const calculateAverage = (review) => {
    return ((review.bathroom + review.staff + review.cleanliness
    + review.drive + review.delivery + review.food) / 6);
};

export default AdvancedSearchReducer;