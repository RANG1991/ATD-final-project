import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Grid, Paper} from "@material-ui/core";
import DeleteReviewDialog from "./DeleteReviewDialog"

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
    let deleteDialog = null;
    if (props.showDeleteDialog) {
        deleteDialog = <DeleteReviewDialog id={props.id} textDelete={"Are you sure you want to delete this review?"}/>
    }
    if (props.img !== undefined) {
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
                <Grid item xs={7}>
                    {img !== null && <img alt="complex" className={classes.img} src={URL.createObjectURL(img)}/>}
                </Grid>
                <Grid item xs={4}>
                    <Typography gutterBottom variant="subtitle1">
                        Name: {props.name}
                    </Typography>
                    {parameters_elements}
                </Grid>
            <Grid item xs={1}>
                {deleteDialog}
            </Grid>
            </Grid>
        </Paper>);
}