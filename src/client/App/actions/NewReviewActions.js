import newReviewConstants from '../Constants/NewReviewConstants'

function changeParamValue(param, value) {
    return {
        type: newReviewConstants.CHANGE_PARAM_VALUE,
        payload: {param_name: param, param_value: value}
    }
}

function changeName(name) {
    return {
        type: newReviewConstants.CHANGE_NAME,
        payload: {name: name}
    }
}

function changeLocation(location) {
    return {
        type: newReviewConstants.CHANGE_LOCATION,
        payload: {location: location}
    }
}

function addImages(acceptedFiles) {
    return {
        type: newReviewConstants.ADD_IMAGES,
        payload: {files: acceptedFiles}
    }
}

function resetForm() {
    return {
        type: newReviewConstants.RESET_FORM
    }
}

function nameError() {
    return {
        type: newReviewConstants.NAME_ERROR
    }
}

function changeSelectedRestaurant(name, location) {
    return {
        type: newReviewConstants.CHANGE_SELECTED_RESTAURANT,
        payload: {name, location}
    }
}

let NewReviewActions  = {
    changeParamValue,
    changeName,
    addImages,
    resetForm,
    changeLocation,
    nameError,
    changeSelectedRestaurant,
};

export default NewReviewActions