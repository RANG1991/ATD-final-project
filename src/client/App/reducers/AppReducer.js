import initialState from "../initialState";
import AppConstants from "../Constants/AppConstants";
const {fromJS} = require('immutable');


const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    let allReviews = null;
    let idxToUpdate = null;
    switch (action.type) {
        case AppConstants.GET_ALL_USERS:
            let allUsers = action.payload.map(x => ({username: x.name, imagePath: x.profilePhoto.data, location: x.location,
                                                    reviews: x.reviews, id: x._id, viewProfileInSearch: false}));
            state = state.set('users', fromJS(allUsers));
            return state;
        case AppConstants.ADD_USER:
            state = state.update('users', e => e.push(fromJS(
                {username: action.payload.username, imagePath: action.payload.imagePath,
                    location: action.payload.location,
                reviews: [], id: state.get('usersId'), viewProfileInSearch: false})));
            state = state.set('usersId', state.get('usersId') + 1);
            console.log(state);
            return state;
        case AppConstants.ADD_RESTAURANT:
            let review = {name: action.payload.name, location: action.payload.location, images: action.payload.images, bathroom: action.payload.bathroom,
                staff: action.payload.staff, cleanliness: action.payload.cleanliness,
                drive: action.payload.drive, delivery: action.payload.delivery, food: action.payload.food,
                currentUser: action.payload.currentUser, id: state.get('reviewsId'), date: String(new Date().getDate()),
                openDeleteReview: false, openEditReview: false};
            state = state.set('reviewsId', state.get('reviewsId') + 1);
             idxToUpdate = state.get('users').findIndex(i => i.get('username') === action.payload.currentUser);
            state = state.updateIn(['users',idxToUpdate,'reviews'], e => e.push(fromJS(review)));
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
        default:
            return state;
    }
};

export default AppReducer;