import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchUsernameActions from "../actions/SearchUsernameActions";
import {connect} from "react-redux";
import UserProfileCard from "./UserProfileCard";

class SearchUsernameForm extends React.Component {
    render() {
        let userProfiles = this.props.selectedUsers.map((x) => {
            let entry = this.props.users.get(x).toJS();
            return <UserProfileCard img={URL.createObjectURL(entry.imagePath)} username={x}
                                    location={entry.location} showButtons={false}/>
        });
        return (
            <Grid container justify="center" spacing={0}>
                <Grid item xs={4}>
                    <Paper>
                        <form autoComplete="on">
                            <TextField id="outlined-name"
                                       label="Name"
                                       onChange={(e) => this.props.onChangeNameSearch(e.target.value)}
                                       margin="normal"
                                       variant="outlined"/>
                            <TextField id="outlined-name"
                                       label="Location"
                                       onChange={(e) => this.props.onChangeLocationSearch(e.target.value)}
                                       margin="normal"
                                       variant="outlined"/>
                            <Button variant="contained" style={{margin: 15}}
                                    onClick={() => {
                                        this.props.onClickSearch(this.props.users);
                                    }}
                            >
                                Search
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper>
                        {userProfiles}
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state['app'].get('users'),
        selectedUsers: state['userSearch'].get('users'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeNameSearch: (name) => {
            dispatch(SearchUsernameActions.changeNameSearchUsername(name));
        },
        onChangeLocationSearch: (location) => {
            dispatch(SearchUsernameActions.changeLocationSearchUsername(location));
        },
        onClickSearch: (users) => {
            dispatch(SearchUsernameActions.onClickSearchUsername(users));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsernameForm);