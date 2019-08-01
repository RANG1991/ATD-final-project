import React from 'react';
import ReviewCard from "./ReviewCard";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from "@material-ui/core/Collapse";
import CardContent from "@material-ui/core/CardContent";
import AppActions from "../actions/AppActions";
import Paper from "@material-ui/core/Paper";

class ReviewsView extends React.Component {
    render() {
            let allReviews = this.props.users.flatMap(x => x.get('reviews')).toJS();
            let allReviewsGrouped = {};
            for (let i = 0 ; i < allReviews.length ; i++) {
                if (allReviews[i].name + "_" + allReviews[i].location in allReviewsGrouped)
                {
                    allReviewsGrouped[allReviews[i].name + "_" + allReviews[i].location].push(allReviews[i]);
                }
                else {
                    allReviewsGrouped[allReviews[i].name + "_" + allReviews[i].location] = [];
                    allReviewsGrouped[allReviews[i].name + "_" + allReviews[i].location].push(allReviews[i]);
                }
            }
            let allReviewsSorted = {};
            for (let key in allReviewsGrouped) {
                if (allReviewsGrouped.hasOwnProperty(key)) {
                    allReviewsSorted[key] = allReviewsGrouped[key].sort((x, y) => x[this.props.sortBy] - y[this.props.sortBy])
                }
            }
        let restaurantsList = Object.keys(allReviewsSorted).map(key => {
            let reviewsCards = allReviewsSorted[key].map(x => <ReviewCard name={x.name} location={x.location} bathroom={x.bathroom} staff={x.staff}
                        cleanliness={x.cleanliness} drive={x.drive}
                        delivery={x.delivery} food={x.food} img={x.images.length > 0 ? x.images[0] : undefined}
                        id={x.id} key={x.id} showDeleteDialog={this.props.showDelete}
                        openDeleteReview={x.openDeleteReview}
                        openEditReview={x.openEditReview}/>);
            return (<Paper>
                <Typography>
                    Name: {key.split("_")[0]}
                </Typography>
                <Typography>
                    Location: {key.split("_")[1]}
                </Typography>
                <IconButton
                    onClick={() => this.props.handleExpandClick(key)}
                    aria-expanded={this.props.mapNameLocationReviews.getIn([key, 'expand'])}
                    aria-label="Show more">
                    <ExpandMoreIcon />
                </IconButton>
                <Collapse in={this.props.mapNameLocationReviews.getIn([key, 'expand'])} timeout="auto" unmountOnExit>
                    <CardContent>
                        {reviewsCards}
                    </CardContent>
                </Collapse>
            </Paper>)
        });
        console.log(restaurantsList);
        return <div>
            {restaurantsList}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state['app'].get('users'),
        sortBy: state['allReviews'].get('sortBy'),
        mapNameLocationReviews: state['app'].get('mapNameLocationReviews'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        handleExpandClick: (key) => {
            dispatch(AppActions.handleExpandClick(key));
        }
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(ReviewsView));