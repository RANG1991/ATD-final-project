import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import AppActions from "../actions/AppActions";
import {connect} from "react-redux";
import CurrentUserActions from "../actions/CurrentUserActions";
import AutoComplete from "material-ui/AutoComplete";

function EditLocationDialog(props) {
    let allPlaces = props.placesList.map( x => x.get('name')).toJS();
    const useStyles = makeStyles(theme => ({
        fab: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();

    return (
        <div>
            <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={() => props.openDialog(true)}>
                <EditIcon/>
            </Fab>
            <Dialog open={props.openEditLocation} onClose={() => props.openDialog(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editing</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.editText}
                    </DialogContentText>
                    <AutoComplete
                        hintText="Type anything"
                        dataSource={allPlaces}
                        onUpdateInput={props.editLocation}
                        margin="normal"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.onChangeLocation(props.currentUsername, props.editedLocation)} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUsername: state['currentUser'].get('currentUsername'),
        openEditLocation: state['currentUser'].get('openEditLocation'),
        users: state['app'].get('users'),
        editedLocation: state['currentUser'].get('editedLocation'),
        placesList: state['currentUser'].get('placesList'),
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onChangeLocation: (username, newLocation) => {
                dispatch(AppActions.changeLocationAppSaga(username, newLocation));
                dispatch(CurrentUserActions.changeLocation(newLocation))
        },
        openDialog: (open) => {
            dispatch(CurrentUserActions.openDialogLocation(open))
        },
        editLocation: (newLocation) => {
            dispatch(CurrentUserActions.editingLocation(newLocation))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLocationDialog);