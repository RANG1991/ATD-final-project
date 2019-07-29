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
import InputLabel from "@material-ui/core/InputLabel";
import clsx from "clsx";
import MenuItem from "@material-ui/core/MenuItem";
import AllReviewsActions from "../actions/AllReviewsActions";

const ranges = [
    {
        value: 0,
        label: '0',
    },
    {
        value: 1,
        label: '1',
    },
    {
        value: 2,
        label: '2',
    },
    {
        value: 3,
        label: '3',
    },
    {
        value: 4,
        label: '4',
    },
    {
        value: 5,
        label: '5',
    },
];

function EditReviewDialog(props) {



    const useStyles = makeStyles(theme => ({
        fab: {
            margin: theme.spacing(1),
        },
        textField: {
            flexBasis: 200,
        },
        menu: {
            margin: theme.spacing(2),
        },
        dialogPaper: {
            minHeight: '80vh',
            maxHeight: '80vh',
            minWidth: '80vh',
            maxWidth: '80vh',
        },
    }));
    const classes = useStyles();

    const parameters = [
        {name: "Bathroom Quality", value: props.bathroom, id: "bathroom"},
        {name: "Staff Kindness", value: props.staff, id: "staff"},
        {name: "Cleanliness", value: props.cleanliness, id: "cleanliness"},
        {name: "Drive-thru quality", value: props.drive, id: "drive"},
        {name: "Delivery Speed", value: props.delivery, id: "delivery"},
        {name: "food quality", value: props.food, id: "food"},
    ];
    const elements = parameters.map((x) => <TextField
        select
        key={x.id}
        label={x.name}
        value={x.value}
        onChange={(e) => props.onChangeValueEdit(x.id, e.target.value)}
        className={clsx(classes.menu, classes.textField)}>
        {ranges.map(option => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
        ))}
    </TextField>);

    return (
        <div>
            <Fab color="secondary" aria-label="Edit" className={classes.fab} onClick={() => props.openDialog(true)}>
                <EditIcon/>
            </Fab>
            <Dialog open={props.openEditReview} classes={{ paper: classes.dialogPaper }}
                    onClose={() => props.openDialog(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Editing</DialogTitle>
                <DialogContent fullWidth={true}>
                    <DialogContentText>
                        {props.idx}
                    </DialogContentText>
                        <InputLabel htmlFor="adornment-amount">Edit</InputLabel>
                        {elements}
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => props.onHandleSubmit(e, props.idx, parameters, props.currentUser)} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    console.log(ownProps.id);
    return {
        bathroom: state['allReviews'].get('bathroom'),
        staff: state['allReviews'].get('staff'),
        cleanliness: state['allReviews'].get('cleanliness'),
        drive: state['allReviews'].get('drive'),
        delivery: state['allReviews'].get('delivery'),
        food: state['allReviews'].get('food'),
        openEditReview: state['allReviews'].get('openEditReview'),
        currentUser: state['currentUser'].get('currentUsername'),
        idx: ownProps.id,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        onChangeValueEdit: (paramName, paramValue) => {
            dispatch(AllReviewsActions.changeValueEdit(paramName, paramValue))
        },
        openDialog: (open) => {
            dispatch(AllReviewsActions.openDialogEditReview(open))
        },
        onHandleSubmit: (e, id, params, currentUser) => {
            dispatch(AppActions.editRestaurant(...[id, ...(params.map(x => x.value)), currentUser]));
            dispatch(AllReviewsActions.openDialogEditReview(false));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditReviewDialog);