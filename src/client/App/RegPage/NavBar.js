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
import HomeActions from '../UserEntrencePage/actions'
import {Home} from "@material-ui/icons";

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
                    <MenuItem onClick={this.props.onClickMyProfile}>My Profile</MenuItem>
                    <MenuItem onClick={this.props.onClickOtherProfiles}>Other Profiles</MenuItem>
                    <MenuItem onClick={this.props.onClickReviews}>Reviews</MenuItem>
                    <MenuItem onClick={this.props.onClickNewReview}>Write New Review</MenuItem>
                    <MenuItem onClick={this.props.onClickSearch}>Search</MenuItem>
                    <MenuItem onClick={this.props.onClickLogout}>Logout</MenuItem>
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
        successfullyReg : state['app'].get("successfullyReg"),
        displayMenu : state['home'].get("displayMenu"),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClickReg: (e) => {
            e.preventDefault();
            dispatch(AppActions.onClickRegisterNavBar());
        },
        onClickLogin: (e) => {
            e.preventDefault();
            dispatch(AppActions.onClickLoginNavBar())
        },
        onClickMenu: () => {
            dispatch(HomeActions.onClickMenuButton())
        },
        onCloseMenu: () => {
            dispatch(HomeActions.onCloseMenuClick())
        },
        onClickMyProfile: () => {
            dispatch(HomeActions.onClickMyProfileButton())
        },
        onClickOtherProfiles: () => {
            dispatch(HomeActions.onClickOtherProfilesButton())
        },
        onClickReviews: () => {
            dispatch(HomeActions.onClickReviewsButton())
        },
        onClickNewReview: () => {
            dispatch(HomeActions.onClickNewReviewButton())
        },
        onClickSearch: () => {
            dispatch(HomeActions.onClickSearchButton())
        },
        onClickLogout: () => {
            dispatch(HomeActions.onClickLogoutButton())
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ButtonAppBar));