import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router";
import {Grid, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import EditDialogName from "./EditNameDialog"
import EditDialogLocation from "./EditLocationDialog"

const useStyles = makeStyles(theme => ({
    img: {
        width: 250,
        height: 200,
    }
}));

export default function UserProfileCard(props) {
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
                <EditDialogName editText={"please enter your new name here"}/>
            </Grid>
        <Grid item xs={3}>
            <Typography gutterBottom variant="h6">
                {props.location}
            </Typography>
        </Grid>
            <Grid item xs={1}>
                <EditDialogLocation editText={"please enter your new location here"}/>
            </Grid>
    </Grid>
    </Paper>);
}

(withRouter(UserProfileCard));