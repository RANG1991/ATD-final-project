import React from 'react';
import UserProfileCard from "./UserProfileCard";
import ReviewCard from './ReviewCard'
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";

class UserProfileView extends React.Component {
    render(){
        let allUserReviews = this.props.users.getIn([this.props.user, 'reviews']);
        let restaurants = allUserReviews.map((x) =>{
            x = x.toJS();
            return <ReviewCard name={x.name} location={x.location} bathroom={x.bathroom} staff={x.staff}
                        cleanliness={x.cleanliness} drive={x.drive}
                        delivery={x.delivery} food={x.food} img={x.images.length > 0 ? x.images[0] : undefined}
                               id={x.id}
            showDeleteDialog={this.props.showDelete}/>
        });
        return (<div className={{flexGrow: 1}}>
            <UserProfileCard img={URL.createObjectURL(this.props.image)} username={this.props.user}
                             location={this.props.location} showButtons={this.props.showButtons}/>
            {<Typography variant="h4" gutterBottom>
                Reviews:
             </Typography> && restaurants.size > 0}
            {restaurants}
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        users: state['app'].get('users'),
    }
};

export default (connect(mapStateToProps)(UserProfileView));