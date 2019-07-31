import AppConstants from "../Constants/AppConstants"

function addUserSaga(username, location, imagePath,relativeImagePath) {
    return {
        type: AppConstants.ADD_USER_SAGA,
        payload: {username: username, imagePath: imagePath,relativeImagePath:relativeImagePath, location: location}
    }
}

function addRestaurantSaga(name, location, images, bathroom, staff, cleanliness, drive, delivery, food, currentUser) {
    return {
        type: AppConstants.ADD_RESTAURANT_SAGA,
        payload: {name: name, location: location, images: images, bathroom: bathroom,
            staff: staff, cleanliness: cleanliness,
            drive: drive, delivery: delivery, food: food, currentUser: currentUser}
    }
}

function changeUsernameAppSaga(oldName, newName) {
    return {
        type: AppConstants.CHANGE_USERNAME_APP_SAGA,
        payload: {
            oldName, newName
        }
    }
}

function changeLocationAppSaga(username, newLocation) {
    return {
        type: AppConstants.CHANGE_LOCATION_APP_SAGA,
        payload: {
            username, newLocation
        }
    }
}

function deleteReviewSaga(username, id) {
    return {
        type: AppConstants.DELETE_REVIEW_SAGA,
        payload: {
            username, id
        }
    }
}

function editRestaurantSaga(id, bathroom, staff, cleanliness, drive, delivery, food, currentUser) {
   return {
       type: AppConstants.EDIT_REVIEW_SAGA,
       payload: {
           id, bathroom, staff, cleanliness, drive, delivery, food, currentUser
       }
   }
}

function openDialogEditReview(id, currentUser, open) {
    return {
        type: AppConstants.OPEN_DIALOG_EDIT_REVIEW,
        payload: {id, currentUser, open}
    }
}

function openDeleteReview(id, currentUser, open) {
    return {
        type: AppConstants.OPEN_DIALOG_DELETE_REVIEW,
        payload: {id, currentUser, open}
    }
}

function getAllUsersSaga() {
    return {
        type: AppConstants.GET_ALL_USERS_SAGA,
    }
}

function handleExpandClick(key) {
    return {
        type: AppConstants.OPEN_EXPAND_REVIEW,
        payload : {
            key,
        }
    }
}

let AppActions  = {
    addUserSaga,
    addRestaurantSaga,
    changeUsernameAppSaga,
    changeLocationAppSaga,
    deleteReviewSaga,
    editRestaurantSaga,
    getAllUsersSaga,
    openDialogEditReview,
    openDeleteReview,
    handleExpandClick,
};

export default AppActions