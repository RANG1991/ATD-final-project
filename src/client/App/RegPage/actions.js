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

function handleSubmitRegister()
{
    return {
        type: AppActionsConstants.HANDLE_SUBMIT_REGIST
    }
}

function addImage(acceptedFiles)
{
    return {
        type: AppActionsConstants.ADD_IMAGE,
        payload: {acceptedFiles: acceptedFiles}
    }
}

function onClickRegisterNavBar() {
    return {
        type: AppActionsConstants.ON_CLICK_REGISTER_NAV_BAR
    }
}

function onClickLoginNavBar() {
    return {
        type: AppActionsConstants.ON_CLICK_HOME_NAV_BAR
    }
}


    let AppActions  = {
        addRestaurant,
        changeUserName,
        changeLocation,
        handleSubmitRegister,
        addImage,
        onClickRegisterNavBar,
        onClickLoginNavBar
    };

export default AppActions