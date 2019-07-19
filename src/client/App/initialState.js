const {List, Map} = require('immutable');

export default {
    app:
        Map({
        users: Map({}),
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
    newReview:
    Map ({
        name: "",
        bathroom: 0,
        staff: 0,
        cleanliness: 0,
        drive: 0,
        delivery: 0,
        food: 0,
        imgs: List(),
        imagesMessage: "please drop here your images!",
    })
};