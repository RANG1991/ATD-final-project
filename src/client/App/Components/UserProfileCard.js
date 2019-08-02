import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Grid, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import EditDialogName from "./EditNameDialog"
import EditDialogLocation from "./EditLocationDialog"
import {connect} from "react-redux";

const useStyles = makeStyles(theme => ({
    img: {
        width: 250,
        height: 200,
    }
}));

function UserProfileCard(props) {

    console.log("hello", props);

    const classes = useStyles();
    return (<Paper>
        <Grid container justify="center" spacing={0}>
        <Grid item xs={4}>
            <img alt="complex" src={props.img} className={classes.img} />
        </Grid>
        <Grid item xs={3}>
            <Typography gutterBottom variant="h6">
                {props.username}
            </Typography>
        </Grid>
            <Grid item xs={1}>
                {props.showButtons &&
                    <EditDialogName editText={"please enter your new name here"}/>
                }
            </Grid>
        <Grid item xs={3}>
            <Typography gutterBottom variant="h6">
                {props.location}
            </Typography>
        </Grid>
            <Grid item xs={1}>
                {props.showButtons &&
                    <EditDialogLocation editText={"please enter your new location here"}/>
                }
            </Grid>
    </Grid>
    </Paper>);
}

const mapStateToProps = (state, ownProps) => {
    return {
        showButtons: ownProps.showButtons,
        location: ownProps.location,
        username: ownProps.username,
    }
};

export default (connect(mapStateToProps)(UserProfileCard));