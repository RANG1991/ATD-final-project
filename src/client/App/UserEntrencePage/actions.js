import {HomeActionsConstants} from './Constants'

function onClickMenuButton() {
    return {
        type: HomeActionsConstants.ON_CLICK_MENU_BUTTON
    }
}

function onCloseMenuClick() {
    return {
        type: HomeActionsConstants.ON_CLOSE_MENU
    }
}

function onClickMyProfileButton() {
    return {
        type: HomeActionsConstants.ON_CLICK_MY_PROFILE
    }
}

function onClickOtherProfilesButton() {
    return {
        type: HomeActionsConstants.ON_CLICK_OTHER_PROFILES
    }
}

function onClickReviewsButton() {
    return {
        type: HomeActionsConstants.ON_CLICK_REVIEWS
    }
}

function onClickNewReviewButton() {
    return {
        type: HomeActionsConstants.ON_CLICK_NEW_REVIEW
    }
}

function onClickSearchButton() {
    return {
        type: HomeActionsConstants.ON_CLICK_SEARCH
    }
}

function onClickLogoutButton() {
    return {
        type: HomeActionsConstants.ON_CLICK_LOGOUT
    }
}

let HomeActions  = {
    onClickMenuButton,
    onCloseMenuClick,
    onClickMyProfileButton,
    onClickOtherProfilesButton,
    onClickNewReviewButton,
    onClickReviewsButton,
    onClickSearchButton,
    onClickLogoutButton,
};

export default HomeActions