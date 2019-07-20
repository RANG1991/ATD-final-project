import React from 'react';
import ReviewCard from "./ReviewCard";
import {connect} from "react-redux";

class ReviewsView extends React.Component {
    render(){
        let allReviews = [];
        this.props.users.forEach((userEntry) => {
            allReviews = allReviews.concat(userEntry.get('reviews').toJS())
        });
        let restaurants = allReviews.map(x => (
            <ReviewCard name={x.name} bathroom={x.bathroom} staff={x.staff}
                        cleanliness={x.cleanliness} drive={x.drive}
                        delivery={x.delivery} food={x.food} img={URL.createObjectURL(x.images[0])}/>
        ));
        return <div>
            {restaurants}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state['app'].get('users'),
    }
};

export default (connect(mapStateToProps)(ReviewsView));