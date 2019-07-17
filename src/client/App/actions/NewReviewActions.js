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

function addImages(acceptedFiles) {
    return {
        type: newReviewConstants.ADD_IMAGES,
        payload: {files: acceptedFiles}
    }
}

let NewReviewActions  = {
    changeParamValue,
    changeName,
    addImages,
};

export default NewReviewActions