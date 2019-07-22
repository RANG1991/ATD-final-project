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

class AdvancedSearchForm extends React.Component {
    render() {
        let restaurants = this.props.reviews.map((x) => {
        return (<ReviewCard name={x.name} location={x.location} bathroom={x.bathroom} staff={x.staff}
                            cleanliness={x.cleanliness} drive={x.drive} showDeleteDialog={false}
                            delivery={x.delivery} food={x.food} img={x.images.length > 0 ? x.images[0] : undefined}/>);
    });

        return (
            <Grid container justify="center" spacing={0}>
            <Grid item xs={4}>
                <Paper>
                    <form autoComplete="on">
                        <TextField id="outlined-name"
                                   label="Restaurant Name"
                                   onChange={(e) => this.props.onChangeNameSearch(e.target.value)}
                                   margin="normal"
                                   variant="outlined"/>
                        <RadioGroup aria-label="position" name="position" row onChange={(e) => this.props.onChangeRadioButton(e.target.value)}>
                            <FormControlLabel
                                value='0'
                                control={<Radio color="primary" />}
                                label="without"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value='1'
                                control={<Radio color="primary" />}
                                label="1"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value='2'
                                control={<Radio color="primary" />}
                                label="2"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value='3'
                                control={<Radio color="primary" />}
                                label="3"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value='4'
                                control={<Radio color="primary" />}
                                label="4"
                                labelPlacement="top"
                            />
                        </RadioGroup>
                        <TextField id="outlined-name"
                                   label="Restaurant Location"
                                   onChange={(e) => this.props.onChangeLocationSearch(e.target.value)}
                                   margin="normal"
                                   variant="outlined"/>
                        <Button variant="contained" style={{margin: 15}}
                                onClick={() => {
                                    let allReviews = [];
                                    this.props.users.forEach((userEntry) => {
                                        allReviews = allReviews.concat(userEntry.get('reviews').toJS())
                                    });
                                    this.props.onClickSearch(allReviews)
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
        onClickSearch: (allReviews) => {
            dispatch(AdvancedSearchActions.onClickSearch(allReviews));
        },
        onChangeRadioButton: (value) => {
            dispatch(AdvancedSearchActions.changeRadioButton(parseInt(value)));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvancedSearchForm);