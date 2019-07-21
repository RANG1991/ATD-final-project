import React from 'react';
import ReviewCard from "./ReviewCard";
import {connect} from "react-redux";

class ReviewsView extends React.Component {
    render(){
        let allReviews = [];
        this.props.users.forEach((userEntry) => {
            allReviews = allReviews.concat(userEntry.get('reviews').toJS())
        });
        allReviews = allReviews.sort((x, y) => (x[this.props.sortBy] - y[this.props.sortBy]));
        let restaurants = allReviews.map(x => (
            <ReviewCard name={x.name} bathroom={x.bathroom} staff={x.staff}
                        cleanliness={x.cleanliness} drive={x.drive} showDeleteDialog={false}
                        delivery={x.delivery} food={x.food} img={x.images.size > 0 ? x.images[0] : undefined}/>
        ));
        return <div>
            {restaurants}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state['app'].get('users'),
        sortBy: state['allReviews'].get('sortBy'),
    }
};

export default (connect(mapStateToProps)(ReviewsView));