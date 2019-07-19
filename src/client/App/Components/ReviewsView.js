import React from 'react';
import ReviewGrid from "./ReviewGrid";
import {connect} from "react-redux";

class ReviewsView extends React.Component {
    render(){
        let allReviews = [];
        this.props.users.valueSeq().forEach((userEntry) => {
            allReviews = allReviews.concat(userEntry.get('reviews').toJS())
        });
        let restaurants = allReviews.map(x => (
            <ReviewGrid name={x.name} bathroom={x.bathroom} staff={x.staff}
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