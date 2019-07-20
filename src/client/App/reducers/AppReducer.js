import initialState from "../initialState";
import AppConstants from "../Constants/AppConstants";
const {fromJS} = require('immutable');

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case AppConstants.ADD_USER:
            state = state.setIn(['users', action.payload.username],
                fromJS({location: action.payload.location,
                imagePath: action.payload.imagePath, reviews: []}));
            return state;
        case AppConstants.ADD_RESTAURANT:
            let review = {name: action.payload.name, images: action.payload.images, bathroom: action.payload.bathroom,
                staff: action.payload.staff, cleanliness: action.payload.cleanliness,
                drive: action.payload.drive, delivery: action.payload.delivery, food: action.payload.food,
                currentUser: action.payload.currentUser};
            state = state.updateIn(['users', action.payload.currentUser, 'reviews'], e => e.push(fromJS(review)));
            return state;
        case AppConstants.CHANGE_USERNAME_APP:
                state = state.update('users', e => e.mapKeys(k => {
                    if (k === action.payload.oldName) {
                        return action.payload.newName;
                    } else {
                        return k;
                    }
                }));
            return state;
        case AppConstants.CHANGE_LOCATION_APP:
            state = state.setIn(['users', action.payload.username, 'location'],  action.payload.newLocation);
            return state;
        default:
            return state;
    }
};

export default AppReducer;