const {List, Map} = require('immutable');

export default {
    app:
        Map({
        usersId: 1,
        reviewsId: 1,
        users: Map({}),
        }),
    navigation:
        Map({
        displayMenu: false,
        successfullyReg: false,
        displaySortMenu: false,
        openSortMenu: false,
        }),
    currentUser:
        Map({
        currentUsername: "",
        currentLocation: "",
        errorUsername : "",
        currentImagePath: "",
        errorImage: "please pick an image!",
        openEditName: false,
        openEditLocation: false,
        openDeleteReview: false,
        editedName: "",
        editedLocation: "",
    }),
    newReview:
    Map ({
        name: "",
        location: "",
        bathroom: 0,
        staff: 0,
        cleanliness: 0,
        drive: 0,
        delivery: 0,
        food: 0,
        imgs: List(),
        imagesMessage: "please drop here your images!"
    }),
    allReviews:
        Map({
            sortBy: ''
        }),
    advancedSearch:
    Map({
        location: "",
        name: "",
        reviews: List(),
        valueRadioButton: 0,
    })
};