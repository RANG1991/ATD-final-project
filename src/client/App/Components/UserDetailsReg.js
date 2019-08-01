import React from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import CurrentUserActions from "../actions/CurrentUserActions";
import { withRouter } from 'react-router-dom';
import AppActions from "../actions/AppActions";
import NavigationActions from "../actions/NavigationActions";
import AutoComplete from 'material-ui/AutoComplete';

export const checkIfUserNameExists = (username, users) => {
   return users.findIndex(i => i.get('username') === username) !== -1;
};

class UserDetailsReg extends React.Component
{
    render() {
        let allPlaces = this.props.placesList.map( x => x.get('name')).toJS();
        return (
            <form autoComplete="on">
                <TextField
                           id="outlined-name"
                           error={this.props.errorUsername !== ''}
                           helperText={this.props.errorUsername}
                           label="User Name"
                           onChange={(e) => this.props.onChangeUsername(e.target.value, this.props.users)}
                           margin="normal"/>
                <AutoComplete
                    hintText="Location"
                    dataSource={allPlaces}
                    onUpdateInput={this.props.onChangeLocation}
                />
                <Button variant="contained" style={{margin: 15}}
                        onClick={(e) => this.props.onSubmit(e, this.props.currentUsername, this.props.currentLocation,
                            this.props.currentImagePath,this.props.relativeImagePath, this.props.users, this.props.placesList)}
                        href={"/welcome_" + this.props.currentUsername}>
                    Submit
                </Button>
            </form>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        errorUsername: state['currentUser'].get("errorUsername"),
        currentUsername: state['currentUser'].get('currentUsername'),
        users: state['app'].get("users"),
        currentImagePath: state['currentUser'].get('currentImagePath'),
        relativeImagePath: state['currentUser'].get('relativeImagePath'),
        errorImage: state['currentUser'].get('errorImage'),
        currentLocation: state['currentUser'].get("currentLocation"),
        placesList: state['currentUser'].get('placesList'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeLocation: (location) => {
            dispatch(CurrentUserActions.changeLocation(location));
        },
        onChangeUsername:  (username, users) => {
            dispatch(CurrentUserActions.changeUserName(username));
            if (checkIfUserNameExists(username, users)) {
                dispatch(CurrentUserActions.usernameError());
            }
        },
        onSubmit: (e, currentUsername, currentLocation, currentImagePath,relativeImagePath, users, placesList) => {
            e.preventDefault();
            if (checkIfUserNameExists(currentUsername, users)) {
                dispatch(CurrentUserActions.usernameError());
            }
            else if (currentImagePath !== "" && currentLocation !== "" && currentUsername !== "") {
                let coor = null;
                let place = placesList.find(i =>
                    i.get('name') === currentLocation);
                if (place !== undefined)
                {
                    coor = place.get('coor');
                }
                else {
                    coor = {lat: 0, lng: 0};
                }
                dispatch(AppActions.addUserSaga(currentUsername, currentLocation, currentImagePath,relativeImagePath, coor));
                dispatch(NavigationActions.onRegistrationSuccessChange(true));
                dispatch(NavigationActions.onChangeRoute("/welcome_" + currentUsername));
            }
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDetailsReg));