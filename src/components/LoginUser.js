import React from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class LoginUser extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {username : "", location: "", errorUsername : ""};
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    onChangeUsername(event) {
        if (this.props.checkIfExists(event.target.value)) {
            this.setState({errorUsername: 'user name already exist!'});
        }
        else {
            this.setState({username: event.target.value, errorUsername: ''});
        }
    }

    onChangeLocation(event) {
        this.setState({location: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.props.checkIfExists(this.state.username)) {
            this.setState({errorUsername: 'user name already exist!'});
            return;
        }
        this.props.addUsernameHelper(this.state.username, this.state.location);
    }

    render() {
        return (
            <form autoComplete="on">
                <TextField id="outlined-name" error={this.state.errorUsername !== ''} helperText= {this.state.errorUsername} label="User Name" onChange={this.onChangeUsername} margin="normal" variant="outlined"/>
                <TextField id="outlined-name" label="Location" onChange={this.onChangeLocation} margin="normal" variant="outlined"/>
                <Button variant="contained" style={style} onClick={this.handleSubmit}>
                    Submit
                </Button>
            </form>
        );
    }

}
const style = {
    margin: 15,
};
export default LoginUser