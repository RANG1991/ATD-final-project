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

function onClickMyProfileButton() {
    return {
        type: NavigationConstants.ON_CLICK_MY_PROFILE
    }
}

function onClickOtherProfilesButton() {
    return {
        type: NavigationConstants.ON_CLICK_OTHER_PROFILES
    }
}

function onClickReviewsButton() {
    return {
        type: NavigationConstants.ON_CLICK_REVIEWS
    }
}

function onClickNewReviewButton() {
    return {
        type: NavigationConstants.ON_CLICK_NEW_REVIEW
    }
}

function onClickSearchButton() {
    return {
        type: NavigationConstants.ON_CLICK_SEARCH
    }
}

function onClickLogoutButton() {
    return {
        type: NavigationConstants.ON_CLICK_LOGOUT
    }
}

let NavigationActions  = {
    onClickRegisterNavBar,
    onClickLoginNavBar,
    onClickMenuButton,
    onCloseMenuClick,
    onClickMyProfileButton,
    onClickOtherProfilesButton,
    onClickNewReviewButton,
    onClickReviewsButton,
    onClickSearchButton,
    onClickLogoutButton,
};

export default NavigationActions