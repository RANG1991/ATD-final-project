import React from "react"
import LoginUser from "./LoginUser";
import Grid from '@material-ui/core/Grid'
import DragAndDrop from "./DragAndDrop";

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 500,
    height: 500,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const imgStyle = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

class UserProfile extends React.Component
{
    constructor(props) {
       super(props);
       this.state = {imagePath: "", errorImage: "please pick an image!"}
    }

    addUsernameHelper = (username, location) =>
    {
        if (this.state.imagePath !== "") {
            this.props.addUsername(username, location, this.state.imagePath);
            this.setState({imagePath: '', errorImage: "please pick an image!"})
        }
        else
        {
            this.setState({errorImage: "you have to select an image!"})
        }
    };

    addImage = (acceptedFiles) => {
        if (acceptedFiles.length === 1) {
            this.setState({imagePath: URL.createObjectURL(acceptedFiles[0]), errorImage: ""})
        } else if (acceptedFiles.length > 1) {
            this.setState({errorImage: "you have to choose only one image!"})
        }
    };

    render()
    {
        let img = null;
        if (this.state.imagePath !== '')
        {
            img = <div style={thumb} key={this.state.imagePath}>
                <div style={thumbInner}>
                    <img src={this.state.imagePath} alt="userImage" style={imgStyle}/>
                </div>
            </div>
        }
        return (<Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                <Grid item xs={3}>
            <DragAndDrop addImage={this.addImage} errorImage={this.state.errorImage} img={img}/>
            <LoginUser addResturant={this.props.addRestaurant} addUsernameHelper={this.addUsernameHelper}
                       checkIfExists={this.props.checkIfExists}/>
                </Grid>
            </Grid>)
    }

}

export default UserProfile;