import React from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import NewReviewActions from '../actions/NewReviewActions'
import {connect} from "react-redux";
import Button from "@material-ui/core/Button";
import AppActions from "../actions/AppActions";
import Grid from "@material-ui/core/Grid";
import Dropzone from "react-dropzone";

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

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        flexBasis: 200,
    },
});

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

class ReviewForm extends React.Component {
    render() {
        const { classes } = this.props;
        const parameters = [
            {name: "Bathroom Quality", value: this.props.bathroom, id: "bathroom"},
            {name: "Staff Kindness", value: this.props.staff, id: "staff"},
            {name: "Cleanliness", value: this.props.cleanliness, id: "cleanliness"},
            {name: "Drive-thru quality", value: this.props.drive, id: "drive"},
            {name: "Delivery Speed", value: this.props.delivery, id: "delivery"},
        ];
        const elements = parameters.map((x) => <TextField
            select
            key={x.id}
            label={x.name}
            value={x.value}
            onChange={(e) => this.props.onValueChange(x.id, e.target.value)}
            className={clsx(classes.margin, classes.textField)}>
            {ranges.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>);
        return (
            <div className={classes.root}>
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor="adornment-amount">Restaurant Name</InputLabel>
                    <Input
                        id="adornment-amount"
                        value={this.props.name}
                        onChange={(e) => this.props.onNameChange(e.target.value)}
                        startAdornment={<InputAdornment position="start">Name</InputAdornment>}
                    />
                </FormControl>
                {elements}
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}>
                    <Grid item xs={3}>
                        <Dropzone onDrop={this.props.addImageHandler}>
                            {({getRootProps, getInputProps}) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>{this.props.errorImage}</p>
                                    </div>
                                    <aside style={thumbsContainer}>
                                        {imgs}
                                    </aside>
                                </section>
                            )}
                        </Dropzone>
                    </Grid>
                </Grid>
                <Button variant="contained"
                        onClick={(e) => this.props.onSubmit(e, this.props.name, parameters)}
                        href={"/new_review"}>
                    Submit
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bathroom: state['newReview'].get('bathroom'),
        staff: state['newReview'].get('staff'),
        cleanliness: state['newReview'].get('cleanliness'),
        drive: state['newReview'].get('drive'),
        delivery: state['newReview'].get('delivery'),
        name: state['newReview'].get('name'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onValueChange: (paramName, paramValue) => {
            dispatch(NewReviewActions.changeParamValue(paramName, paramValue))
        },
        onSubmit: (e, name, params) => {
            e.preventDefault();
           dispatch(AppActions.addRestaurant(...[name,...(params.map(x => x.value))]))
        },
        onNameChange: (name) => {
            dispatch(NewReviewActions.changeName(name))
        }
    }
};

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(ReviewForm)));