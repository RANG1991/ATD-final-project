const {List, Map} = require('immutable');

export default {
    app: Map({
        users: List(),
        restaurants: List(),
        successfullyReg: false,
        currentUsername: "",
        currentLocation: "",
        currentImagePath: "",
        errorUsername : "",
        errorImage: "please pick an image!",
        displayMenu: false,
    }),
};