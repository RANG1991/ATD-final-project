import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
import {checkIfUserNameExists} from "./UserDetailsReg"

function EditNameDialog(props) {

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
            <Dialog open={props.openEditName} onClose={() => props.openDialog(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editing</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.editText}
                    </DialogContentText>
                    <TextField onChange={(e) => props.editName(e.target.value)}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="New Name"
                        type="text"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.onChangeUsername(props.users, props.currentUsername, props.editedName)} color="primary">
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
        openEditName: state['currentUser'].get('openEditName'),
        openEditLocation: state['currentUser'].get('openEditLocation'),
        editedName: state['currentUser'].get('editedName'),
        users: state['app'].get('users'),
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onChangeUsername: (users, oldUsername, newUsername) => {
            if (!checkIfUserNameExists(newUsername, users)) {
                dispatch(AppActions.changeUsernameApp(oldUsername, newUsername));
                dispatch(CurrentUserActions.changeUserName(newUsername))
            }
        },
        openDialog: (open) => {
            dispatch(CurrentUserActions.openDialogName(open))
        },
        editName: (newName) => {
            dispatch(CurrentUserActions.editingName(newName))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditNameDialog);