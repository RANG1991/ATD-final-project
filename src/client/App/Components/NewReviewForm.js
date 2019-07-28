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
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Paper from '@material-ui/core/Paper';

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
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class NewReviewForm extends React.Component {
    render() {
        const { classes } = this.props;
        const parameters = [
            {name: "Bathroom Quality", value: this.props.bathroom, id: "bathroom"},
            {name: "Staff Kindness", value: this.props.staff, id: "staff"},
            {name: "Cleanliness", value: this.props.cleanliness, id: "cleanliness"},
            {name: "Drive-thru quality", value: this.props.drive, id: "drive"},
            {name: "Delivery Speed", value: this.props.delivery, id: "delivery"},
            {name: "food quality", value: this.props.food, id: "food"},
        ];
        let imgs = null;
        if (this.props.imgs.size > 0)
        {
            imgs = <GridList cellHeight={160} className={classes.margin} cols={9}>
            {this.props.imgs.map(x => (
                    <GridListTile key={x} cols={3}>
                        <img src={URL.createObjectURL(x)} alt={x} />
                    </GridListTile>
                ))}
        </GridList>
        }
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
                {/*<FormControl fullWidth className={classes.margin}>*/}
                {/*    <InputLabel htmlFor="adornment-amount">Restaurant Location</InputLabel>*/}
                {/*    <Input*/}
                {/*        id="adornment-amount"*/}
                {/*        value={this.props.location}*/}
                {/*        onChange={(e) => this.props.onLocationChange(e.target.value)}*/}
                {/*        startAdornment={<InputAdornment position="start">Location</InputAdornment>}*/}
                {/*    />*/}
                {/*</FormControl>*/}
                {elements}
                <Button variant="contained"
                        onClick={(e) => this.props.onHandleSubmit(e, this.props.name, this.props.location, this.props.imgs, parameters,
                            this.props.currentUser)}
                        href={"/new_review"}>
                    Submit
                </Button>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <Dropzone onDrop={this.props.addImagesHandler}>
                            {({getRootProps, getInputProps}) => (
                                <section className="container">
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>{this.props.imagesMessage}</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </Paper>
                </Grid>
                {imgs}
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
        food: state['newReview'].get('food'),
        name: state['newReview'].get('name'),
        location: state['currentUser'].get('currentLocation'),
        imgs: state['newReview'].get('imgs'),
        imagesMessage: state['newReview'].get('imagesMessage'),
        currentUser: state['currentUser'].get('currentUsername'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onValueChange: (paramName, paramValue) => {
            dispatch(NewReviewActions.changeParamValue(paramName, paramValue))
        },
        onHandleSubmit: (e, name, location, images, params, currentUser) => {
            e.preventDefault();
           dispatch(AppActions.addRestaurant(...[name, location, images,...(params.map(x => x.value)), currentUser]));
           dispatch(NewReviewActions.resetForm());
        },
        onNameChange: (name) => {
            dispatch(NewReviewActions.changeName(name))
        },
        addImagesHandler: (acceptedFiles) => {
            dispatch(NewReviewActions.addImages(acceptedFiles))
        },
        onLocationChange: (location) => {
            dispatch(NewReviewActions.changeLocation(location))
        }
    }
};

export default (withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(NewReviewForm)));