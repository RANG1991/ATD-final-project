import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const style = {
    margin: 15,
};

class Home extends React.Component {
    render() {
        return (
            <form autoComplete="on">
                <TextField id="outlined-name"
                           error={this.props.errorUsername !== ''}
                           helperText={this.props.errorUsername}
                           label="User Name"
                           onChange={this.props.onChangeUsername}
                           margin="normal"
                           variant="outlined"/>
                <TextField id="outlined-name"
                           label="Location"
                           onChange={this.props.onChangeLocation}
                           margin="normal"
                           variant="outlined"/>
                <Button variant="contained" style={style} onClick={this.props.handleSubmit} href={"/welcome/" + this.props.currentUsername}>
                    Submit
                </Button>
            </form>
        )
    }
}

export default Home