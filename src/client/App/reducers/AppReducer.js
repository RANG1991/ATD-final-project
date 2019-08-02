import initialState from "../initialState";
import AppConstants from "../Constants/AppConstants";
const {fromJS} = require('immutable');

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    let idxToUpdate = null;
    let allReviews = null;
    let locationAndName = null;
    let coor = null;
    switch (action.type) {
        case AppConstants.GET_ALL_USERS:
            let allUsers = action.payload.map(x => {
                return ({username: x.name, imagePath: x.profilePhoto.data, location: x.location,
                                                    reviews: x.reviews, id: x.id, viewProfileInSearch: false, coor: x.coor})
            });
            state = state.set('users', fromJS(allUsers));
            let allReviewsForNameLocation = [];
            allUsers.forEach((userEntry) => {
                allReviewsForNameLocation = allReviewsForNameLocation.concat(userEntry['reviews'])
            });
            let allReviewsByLocationName = {};
            for (let i = 0; i < allReviewsForNameLocation.length; i++) {
                let locationAndName = allReviewsForNameLocation[i].name + "_" + allReviewsForNameLocation[i].location;
                allReviewsByLocationName[locationAndName] = {};
                if (!(locationAndName in allReviewsByLocationName)) {
                    allReviewsByLocationName[locationAndName]['num'] = 1;
                    allReviewsByLocationName[locationAndName]['expand'] = false;
                }
                else {
                    allReviewsByLocationName[locationAndName]['num'] += 1;
                }
            }
            state = state.set('mapNameLocationReviews', fromJS(allReviewsByLocationName));
            return state;
        case AppConstants.ADD_USER:
            state = state.update('users', e => e.push(fromJS(
                {username: action.payload.username, imagePath: action.payload.imagePath,
                    location: action.payload.location,
                    reviews: [], id: action.payload.id, viewProfileInSearch: false, coor: action.payload.coor})));
            return state;
        case AppConstants.ADD_RESTAURANT:
            let idxToGet = state.get('restaurantsListToView').findIndex(i =>
                i.get('name') === action.payload.name && i.get('location') === action.payload.location);
            coor = state.getIn(['restaurantsListToView', idxToGet ,'coor']);
            let review = {name: action.payload.name, location: action.payload.location, images: action.payload.images, bathroom: action.payload.bathroom,
                staff: action.payload.staff, cleanliness: action.payload.cleanliness,
                drive: action.payload.drive, delivery: action.payload.delivery, food: action.payload.food,
                currentUser: action.payload.currentUser, id: action.payload.id, date: String(new Date().getDate()),
                openDeleteReview: false, openEditReview: false, coor: action.payload.coor};
            console.log(review);
            idxToUpdate = state.get('users').findIndex(i => i.get('username') === action.payload.currentUser);
            state = state.updateIn(['users',idxToUpdate,'reviews'], e => e.push(fromJS(review)));
            locationAndName = action.payload.name + "_" + action.payload.location;
            if (!state.hasIn(['mapNameLocationReviews', locationAndName])) {
                state = state.setIn(['mapNameLocationReviews', locationAndName], {num: 1, expand: false});
            }
            else {
                state = state.updateIn(['mapNameLocationReviews', locationAndName, 'num'], e => e + 1);
            }
            return state;
        case AppConstants.CHANGE_USERNAME_APP:
            idxToUpdate = state.get('users').findIndex(i => i.get('username') === action.payload.oldName);
            state = state.setIn(['users', idxToUpdate ,'username'],action.payload.newName);
            return state;
        case AppConstants.CHANGE_LOCATION_APP:
            idxToUpdate = state.get('users').findIndex(i => i.get('username') === action.payload.username);
            state = state.setIn(['users', idxToUpdate, 'location'],  action.payload.newLocation);
            return state;
        case AppConstants.DELETE_REVIEW:
            idxToUpdate = state.get('users').findIndex(i => i.get('username') === action.payload.username);
            let reviewToGet = state.getIn(['users', idxToUpdate, 'reviews']);
            locationAndName = reviewToGet.name + "_" + reviewToGet.location;
            state = state.updateIn(['mapNameLocationReviews', locationAndName, 'num'], e => e - 1);
            if (state.getIn(['mapNameLocationReviews', locationAndName, 'num']) === 0) {
                state = state.deleteIn(['mapNameLocationReviews', locationAndName]);
            }
            state = state.updateIn(['users', idxToUpdate, 'reviews'],
                function(reviews) {
                    return reviews.filter(function(reviewToDelete) {
                        return reviewToDelete.get("id") !== action.payload.id;
                    });
                });
            return state;
        case AppConstants.EDIT_REVIEW:
            idxToUpdate = state.get('users').findIndex(i => i.get('username') === action.payload.currentUser);
            allReviews = state.getIn(['users', idxToUpdate, 'reviews']);
            allReviews = allReviews.map(function(reviewToUpdate) {
                        if (reviewToUpdate.get('id') === action.payload.id)
                        {
                            reviewToUpdate = reviewToUpdate.set('bathroom', action.payload.bathroom);
                            reviewToUpdate = reviewToUpdate.set('staff', action.payload.staff);
                            reviewToUpdate = reviewToUpdate.set('cleanliness', action.payload.cleanliness);
                            reviewToUpdate = reviewToUpdate.set('drive', action.payload.drive);
                            reviewToUpdate = reviewToUpdate.set('delivery', action.payload.delivery);
                            reviewToUpdate = reviewToUpdate.set('food', action.payload.food);
                            return reviewToUpdate;
                        }
                        else {
                            return reviewToUpdate;
                        }
                    });

            state = state.setIn(['users', idxToUpdate, 'reviews'], allReviews);
            return state;
        case AppConstants.OPEN_DIALOG_EDIT_REVIEW:
            idxToUpdate = state.get('users').findIndex(i => i.get('username') === action.payload.currentUser);
            allReviews = state.getIn(['users', idxToUpdate, 'reviews']);
            allReviews = allReviews.map(function(reviewToUpdate) {
                if (reviewToUpdate.get('id') === action.payload.id) {
                    reviewToUpdate = reviewToUpdate.set('openEditReview', action.payload.open);
                }
                return reviewToUpdate;
            });
            state = state.setIn(['users', idxToUpdate, 'reviews'], allReviews);
            return state;
        case AppConstants.OPEN_DIALOG_DELETE_REVIEW:
            idxToUpdate = state.get('users').findIndex(i => i.get('username') === action.payload.currentUser);
            allReviews = state.getIn(['users', idxToUpdate, 'reviews']);
            allReviews = allReviews.map(function(reviewToUpdate) {
                if (reviewToUpdate.get('id') === action.payload.id) {
                    reviewToUpdate = reviewToUpdate.set('openDeleteReview', action.payload.open);
                }
                return reviewToUpdate;
            });
            state = state.setIn(['users', idxToUpdate, 'reviews'], allReviews);
            return state;
        case AppConstants.OPEN_EXPAND_REVIEW:
            state = state.updateIn(['mapNameLocationReviews', action.payload.key, 'expand'], e => !e);
            return state;
        default:
            return state;
    }
};

export default AppReducer;