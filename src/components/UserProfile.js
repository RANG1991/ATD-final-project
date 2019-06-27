import React from "react"
import LoginUser from "./LoginUser";
import Grid from '@material-ui/core/Grid'

class UserProfile extends React.Component
{
    render()
    {
        return (<Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                <Grid item xs={3}>
            <LoginUser addResturant={this.props.addRestaurant} addUsername = {this.props.addUsername}
                       checkIfExists={this.props.checkIfExists}/>
                </Grid>
            </Grid>)
    }

}

export default UserProfile