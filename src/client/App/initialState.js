const {List, Map, fromJS} = require('immutable');

const restaurantsList = [{name: 'McDonalds', location: 'Beer Sheva', coor: {lat: 31.247208, lng: 40.811947}},
    {name: 'McDonalds', location: 'Rehovot', coor: {lat: 31.247208, lng: 100.811947}},
    {name: 'McDonalds', location: 'Jerusalem', coor: {lat: 31.247208, lng: 1000.811947}}
];

const placesList = [{name: 'Jerusalem' , coor: {lat: 31.7784, lng: 35.2066}},
    {name: 'Beer Sheva' , coor: {lat: 31.25, lng: 34.83}},
    {name: 'Nazareth' , coor: {lat: 32.704, lng: 35.2955}},
    {name: 'Tel Aviv-Yafo' , coor: {lat: 32.08, lng: 34.77}},
    {name:  'Haifa'	, coor: {lat: 32.8204, lng: 34.98}},
    {name: 'Ramla' , coor: {lat: 31.9167, lng: 34.8667}}];

export default {
    app:
        Map({
        users: List(),
        mapNameLocationReviews: Map({}),
        restaurantsListToView: fromJS(restaurantsList),
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
        currentCoor: Map({lat: 0, lng: 0}),
        errorUsername : "",
        relativeImagePath:"",
        currentImagePath: "",
        errorImage: "please pick an image!",
        openEditName: false,
        openEditLocation: false,
        editedName: "",
        editedLocation: "",
        usernameLogin: "",
        placesList: fromJS(placesList),
    }),
    newReview:
    Map ({
        name: "",
        errorName: "",
        location: "",
        bathroom: 0,
        staff: 0,
        cleanliness: 0,
        drive: 0,
        delivery: 0,
        food: 0,
        imgs: List(),
        imagesMessage: "please drop here your images!",
        selectedRestaurantName: "",
        selectedRestaurantLocation: "",
    }),
    allReviews:
        Map({
            sortBy: '',
            name: "",
            location: "",
            bathroom: 0,
            staff: 0,
            cleanliness: 0,
            drive: 0,
            delivery: 0,
            food: 0,
        }),
    advancedSearch:
    Map({
        location: "",
        name: "",
        searchBy: "",
        enableName: true,
        enableLocation: true,
        enableButtons: true,
        savedReviews: List(),
        reviews: List(),
        valueRadioButton: 0,
    }),
    userSearch:
    Map({
        location: "",
        name: "",
        users: List(),
    }),
};