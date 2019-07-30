import initialState from "../initialState";
import SearchUsernameConstants from "../Constants/SearchUsernameConstants";
import {fromJS} from "immutable";

const SearchUsernameReducer = (state = initialState.userSearch, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case SearchUsernameConstants.CHANGE_LOCATION_SEARCH_USER:
            state = state.set('location', action.payload.location);
            return state;
        case SearchUsernameConstants.CHANGE_NAME_SEARCH_USER:
            state = state.set('name', action.payload.name);
            return state;
        case SearchUsernameConstants.ON_CLICK_SEARCH_USER:
            let users = [];
            if (state.get('name') !== ''){
                users = action.payload.users.filter(m => m.username === state.get('username'));
            }
            if (state.get('location') !== ''){
                users = action.payload.users.filter(m => m.location === state.get('location'));
            }
            state = state.set('users', fromJS(users));
            return state;
        default:
            return state;
    }
};

export default SearchUsernameReducer;
