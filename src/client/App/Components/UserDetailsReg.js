import React from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import AppActions from "../actions/CurrentUserActions";
import { withRouter } from 'react-router-dom';

class UserDetailsReg extends React.Component
{
    render() {
        return (
            <form autoComplete="on">
                <TextField id="outlined-name"
                           error={this.props.errorUsername !== ''}
                           helperText={this.props.errorUsername}
                           label="User Name"
                           onChange={(e) => this.props.onChangeUsername(e, this.props.users)}
                           margin="normal"
                           variant="outlined"/>
                <TextField id="outlined-name"
                           label="Location"
                           onChange={this.props.onChangeLocation}
                           margin="normal"
                           variant="outlined"/>
                <Button variant="contained" style={style} onClick={() => this.props.handleSubmit(this.props.users)} href={"/welcome/" + this.props.currentUsername}>
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
        users: state['currentUser'].get("users"),
        successfullyReg: state['currentUser'].get("successfullyReg")
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeLocation: (e) => {
            dispatch(AppActions.changeLocation(e.target.value));
        },
        onChangeUsername:  (e, users) => {
            dispatch(AppActions.changeUserName(e.target.value, users))
        },
        handleSubmit: (e, users) => {
            e.preventDefault();
            dispatch(AppActions.handleSubmitRegister(users))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDetailsReg));