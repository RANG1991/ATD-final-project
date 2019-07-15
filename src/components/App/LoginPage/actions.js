import {AppActionsConstants} from './Constants.js';

function addRestaurant(restaurant) {
    return {
        type: AppActionsConstants.ADD_RESTAURANT,
        payload: {restaurant: restaurant}
    }
}

function changeUserName(username)
{
    return {
        type: AppActionsConstants.CHANGE_USER_NAME,
        payload: {username: username}
    }
}

function changeLocation(location)
{
    return {
        type: AppActionsConstants.CHANGE_LOCATION,
        payload: {location: location}
    }
}

function handleSubmitLogin()
{
    return {
        type: AppActionsConstants.HANDLE_SUBMIT_LOGIN
    }
}

function addImage(acceptedFiles)
{
    return {
        type: AppActionsConstants.ADD_IMAGE,
        payload: {acceptedFiles: acceptedFiles}
    }
}

function onClickLoginNavBar() {
    return {
        type: AppActionsConstants.ON_CLICK_LOGIN_NAV_BAR
    }
}

function onClickHomeNavBar() {
    return {
        type: AppActionsConstants.ON_CLICK_HOME_NAV_BAR
    }
}


    let AppActions  = {
        addRestaurant,
        changeUserName,
        changeLocation,
        handleSubmitLogin,
        addImage,
        onClickLoginNavBar,
        onClickHomeNavBar,
    };

export default AppActions