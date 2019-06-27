import React from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dropzone from "react-dropzone";

class LoginUser extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {username : "", location: "", errorUsername : "", img: null, errorImage: ""};
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.handleSubmit= this.handleSubmit.bind(this);
    }

    onChangeUsername(event)
    {
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
        console.log(event);
        if (this.props.checkIfExists(this.state.username)) {
            this.setState({errorUsername: 'user name already exist!'});
        }
        else {
            this.props.addUsername(this.state.username, this.state.location, this.state.img);
        }
    }

    render() {
        return (
            <div>
            <Dropzone onDrop={acceptedFiles => {
                if (acceptedFiles.length > 0)
                {
                    this.setState({img: acceptedFiles[0]})
                }
                else {
                    this.setState({errorImage: "you have to choose an image!"})
                }
            }}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>please drop your image here!</p>
                        </div>
                    </section>
                )}
            </Dropzone>
            <form autoComplete="on" onSubmit={this.handleSubmit}>
                <TextField id="outlined-name" error={this.state.errorUsername !== ''} helperText= {this.state.errorUsername} label="User Name" onChange={this.onChangeUsername} margin="normal" variant="outlined"/>
                <TextField id="outlined-name" label="Location" onChange={this.onChangeLocation} margin="normal" variant="outlined"/>
                <Button variant="contained" style={style}>
                    Submit
                </Button>
            </form>
            </div>
        );
    }

}
const style = {
    margin: 15,
};
export default LoginUser