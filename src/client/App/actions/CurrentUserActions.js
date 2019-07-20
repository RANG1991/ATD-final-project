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

function openDialogName(open) {
    return {
        type: CurrentUserConstants.OPEN_DIALOG_NAME,
        payload :{open}
    }
}

function openDialogLocation(open) {
    return {
        type: CurrentUserConstants.OPEN_DIALOG_LOCATION,
        payload :{open}
    }
}

function editingName(newName) {
    return {
        type: CurrentUserConstants.EDITING_NAME,
        payload: {newName}
    }
}

function editingLocation(newLocation) {
    return {
        type: CurrentUserActions.EDITING_LOCATION,
        payload: {newLocation}
    }
}

    let CurrentUserActions  = {
        changeUserName,
        changeLocation,
        usernameError,
        resetCurrentState,
        addImage,
        openDialogLocation,
        openDialogName,
        editingName,
        editingLocation,
    };

export default CurrentUserActions