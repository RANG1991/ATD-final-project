import React from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {connect} from "react-redux";
import AppActions from "./actions";
import { withRouter } from 'react-router-dom';

class LoginUser extends React.Component
{
    render() {
        return (
            <form autoComplete="on">
                <TextField id="outlined-name"
                           error={this.props.errorUsername !== ''}
                           helperText={this.props.errorUsername}
                           label="User Name"
                           onChange={this.props.onChangeUsername}
                           margin="normal"
                           variant="outlined"/>
                <TextField id="outlined-name"
                           label="Location"
                           onChange={this.props.onChangeLocation}
                           margin="normal"
                           variant="outlined"/>
                <Button variant="contained" style={style} onClick={this.props.handleSubmit} href={"/welcome/" + this.props.currentUsername}>
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
        errorUsername: state['app'].get("errorUsername"),
        currentUsername: state['app'].get('currentUsername')
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeLocation: (e) => {
            dispatch(AppActions.changeLocation(e.target.value));
        },
        onChangeUsername:  (e) => {
            dispatch(AppActions.changeUserName(e.target.value))
        },
        handleSubmit: (e) => {
            e.preventDefault();
            dispatch(AppActions.handleSubmitLogin())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginUser));