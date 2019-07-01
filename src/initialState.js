const {List, Map} = require('immutable');

export default {
    app: Map({
        users: List(),
        restaurants: List(),
        successfullyLogin: false,
        currentUsername: "",
        currentLocation: "",
        currentImagePath: "",
        errorUsername : "",
        errorImage: "please pick an image!",
    })
};