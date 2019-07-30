import React from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import CurrentUserActions from "../actions/CurrentUserActions";
import { withRouter } from 'react-router-dom';
import AppActions from "../actions/AppActions";
import NavigationActions from "../actions/NavigationActions";
import PlacesAutocomplete from 'react-places-autocomplete';

export const checkIfUserNameExists = (username, users) => {
   return users.findIndex(i => i.get('username') === username) !== -1;
};

class UserDetailsReg extends React.Component
{
        renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
        <div className="autocomplete-root">
            <TextField id="outlined-name" {...getInputProps()}
                       label="Location"
                       margin="normal"
                       variant="outlined"
                />
            <div className="autocomplete-dropdown-container">
                {suggestions.map(suggestion => (
                    <div {...getSuggestionItemProps(suggestion)}>
                        <span>{suggestion.description}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    render() {
        return (
            <form autoComplete="on">
                <TextField
                           id="outlined-name"
                           error={this.props.errorUsername !== ''}
                           helperText={this.props.errorUsername}
                           label="User Name"
                           onChange={(e) => this.props.onChangeUsername(e.target.value, this.props.users)}
                           margin="normal"
                           variant="outlined"/>
                <PlacesAutocomplete
                    value={this.props.currentLocation}
                    onChange={this.props.onChangeLocation}
                    onSelect={this.props.handleSelectAddress}
                >
                    {this.renderFunc}
                </PlacesAutocomplete>
                <Button variant="contained" style={{margin: 15}}
                        onClick={(e) => this.props.onSubmit(e, this.props.currentUsername, this.props.currentLocation,
                            this.props.currentImagePath,this.props.relativeImagePath, this.props.users)}
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
        onSubmit: (e, currentUsername, currentLocation, currentImagePath,relativeImagePath, users) => {
            e.preventDefault();
            if (checkIfUserNameExists(currentUsername, users)) {
                dispatch(CurrentUserActions.usernameError());
            }
            else if (currentImagePath !== "" && currentLocation !== "" && currentUsername !== "") {
                dispatch(AppActions.addUserSaga(currentUsername, currentLocation, currentImagePath,relativeImagePath));
                dispatch(NavigationActions.onRegistrationSuccessChange(true));
                dispatch(NavigationActions.onChangeRoute("/welcome_" + currentUsername));
            }
        },
        handleSelectAddress: (address) => {
            dispatch(CurrentUserActions.changeLocation(address));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDetailsReg));