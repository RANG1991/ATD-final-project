import AppConstants from "../Constants/AppConstants"

function addUser(username, imagePath, location) {
    return {
        type: AppConstants.ADD_USER,
        payload: {username: username, imagePath: imagePath, location: location}
    }
}

let AppActions  = {
    addUser
};

export default AppActions