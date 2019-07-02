import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppActions from "./App/actions";
import {connect} from "react-redux";
import {withRouter} from "react-router";

class ButtonAppBar extends React.Component {

    render() {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={{flex: 1, flexGrow: 1}}>
                            {this.props.message}
                        </Typography>
                        <Button href="/login" color="inherit" onClick={this.props.onClickLogin}>Login</Button>
                        <Button href="/" color="inherit" onClick={this.props.onClickHome}>HomePage</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onClickLogin: (e) => {
            e.preventDefault();
            dispatch(AppActions.onClickLoginNavBar());
        },
        onClickHome: (e) => {
            e.preventDefault();
            dispatch(AppActions.onClickHomeNavBar())
        }
    }
};

export default connect(null,mapDispatchToProps)(withRouter(ButtonAppBar));