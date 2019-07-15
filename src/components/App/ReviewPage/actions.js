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

let HomeActions  = {
    onClickMenuButton,
    onCloseMenuClick,
};

export default HomeActions