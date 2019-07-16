import {UserActionsConstants} from '../Constants/CurrentUserConstants.js';

function changeUserName(username, usersList)
{
    return {
        type: UserActionsConstants.CHANGE_USER_NAME,
        payload: {username: username, users: usersList}
    }
}

function changeLocation(location)
{
    return {
        type: UserActionsConstants.CHANGE_LOCATION,
        payload: {location: location}
    }
}

function handleSubmitRegister(usersList)
{
    return {
        type: UserActionsConstants.HANDLE_SUBMIT_REGISTER,
        payload : {users: usersList}
    }
}

function addImage(acceptedFiles)
{
    return {
        type: UserActionsConstants.ADD_IMAGE,
        payload: {acceptedFiles: acceptedFiles}
    }
}


    let AppActions  = {
        changeUserName,
        changeLocation,
        handleSubmitRegister,
        addImage
    };

export default AppActions