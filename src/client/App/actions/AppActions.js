import AppConstants from "../Constants/AppConstants"

function addUser(username, location, imagePath) {
    return {
        type: AppConstants.ADD_USER,
        payload: {username: username, imagePath: imagePath, location: location}
    }
}

function addRestaurant(name, location, images, bathroom, staff, cleanliness, drive, delivery, food, currentUser) {
    return {
        type: AppConstants.ADD_RESTAURANT,
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

let AppActions  = {
    addUser,
    addRestaurant,
    changeUsernameApp,
    changeLocationApp,
    deleteReview,
};

export default AppActions