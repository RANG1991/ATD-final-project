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
            if ((state.get('enableName'))) {
                allReviews = action.payload.allReviews.filter(review => review.name === state.get('name'));
            }
            if ((state.get('enableLocation'))) {
                allReviews = action.payload.allReviews.filter(review => review.location === state.get('location'));
            }
            if (state.get('enableName') && (state.get('enableLocation'))) {
                allReviews = action.payload.allReviews.filter(review => review.location === state.get('location'));
                allReviews = allReviews.filter(review => review.name === state.get('name'));
            }
            if (state.get('valueRadioButton') !== 0 && state.get('enableButtons')){
                allReviews = allReviews.filter(review => calculateAverage(review) >= state.get('valueRadioButton'));
            }
            allReviews.sort((x, y) => (calculateAverage(x) - calculateAverage(y)));
            state = state.set('savedReviews', fromJS(allReviews));
            state = state.set('reviews', fromJS(allReviews));
            state.set('location', "");
            state.set('name', "");
            return state;
        case AdvancedSearchConstants.ON_CHANGE_RADIO_BUTTON:
            state = state.set('valueRadioButton', action.payload.value.toString());
            return state;
        case AdvancedSearchConstants.ON_CHANGE_RADIO_BUTTON_SEARCH_BY:
            state = state.set('searchBy', action.payload.value.toString());
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
        case AdvancedSearchConstants.ON_CHANGE_SLIDER:
            let reviews = state.get('savedReviews');
            let reviewsJS = reviews.toJS();
            console.log(reviewsJS);
            reviewsJS = reviewsJS.sort((x, y) => {
                console.log(action.payload.value / 100);
                let value = ((action.payload.value / 100) * (calculateDistance(x['coor'], action.payload.coor.toJS()))
                    + (1 - (action.payload.value / 100)) * calculateAverage(x)) -
                    ((action.payload.value / 100) * (calculateDistance(y['coor'], action.payload.coor.toJS())) +
                        (1 - (action.payload.value / 100)) * calculateAverage(y));
                console.log(value);
                return value}
            );
            console.log(reviewsJS);
            state = state.set('reviews', fromJS(reviewsJS));
            return state;
        default:
            return state;
    }
};

const calculateAverage = (review) => {
    return ((review.bathroom + review.staff + review.cleanliness
    + review.drive + review.delivery + review.food) / 6);
};

const calculateDistance = (coor1, coor2) => {
    console.log("the coordinates are: ", coor1, coor2);
    return  getDistanceBetweenPoints(coor1['lat'], coor1['lng'], coor2['lat'], coor2['lng']);
};

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371;
    let dLat = deg2rad(lat2-lat1);
    let dLon = deg2rad(lon2-lon1);
    let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return d;
}

function getDistanceBetweenPoints(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}


function deg2rad(deg) {
    return deg * (Math.PI/180)
}


export default AdvancedSearchReducer;