import initialState from "../initialState";
import AppConstants from "../Constants/AppConstants";

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case AppConstants.ADD_USER:
            state = state.update('users', e => e.push(
                {username: action.payload.username, location: action.payload.location, imagePath: action.payload.imagePath})
            );
            return state;
        case AppConstants.ADD_RESTAURANT:
            return state;
        default:
            return state;
    }
};

export default AppReducer;