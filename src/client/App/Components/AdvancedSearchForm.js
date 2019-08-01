import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AdvancedSearchActions from "../actions/AdvancedSearchActions";
import {connect} from "react-redux";
import ReviewCard from "./ReviewCard";
import Slider from '@material-ui/core/Slider';

class AdvancedSearchForm extends React.Component {
    render() {
        let restaurants = this.props.reviews.map((x) => {
        x = x.toJS();
        return (<ReviewCard name={x.name} location={x.location} bathroom={x.bathroom} staff={x.staff}
                            cleanliness={x.cleanliness} drive={x.drive} showDeleteDialog={false}
                            delivery={x.delivery} food={x.food} imgs={x.images.length > 0 ? x.images : undefined}/>);
    });
        let allReviews = [];
        this.props.users.forEach((userEntry) => {
            allReviews = allReviews.concat(userEntry.get('reviews').toJS())
        });
        return (
            <Grid container justify="center" spacing={0}>
            <Grid item xs={4}>
                <Paper>
                    <form autoComplete="on">
                    <RadioGroup aria-label="position" name="position" row onChange={(e) => this.props.onChangeRadioButtonSearchBy(e.target.value)}>
                        <FormControlLabel
                            value='1'
                            control={<Radio color="primary" />}
                            label="name only"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value='2'
                            control={<Radio color="primary" />}
                            label="location only"
                            labelPlacement="top"
                        />
                        <FormControlLabel
                            value='3'
                            control={<Radio color="primary" />}
                            label="location and name"
                            labelPlacement="top"
                        />
                    </RadioGroup>
                        <RadioGroup aria-label="position" name="position" row onChange={(e) => this.props.onChangeRadioButton(e.target.value)}>
                            <FormControlLabel
                                value="0"
                                control={<Radio color="primary" />}
                                label="without"
                                labelPlacement="top"
                                disabled={!this.props.enableButtons}
                            />
                            <FormControlLabel
                                value="1"
                                control={<Radio color="primary" />}
                                label="1"
                                labelPlacement="top"
                                disabled={!this.props.enableButtons}
                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio color="primary" />}
                                label="2"
                                labelPlacement="top"
                                disabled={!this.props.enableButtons}
                            />
                            <FormControlLabel
                                value="3"
                                control={<Radio color="primary" />}
                                label="3"
                                labelPlacement="top"
                                disabled={!this.props.enableButtons}
                            />
                            <FormControlLabel
                                value="4"
                                control={<Radio color="primary" />}
                                label="4"
                                labelPlacement="top"
                                disabled={!this.props.enableButtons}
                            />
                        </RadioGroup>
                        <TextField id="outlined-name"
                                   label="Restaurant Name"
                                   value={this.props.name}
                                   onChange={(e) => this.props.onChangeNameSearch(e.target.value)}
                                   margin="normal"
                                   variant="outlined"
                                   disabled={!this.props.enableName}/>
                        <TextField id="outlined-name"
                                   label="Restaurant Location"
                                   value={this.props.location}
                                   onChange={(e) => this.props.onChangeLocationSearch(e.target.value)}
                                   margin="normal"
                                   variant="outlined"
                                    disabled={!this.props.enableLocation}/>
                        <Slider
                            defaultValue={90}
                            aria-labelledby="discrete-slider"
                            onChange={(e, v) => this.props.handleSliderChange(v, this.props.currentCoor)}
                            valueLabelDisplay="auto"
                            step={10}
                            marks
                            min={0}
                            max={100}
                        />
                        <Button variant="contained" style={{margin: 15}}
                                onClick={() => {
                                    this.props.onClickSearch(this.props.name, this.props.location, allReviews)
                                }}
                            >
                            Search
                        </Button>
                    </form>
                </Paper>
            </Grid>
                <Grid item xs={8}>
                    <Paper>
                        {restaurants}
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state['app'].get('users'),
        reviews: state['advancedSearch'].get('reviews'),
        enableName: state['advancedSearch'].get('enableName'),
        enableLocation: state['advancedSearch'].get('enableLocation'),
        enableButtons: state['advancedSearch'].get('enableButtons'),
        name: state['advancedSearch'].get('name'),
        location: state['advancedSearch'].get('location'),
        currentCoor: state['currentUser'].get('currentCoor'),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeNameSearch: (name) => {
            dispatch(AdvancedSearchActions.changeNameSearch(name));
        },
        onChangeLocationSearch: (location) => {
            dispatch(AdvancedSearchActions.changeLocationSearch(location));
        },
        onClickSearch: (name, location, allReviews) => {
            dispatch(AdvancedSearchActions.onClickSearch(name, location, allReviews));
        },
        onChangeRadioButton: (value) => {
            dispatch(AdvancedSearchActions.changeRadioButton(parseInt(value)));
        },
        onChangeRadioButtonSearchBy: (value) => {
            dispatch(AdvancedSearchActions.changeRadioButtonSearchBy(parseInt(value)));
        },
        handleSliderChange: (value, coor) => {
            dispatch(AdvancedSearchActions.changeSlider(value, coor));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchForm);