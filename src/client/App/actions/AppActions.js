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

function changeUsernameApp(oldName, newName) {
    return {
        type: AppConstants.CHANGE_USERNAME_APP,
        payload: {
            oldName, newName
        }
    }
}

function changeLocationApp(username, newLocation) {
    return {
        type: AppConstants.CHANGE_LOCATION_APP,
        payload: {
            username, newLocation
        }
    }
}

function deleteReview(username, id) {
    return {
        type: AppConstants.DELETE_REVIEW,
        payload: {
            username, id
        }
    }
}

function editRestaurant(id, bathroom, staff, cleanliness, drive, delivery, food, currentUser) {
   return {
       type: AppConstants.EDIT_REVIEW,
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

let AppActions  = {
    addUserSaga,
    addRestaurantSaga,
    changeUsernameApp,
    changeLocationApp,
    deleteReview,
    editRestaurant,
    getAllUsersSaga,
    openDialogEditReview,
    openDeleteReview,
};

export default AppActions