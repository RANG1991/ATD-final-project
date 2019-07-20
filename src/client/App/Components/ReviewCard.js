import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Grid, Paper} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        maxWidth: '100%',
    },
    media: {
        height: 200,
    },
    img: {
        borderRadius: '4px',
        padding: '5px',
        width: 250,
        height: 200,
    }
});

export default function ReviewCard(props) {
    const classes = useStyles();
    let img = null;
    if (props.img)
    {
        img = props.img
    }
    const parameters =
        [
            {name: "bathroom", value: props.bathroom},
            {name: "staff kindness", value: props.staff},
            {name: "cleanliness", value: props.cleanliness},
            {name: "drive-through", value: props.drive},
            {name: "delivery", value: props.delivery},
            {name: "food quality", value: props.food},
        ];

    const parameters_elements = parameters.map( x => (<Typography gutterBottom variant="subtitle1">
                                {x.name}: {x.value}
                            </Typography>));

    return (<Paper>
            <Grid container justify="center" spacing={0}>
                <Grid item xs={8}>
                    <img alt="complex" className={classes.img} src={img}/>
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom variant="subtitle1">
                        Name: {props.name}
                    </Typography>
                    {parameters_elements}
                </Grid>
            </Grid>
        </Paper>);
}