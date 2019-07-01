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

    let AppActions  = {
        addRestaurant,
        changeUserName,
        changeLocation,
        handleSubmitLogin,
        addImage
    };

export default AppActions