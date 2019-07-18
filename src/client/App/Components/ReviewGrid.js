import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function ReviewGrid(props) {
    const classes = useStyles();
    let img = null;
    if (props.img)
    {
        img = <img className={classes.img} alt="complex"
                   src={props.img} />
    }
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        {img}
                    </Grid>
                    <Grid item xs={12} sm container spacing={60}>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    Name: {props.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Bathroom: {props.bathroom}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Staff Kindness: {props.staff}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Cleanliness: {props.cleanliness}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Drive-through: {props.drive}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Delivery: {props.delivery}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}