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
import AllReviewsActions from "../actions/AllReviewsActions";

class ButtonAppBar extends React.Component {

    render() {
        let menuButton = null;
        let sortMenu = null;
        if (this.props.successfullyReg)
        {
            menuButton = <div>
                <Button onClick={this.props.onClickMenu} aria-haspopup="true" color="inherit">
                    Menu
                </Button>
                <Menu id="fade-menu" anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                      transformOrigin={{ vertical: "top", horizontal: "left" }}
                      open={this.props.displayMenu} onClose={this.props.onCloseMenu}>
                    <MenuItem onClick={() => this.props.onClickMyProfile("/my_profile")}>My Profile</MenuItem>
                    <MenuItem onClick={() => this.props.onClickOtherProfiles("/other_profiles")}>Other Profiles</MenuItem>
                    <MenuItem onClick={() => this.props.onClickReviews("/all_reviews")}>Reviews</MenuItem>
                    <MenuItem onClick={() => this.props.onClickNewReview("/new_review")}>Write New Review</MenuItem>
                    <MenuItem onClick={() => this.props.onClickSearch("/searchReviews")}>Search Review</MenuItem>
                    <MenuItem onClick={() => this.props.onClickSearch("/searchUsers")}>Search User</MenuItem>
                    <MenuItem onClick={() => this.props.onClickLogout("/logout")}>Logout</MenuItem>
                </Menu>
            </div>
        }
        if (this.props.displaySortMenu) {
            sortMenu = <div>
                <Button onClick={this.props.onClickSortMenu} aria-haspopup="true" color="inherit">
                    Menu
                </Button>
                <Menu id="fade-menu" anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      open={this.props.openSortMenu} onClose={this.props.onCloseSortMenu}>
                    <MenuItem onClick={() => this.props.onClickOptionSortMenu('date')}>Sort By Date</MenuItem>
                    <MenuItem onClick={() => this.props.onClickOptionSortMenu('bathroom')}>Sort By Bathroom Quality</MenuItem>
                    <MenuItem onClick={() => this.props.onClickOptionSortMenu('staff')}>Sort By Staff Kindness</MenuItem>
                    <MenuItem onClick={() => this.props.onClickOptionSortMenu('cleanliness')}>Sort By Cleanliness</MenuItem>
                    <MenuItem onClick={() => this.props.onClickOptionSortMenu('drive')}>Sort By Drive-through quality</MenuItem>
                    <MenuItem onClick={() => this.props.onClickOptionSortMenu('delivery')}>Sort By Delivery Speed</MenuItem>
                    <MenuItem onClick={() => this.props.onClickOptionSortMenu('quality')}>Sort By Food Quality</MenuItem>
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
                        {sortMenu}
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
        displaySortMenu: state['navigation'].get('displaySortMenu'),
        openSortMenu: state['navigation'].get('openSortMenu'),
        sortBy: state['allReviews'].get('sortBy'),
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
            dispatch(NavigationActions.onChangeRoute(newPath));
            dispatch(NavigationActions.showSortMenu(false));
            dispatch(AllReviewsActions.sortBy(''));
        },
        onClickOtherProfiles: (newPath) => {
            dispatch(NavigationActions.onChangeRoute(newPath));
            dispatch(NavigationActions.showSortMenu(false));
            dispatch(AllReviewsActions.sortBy(''))
        },
        onClickReviews: (newPath) => {
            dispatch(NavigationActions.onChangeRoute(newPath));
            dispatch(NavigationActions.showSortMenu(true));
            dispatch(AllReviewsActions.sortBy(''));
        },
        onClickNewReview: (newPath) => {
            dispatch(NavigationActions.onChangeRoute(newPath));
            dispatch(NavigationActions.showSortMenu(false));
            dispatch(AllReviewsActions.sortBy(''));
        },
        onClickSearch: (newPath) => {
            dispatch(NavigationActions.onChangeRoute(newPath));
            dispatch(NavigationActions.showSortMenu(false));
            dispatch(AllReviewsActions.sortBy(''))
        },
        onClickLogout: (newPath) => {
            dispatch(NavigationActions.onChangeRoute(newPath));
            dispatch(NavigationActions.showSortMenu(false));
            dispatch(AllReviewsActions.sortBy(''));
        },
        onClickSortMenu: () => {
            dispatch(NavigationActions.onOpenSortMenu(true))
        },
        onCloseSortMenu: () => {
            dispatch(NavigationActions.onOpenSortMenu(false))
        },
        onClickOptionSortMenu: (sortingMethod) => {
            dispatch(AllReviewsActions.sortBy(sortingMethod))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ButtonAppBar));