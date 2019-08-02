import {connect} from "react-redux";
import React from "react";
import UserProfileView from "./UserProfileView";

class MyProfileView extends React.Component {
    render(){
        return (<UserProfileView image={this.props.currentImagePath}
                                 user={this.props.currentUsername}
                                 location={this.props.currentLocation} showButtons={true} showDelete={true}/>)
    }
}

const mapStateToProps = (state) => {
    return {
        currentUsername: state['currentUser'].get('currentUsername'),
        currentLocation: state['currentUser'].get('currentLocation'),
        currentImagePath: state['currentUser'].get('currentImagePath'),
    }
};

export default (connect(mapStateToProps)(MyProfileView));