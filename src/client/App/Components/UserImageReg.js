import React from "react"
import RegUser from "./UserDetailsReg";
import Grid from '@material-ui/core/Grid'
import { withRouter } from 'react-router'
import AppActions from "../actions/CurrentUserActions";
import {connect} from "react-redux";
import Dropzone from "react-dropzone";
import Image from 'react-image-resizer';

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
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
            img = <div style={thumb} key={this.props.imagePath}>
                <div style={thumbInner}>
                    <Image
                        src={this.props.imagePath}
                        height={500}
                        width={500}
                    />
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
        errorImage: state['currentUser'].get("errorImage"),
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addImageHandler: (acceptedFiles) => {
            dispatch(AppActions.addImage(acceptedFiles));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserImageReg));