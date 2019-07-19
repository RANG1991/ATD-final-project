import React from 'react';
import UserProfileGrid from "./UserProfileGrid";
import ReviewGrid from './ReviewGrid'
import {connect} from "react-redux";

class UserProfileView extends React.Component {
    render(){
        let allUserReviews = this.props.users.getIn([this.props.currentUsername, 'reviews']);
        let restaurants = allUserReviews.map(x => (
            <ReviewGrid name={x.name} bathroom={x.bathroom} staff={x.staff}
                        cleanliness={x.cleanliness} drive={x.drive}
                        delivery={x.delivery} food={x.food} img={URL.createObjectURL(x.images[0])}/>
        ));
        return <div>
            <UserProfileGrid img={URL.createObjectURL(this.props.currentImagePath)} username={this.props.currentUsername}
                             location={this.props.currentLocation}/>
            {restaurants}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state['app'].get('users'),
        currentUsername: state['currentUser'].get('currentUsername'),
        currentLocation: state['currentUser'].get('currentLocation'),
        currentImagePath: state['currentUser'].get('currentImagePath'),
    }
};

export default (connect(mapStateToProps)(UserProfileView));