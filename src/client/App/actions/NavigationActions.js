import {NavigationConstants} from "../Constants/NavigationConstants";

function onClickRegisterNavBar() {
    return {
        type: NavigationConstants.ON_CLICK_REGISTER_NAV_BAR
    }
}

function onClickLoginNavBar() {
    return {
        type: NavigationConstants.ON_CLICK_LOGIN_NAV_BAR
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

function showSortMenu(show) {
    return {
        type: NavigationConstants.SHOW_SORT_MENU,
        payload : {
            show
        }
    }
}

function onOpenSortMenu(open) {
    return {
        type: NavigationConstants.OPEN_SORT_MENU,
        payload : {
            open
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
    onOpenSortMenu,
    showSortMenu,
};

export default NavigationActions