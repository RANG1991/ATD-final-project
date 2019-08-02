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
            state = state.set('username', action.payload.name);
            return state;
        case SearchUsernameConstants.ON_CLICK_SEARCH_USER:
            let users = [];
            if (state.get('username') !== '' && state.get('location') === ''){
                users = action.payload.users.filter(m => m.get('username') === state.get('username'));
            }
            else if (state.get('username') === '' && state.get('location') !== ''){
                users = action.payload.users.filter(m => m.get('location') === state.get('location'));
            }
            else if (state.get('username') !== '' && state.get('location') !== '') {
                users = action.payload.users.filter(m => m.get('location') === state.get('location'));
                users = users.filter(m => m.get('username') === state.get('username'));
            }
            state = state.set('users', fromJS(users));
            return state;
        case SearchUsernameConstants.ON_CLICK_VIEW_PROFILE:
            let idxToUpdate = state.get('users').findIndex(i => i.get('username') === action.payload.username);
            let viewProfileBoolean = state.getIn(['users', idxToUpdate, 'viewProfileInSearch']);
            state = state.setIn(['users', idxToUpdate, 'viewProfileInSearch'], !viewProfileBoolean);
            return state;
        default:
            return state;
    }
};

export default SearchUsernameReducer;
