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

function onClickSearch(name, location ,allReviews) {
    return {
        type: AdvancedSearchConstants.ON_CLICK_SEARCH,
        payload: {
            name, location, allReviews,
        }
    }
}

function changeRadioButton(value) {
    return {
        type: AdvancedSearchConstants.ON_CHANGE_RADIO_BUTTON,
        payload: {
            value
        }
    }
}

function changeRadioButtonSearchBy(value) {
    return {
        type: AdvancedSearchConstants.ON_CHANGE_RADIO_BUTTON_SEARCH_BY,
        payload: {
            value
        }
    }
}

let AdvancedSearchActions = {
    changeNameSearch,
    changeLocationSearch,
    onClickSearch,
    changeRadioButton,
    changeRadioButtonSearchBy,
};

export default AdvancedSearchActions;