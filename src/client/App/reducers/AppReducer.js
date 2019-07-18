import initialState from "../initialState";
import AppConstants from "../Constants/AppConstants";
const {fromJS} = require('immutable');

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case AppConstants.ADD_USER:
            state = state.update('users', e => e.push(
                fromJS({username: action.payload.username, location: action.payload.location,
                    imagePath: action.payload.imagePath}))
            );
            return state;
        case AppConstants.ADD_RESTAURANT:
            state = state.update('restaurants', e => e.push(
                fromJS({name: action.payload.name, images: action.payload.images, bathroom: action.payload.bathroom,
                    staff: action.payload.staff, cleanliness: action.payload.cleanliness,
                    drive: action.payload.drive, delivery: action.payload.delivery}))
            );
            return state;
        default:
            return state;
    }
};

export default AppReducer;