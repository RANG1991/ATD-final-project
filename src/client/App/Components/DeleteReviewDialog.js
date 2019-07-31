import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import AppActions from "../actions/AppActions";
import {connect} from "react-redux";

function DeleteReviewDialog(props) {

    const useStyles = makeStyles(theme => ({
        fab: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();

    return (
        <div>
            <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={() => props.openDialog(props.id, props.currentUsername, true)}>
                <DeleteIcon/>
            </Fab>
            <Dialog open={props.openDeleteReview} onClose={() => props.openDialog(props.id, props.currentUsername, false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Deleting</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {props.textDelete}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => props.onDeleteReview(props.currentUsername, props.id)} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentUsername: state['currentUser'].get('currentUsername'),
        openDeleteReview: ownProps.openDeleteReview,
        users: state['app'].get('users'),
        id: ownProps.id,
        textDelete: ownProps.textDelete,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteReview: (username, id) => {
            dispatch(AppActions.deleteReviewSaga(username, id));
            dispatch(AppActions.openDeleteReview(id, username, false));
        },
        openDialog: (id, username, open) => {
            dispatch(AppActions.openDeleteReview(id, username, open))
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteReviewDialog);