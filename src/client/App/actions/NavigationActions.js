import {NavigationConstants} from "../Constants/NavigationConstants";

function onClickRegisterNavBar() {
    return {
        type: NavigationConstants.ON_CLICK_REGISTER_NAV_BAR
    }
}

function onClickLoginNavBar() {
    return {
        type: NavigationConstants.ON_CLICK_HOME_NAV_BAR
    }
}

function onClickMenuButton() {
    return {
        type: NavigationConstants.ON_CLICK_MENU_BUTTON
    }
}

function onCloseMenuClick() {
    return {
        type: NavigationConstants.ON_CLOSE_MENU
    }
}

function onChangeRoute(newPath) {
    return {
        type: NavigationConstants.ON_CHANGE_ROUTING,
        payload: {
            newPath: newPath
        }
    }
}

function onRegistrationSuccessChange(success) {
    return {
        type: NavigationConstants.CHANGE_REGISTRATION_SUCCESS,
        payload: {
            success: success
        }
    }
}

let NavigationActions  = {
    onClickRegisterNavBar,
    onClickLoginNavBar,
    onClickMenuButton,
    onCloseMenuClick,
    onChangeRoute,
    onRegistrationSuccessChange,
};

export default NavigationActions