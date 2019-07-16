const {List, Map} = require('immutable');

export default {
    app:
        Map({
        users: List(),
        restaurants: List()
        }),
    navigation:
        Map({
        displayMenu: false,
        successfullyReg: false
        }),
    currentUser:
        Map({
        currentUsername: "",
        currentLocation: "",
        errorUsername : "",
        currentImagePath: "",
        errorImage: "please pick an image!",
    }),
};