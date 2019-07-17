import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavigationActions from "../actions/NavigationActions";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CurrentUserActions from "../actions/CurrentUserActions";

class ButtonAppBar extends React.Component {

    render() {
        let menuButton = null;
        if (this.props.successfullyReg)
        {
            menuButton = <div>
                <Button onClick={this.props.onClickMenu} aria-haspopup="true" color="inherit">
                    Menu
                </Button>
                <Menu id="fade-menu" open={this.props.displayMenu} onClose={this.props.onCloseMenu}>
                    <MenuItem onClick={() => this.props.onClickMyProfile("/my_profile")}>My Profile</MenuItem>
                    <MenuItem onClick={() => this.props.onClickOtherProfiles("/other_profiles")}>Other Profiles</MenuItem>
                    <MenuItem onClick={() => this.props.onClickReviews("/all_reviews")}>Reviews</MenuItem>
                    <MenuItem onClick={() => this.props.onClickNewReview("/new_review")}>Write New Review</MenuItem>
                    <MenuItem onClick={() => this.props.onClickSearch("/search")}>Search</MenuItem>
                    <MenuItem onClick={() => this.props.onClickLogout("/logout")}>Logout</MenuItem>
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
                        <Button href="/register" color="inherit" onClick={this.props.onClickReg}>Register</Button>
                        <Button href="/login" color="inherit" onClick={this.props.onClickLogin}>login</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        successfullyReg : state['navigation'].get("successfullyReg"),
        displayMenu : state['navigation'].get("displayMenu"),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickReg: (e) => {
            e.preventDefault();
            dispatch(NavigationActions.onClickRegisterNavBar());
            dispatch(NavigationActions.onChangeRoute("/register"));
            dispatch(NavigationActions.onRegistrationSuccessChange(false));
            dispatch(CurrentUserActions.resetCurrentState());
        },
        onClickLogin: (e) => {
            e.preventDefault();
            dispatch(NavigationActions.onClickLoginNavBar())
        },
        onClickMenu: () => {
            dispatch(NavigationActions.onClickMenuButton())
        },
        onCloseMenu: () => {
            dispatch(NavigationActions.onCloseMenuClick())
        },
        onClickMyProfile: (newPath) => {
            dispatch(NavigationActions.onChangeRoute(newPath))
        },
        onClickOtherProfiles: (newPath) => {
            dispatch(NavigationActions.onChangeRoute(newPath))
        },
        onClickReviews: (newPath) => {
            dispatch(NavigationActions.onChangeRoute(newPath))
        },
        onClickNewReview: (newPath) => {
            dispatch(NavigationActions.onChangeRoute(newPath))
        },
        onClickSearch: (newPath) => {
            dispatch(NavigationActions.onChangeRoute(newPath))
        },
        onClickLogout: (newPath) => {
            dispatch(NavigationActions.onChangeRoute(newPath))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ButtonAppBar));