import SearchUsernameConstants from '../Constants/SearchUsernameConstants'

function changeLocationSearchUsername(location) {
    return {
        type: SearchUsernameConstants.CHANGE_LOCATION_SEARCH_USER,
        payload: {
            location
        }
    }
}

function changeNameSearchUsername(name) {
    return {
        type: SearchUsernameConstants.CHANGE_NAME_SEARCH_USER,
        payload: {
            name
        }
    }
}

function onClickSearchUsername(users) {
    return {
        type: SearchUsernameConstants.ON_CLICK_SEARCH_USER,
        payload: {
            users,
        }
    }
}

let SearchUsernameActions = {
    changeLocationSearchUsername,
    changeNameSearchUsername,
    onClickSearchUsername,
};

export default SearchUsernameActions;