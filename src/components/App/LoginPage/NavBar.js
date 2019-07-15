import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppActions from "./actions";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import HomeActions from '../ReviewPage/actions'

class ButtonAppBar extends React.Component {

    render() {
        let menuButton = null;
        if (this.props.successfullyLogin)
        {
            menuButton = <div>
                <Button onClick={this.props.onClickMenu} aria-haspopup="true" color="inherit">
                    My Account
                </Button>
                <Menu id="fade-menu" open={this.props.displayMenu} onClose={this.props.onCloseMenu}>
                    <MenuItem >My Profile</MenuItem>
                    <MenuItem >Logout</MenuItem>
                </Menu>
            </div>
        }
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        {menuButton}
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


const mapStateToProps = (state) => {
    return {
        successfullyLogin : state['app'].get("successfullyLogin"),
        displayMenu : state['home'].get("displayMenu"),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickLogin: (e) => {
            e.preventDefault();
            dispatch(AppActions.onClickLoginNavBar());
        },
        onClickHome: (e) => {
            e.preventDefault();
            dispatch(AppActions.onClickHomeNavBar())
        },
        onClickMenu: () => {
            dispatch(HomeActions.onClickMenuButton())
        },
        onCloseMenu: () => {
            dispatch(HomeActions.onCloseMenuClick())
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ButtonAppBar));