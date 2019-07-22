import React from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import CurrentUserActions from "../actions/CurrentUserActions";
import { withRouter } from 'react-router-dom';
import NavigationActions from "../actions/NavigationActions";
import Grid from "@material-ui/core/Grid";

export const checkIfUserNameExists = (username, users) => {
    return users.get(username) !== undefined;
};

class LoginForm extends React.Component
{
    render() {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
            <form autoComplete="on">
                <TextField id="outlined-name"
                           label="User Name"
                           onChange={(e) => this.props.onChangeUsernameLogin(e.target.value)}
                           margin="normal"
                           variant="outlined"/>
                <Button variant="contained" style={{margin: 15}}
                        onClick={(e) => this.props.onSubmitLogin(e, this.props.usernameLogin, this.props.users)}>
                    Login
                </Button>
            </form>
            </Grid>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        users: state['app'].get("users"),
        usernameLogin: state['currentUser'].get('usernameLogin'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeUsernameLogin:  (username) => {
            dispatch(CurrentUserActions.changeUsernameLogin(username));
        },
        onSubmitLogin: (e, usernameLogin,users) => {
            e.preventDefault();
            if (checkIfUserNameExists(usernameLogin, users)) {
                dispatch(CurrentUserActions.changeUserName(usernameLogin));
                dispatch(CurrentUserActions.changeLocation(users.get(usernameLogin).get('location')));
                dispatch(CurrentUserActions.changeImage(users.get(usernameLogin).get('imagePath')));
                dispatch(NavigationActions.onChangeRoute("/welcome_" + usernameLogin));
                dispatch(NavigationActions.onRegistrationSuccessChange(true));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginForm));