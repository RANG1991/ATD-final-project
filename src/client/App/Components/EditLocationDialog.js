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
import Autosuggest from "react-autosuggest";

const theme = {
    input : {
        variant: 'outlined',
        width: '222px',
        height: '56px',
        fontSize: '16px',
        border: '1px solid #aaa',
        borderRadius: '4px',
    }
};

const getSuggestionValue = suggestion => suggestion.name;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.name}
    </div>
);

function EditLocationDialog(props) {
    const useStyles = makeStyles(theme => ({
        fab: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();

    const inputProps = {
        placeholder: 'Location',
        value: props.value,
        onChange: props.onEditLocation,
    };

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
                    <Autosuggest
                        suggestions={props.suggestions.toJS()}
                        onSuggestionsFetchRequested={props.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={props.onSuggestionsClearRequested}
                        getSuggestionValue={getSuggestionValue}
                        renderSuggestion={renderSuggestion}
                        inputProps={inputProps}
                        theme={theme}
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
        value: state['currentUser'].get('editedLocation'),
        suggestions: state['currentUser'].get('placesSuggestions'),
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
        onSuggestionsFetchRequested: ({value}) => {
            dispatch(CurrentUserActions.SuggestionsFetchRequest(value));
        },
        onSuggestionsClearRequested:  () => {
            dispatch(CurrentUserActions.SuggestionsClearRequest());
        },
        onEditLocation: (event, { newValue }) => {
            dispatch(CurrentUserActions.editingLocation(newValue));
        },
    }
};

export default (connect(mapStateToProps, mapDispatchToProps)(EditLocationDialog));