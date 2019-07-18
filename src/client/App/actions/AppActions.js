import AppConstants from "../Constants/AppConstants"

function addUser(username, location, imagePath) {
    return {
        type: AppConstants.ADD_USER,
        payload: {username: username, imagePath: imagePath, location: location}
    }
}

function addRestaurant(name, images, bathroom, staff, cleanliness, drive, delivery) {
    return {
        type: AppConstants.ADD_RESTAURANT,
        payload: {name: name, images: images, bathroom: bathroom,
            staff: staff, cleanliness: cleanliness,
            drive: drive, delivery: delivery}
    }
}

let AppActions  = {
    addUser,
    addRestaurant
};

export default AppActions