import newReviewConstants from '../Constants/NewReviewConstants'

function changeParamValue(param, value) {
    return {
        type: newReviewConstants.CHANGE_PARAM_VALUE,
        payload: {param_name: param, param_value: value}
    }
}

let NewReviewActions  = {
    changeParamValue
};

export default NewReviewActions