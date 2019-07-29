import initialState from "../initialState";
import AppConstants from "../Constants/AppConstants";
const {fromJS} = require('immutable');

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case AppConstants.ADD_USER:
            state = state.setIn(['users', action.payload.username],
                fromJS({location: action.payload.location,
                imagePath: action.payload.imagePath, id: state.get('usersId'), reviews: []}));
            state = state.set('usersId', state.get('usersId') + 1);
            return state;
        case AppConstants.ADD_RESTAURANT:
            let review = {name: action.payload.name, location: action.payload.location, images: action.payload.images, bathroom: action.payload.bathroom,
                staff: action.payload.staff, cleanliness: action.payload.cleanliness,
                drive: action.payload.drive, delivery: action.payload.delivery, food: action.payload.food,
                currentUser: action.payload.currentUser, id: state.get('reviewsId'), date: String(new Date().getDate())};
            state = state.set('reviewsId', state.get('reviewsId') + 1);
            state = state.updateIn(['users', action.payload.currentUser, 'reviews'], e => e.push(fromJS(review)));
            return state;
        case AppConstants.CHANGE_USERNAME_APP:
                state = state.update('users', e => e.mapKeys(k => {
                    if (k === action.payload.oldName) {
                        return action.payload.newName;
                    } else {
                        return k;
                    }
                }));
            return state;
        case AppConstants.CHANGE_LOCATION_APP:
            state = state.setIn(['users', action.payload.username, 'location'],  action.payload.newLocation);
            return state;
        case AppConstants.DELETE_REVIEW:
            state = state.updateIn(['users', action.payload.username, 'reviews'],
                function(reviews) {
                    return reviews.filter(function(reviewToDelete) {
                        return reviewToDelete.get("id") !== action.payload.id;
                    });
                });
            return state;
        case AppConstants.EDIT_REVIEW:
            let allReviews = state.getIn(['users', action.payload.currentUser, 'reviews']);
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
            state = state.setIn(['users', action.payload.currentUser, 'reviews'], allReviews);
            return state;
        default:
            return state;
    }
};

export default AppReducer;