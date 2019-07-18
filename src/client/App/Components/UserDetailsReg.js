import React from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import CurrentUserActions from "../actions/CurrentUserActions";
import { withRouter } from 'react-router-dom';
import AppActions from "../actions/AppActions";
import NavigationActions from "../actions/NavigationActions";

const checkIfUserNameExists = (username, users) => {
   return users !== undefined && users.map(x => x.username).contains(username);
};

class UserDetailsReg extends React.Component
{
    render() {
        return (
            <form autoComplete="on">
                <TextField id="outlined-name"
                           error={this.props.errorUsername !== ''}
                           helperText={this.props.errorUsername}
                           label="User Name"
                           onChange={(e) => this.props.onChangeUsername(e.target.value, this.props.users)}
                           margin="normal"
                           variant="outlined"/>
                <TextField id="outlined-name"
                           label="Location"
                           onChange={(e) => this.props.onChangeLocation(e.target.value)}
                           margin="normal"
                           variant="outlined"/>
                <Button variant="contained" style={style}
                        onClick={(e) => this.props.onSubmit(e, this.props.currentUsername, this.props.currentLocation,
                            this.props.currentImagePath, this.props.users)}
                        href={"/welcome_" + this.props.currentUsername}>
                    Submit
                </Button>
            </form>
        );
    }

}
const style = {
    margin: 15,
};

const mapStateToProps = (state) => {
    return {
        errorUsername: state['currentUser'].get("errorUsername"),
        currentUsername: state['currentUser'].get('currentUsername'),
        users: state['app'].get("users"),
        currentImagePath: state['currentUser'].get('currentImagePath'),
        errorImage: state['currentUser'].get('errorImage'),
        currentLocation: state['currentUser'].get("currentLocation"),
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
        onSubmit: (e, currentUsername, currentLocation, currentImagePath, users) => {
            e.preventDefault();
            if (checkIfUserNameExists(currentUsername, users)) {
                dispatch(CurrentUserActions.usernameError());
            }
            else if (currentImagePath !== "" && currentLocation !== "" && currentUsername !== "") {
                dispatch(AppActions.addUser(currentUsername, currentLocation, currentImagePath));
                dispatch(NavigationActions.onRegistrationSuccessChange(true));
                dispatch(NavigationActions.onChangeRoute("/welcome_" + currentUsername));
                dispatch(CurrentUserActions.resetCurrentState());
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDetailsReg));