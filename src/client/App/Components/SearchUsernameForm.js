import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchUsernameActions from "../actions/SearchUsernameActions";
import {connect} from "react-redux";
import Typography from "@material-ui/core/Typography";
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import UserProfileView from "./UserProfileView";
import CardContent from '@material-ui/core/CardContent';

class SearchUsernameForm extends React.Component {
    render() {
        let userProfiles = this.props.selectedUsers.map((x) => {
            let entry = x.toJS();
            console.log("hello", entry.viewProfileInSearch);
            return <div><Typography>
                Name: {entry.username}
                    </Typography>
                <IconButton
                    onClick={() => this.props.handleExpandClick(entry.username)}
                    aria-expanded={entry.viewProfileInSearch}
                    aria-label="Show more">
                    <ExpandMoreIcon />
                </IconButton>
                <Collapse in={entry.viewProfileInSearch} timeout="auto" unmountOnExit>
                    <CardContent>
                        <UserProfileView image={entry.imagePath} user={entry.username} key={entry.username}
                                         location={entry.location} showButtons={false} showDelete={false}/>
                    </CardContent>
                </Collapse>
            </div>
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
                                    onClick={() => {this.props.onClickSearch(this.props.users);}}>
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
        handleExpandClick: (user) => {
            dispatch(SearchUsernameActions.onClickViewProfile(user));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchUsernameForm);