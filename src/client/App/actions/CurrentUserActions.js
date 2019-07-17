import {CurrentUserConstants} from '../Constants/CurrentUserConstants.js';

function changeUserName(username)
{
    return {
        type: CurrentUserConstants.CHANGE_USERNAME,
        payload: {username: username}
    }
}

function changeLocation(location)
{
    return {
        type: CurrentUserConstants.CHANGE_LOCATION,
        payload: {location: location}
    }
}

function resetCurrentState()
{
    return {
        type: CurrentUserConstants.RESET_CURRENT_STATE,
    }
}

function usernameError() {
   return {
       type: CurrentUserConstants.USER_NAME_ERROR
   }
}

function addImage(acceptedFiles)
{
    return {
        type: CurrentUserConstants.ADD_IMAGE,
        payload: {acceptedFiles: acceptedFiles}
    }
}
    let CurrentUserActions  = {
        changeUserName,
        changeLocation,
        usernameError,
        resetCurrentState,
        addImage
    };

export default CurrentUserActions