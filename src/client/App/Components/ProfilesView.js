import {connect} from "react-redux";
import React from "react";
import UserProfileView from "./UserProfileView";

class ProfilesView extends React.Component {
    render() {
        let allUsersProfiles = this.props.users.keySeq().map((x) => {
            let entry = this.props.users.get(x).toJS();
            return <UserProfileView image={entry.imagePath} user={x} key={x}
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