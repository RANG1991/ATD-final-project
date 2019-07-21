import AdvancedSearchConstants from '../Constants/AdvancedSearchConstants'

function changeLocationSearch(location) {
    return {
        type: AdvancedSearchConstants.CHANGE_LOCATION_SEARCH,
        payload: {
            location
        }
    }
}

function changeNameSearch(name) {
    return {
        type: AdvancedSearchConstants.CHANGE_NAME_SEARCH,
        payload: {
            name
        }
    }
}

function onClickSearch(allReviews) {
    return {
        type: AdvancedSearchConstants.ON_CLICK_SEARCH,
        payload: {
            allReviews,
        }
    }
}

function onChangeRadioButtonName(value) {
    return {
        type: AdvancedSearchConstants.ON_CHANGE_RADIO_BUTTON_NAME,
        payload: {
            value
        }
    }
}

function onChangeRadioButtonLocation(value) {
    return {
        type: AdvancedSearchConstants.ON_CHANGE_RADIO_BUTTON_LOCATION,
        payload: {
            value
        }
    }
}

let AdvancedSearchActions = {
    changeNameSearch,
    changeLocationSearch,
    onClickSearch,
    onChangeRadioButtonName,
    onChangeRadioButtonLocation,
};

export default AdvancedSearchActions;