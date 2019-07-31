import React from "react"
import RegUser from "./UserDetailsReg";
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router'
import CurrentUserActions from "../actions/CurrentUserActions";
import {connect} from "react-redux";
import Dropzone from "react-dropzone";
import ImageGrid from "./ImageGrid";

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

class UserImageReg extends React.Component
{
    render()
    {
        let img = null;
        if (this.props.imagePath !== '')
        {
            img = <ImageGrid img={this.props.imagePath}/>
        }
        return (<Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}>
                <Grid item xs={3}>
                    <Dropzone onDrop={this.props.addImageHandler}>
                    {({getRootProps, getInputProps}) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>{this.props.errorImage}</p>
                            </div>
                            <aside style={thumbsContainer}>
                                {img}
                            </aside>
                        </section>
                    )}
                </Dropzone>
            <RegUser/>
                </Grid>
            </Grid>)
    }
}

const mapStateToProps = (state) => {
    return {
        imagePath : state['currentUser'].get("currentImagePath"),
        relativeImagePath: state['currentUser'].get("relativeImagePath"),
        errorImage: state['currentUser'].get("errorImage"),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addImageHandler: (acceptedFiles) => {
            dispatch(CurrentUserActions.addImage(acceptedFiles));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserImageReg));