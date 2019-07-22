import React from 'react';
import UserProfileCard from "./UserProfileCard";
import ReviewCard from './ReviewCard'
import {connect} from "react-redux";

class UserProfileView extends React.Component {
    render(){
        let allUserReviews = this.props.users.getIn([this.props.currentUsername, 'reviews']);
        let restaurants = allUserReviews.map((x) =>{
            x = x.toJS();
            return <ReviewCard name={x.name} location={x.location} bathroom={x.bathroom} staff={x.staff}
                        cleanliness={x.cleanliness} drive={x.drive}
                        delivery={x.delivery} food={x.food} img={x.images.length > 0 ? x.images[0] : undefined}
                               id={x.id}
            showDeleteDialog={true}/>
        });
        return (<div className={{flexGrow: 1}}>
            <UserProfileCard img={URL.createObjectURL(this.props.currentImagePath)} username={this.props.currentUsername}
                             location={this.props.currentLocation} showButtons={true}/>
            {restaurants}
        </div>)
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