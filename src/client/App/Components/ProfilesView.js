import {connect} from "react-redux";
import React from "react";
import UserProfileView from "./UserProfileView";

class ProfilesView extends React.Component {
    render() {
        let allUsersProfiles = this.props.users.map((x) => {
            let entry = x.toJS();
            return <UserProfileView image={entry.imagePath} user={entry.username} key={entry.username}
                                    location={entry.location} showButtons={false} showDelete={false}/>
        });
        return (<div className={{flexGrow: 1}}>
            {allUsersProfiles}
        </div>)
    }
}

const mapStateToProps = (state) => {
    return {
        users: state['app'].get('users'),
    }
};

export default (connect(mapStateToProps)(ProfilesView));