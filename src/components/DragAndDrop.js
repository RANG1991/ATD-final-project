import React from 'react'
import Dropzone from "react-dropzone";


const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

class DragAndDrop extends React.Component {

    onFilesDrop = (acceptedFiles) => {
        this.props.addImage(acceptedFiles);
    };

    render() {
        return (<Dropzone onDrop={this.onFilesDrop}>
            {({getRootProps, getInputProps}) => (
                <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>{this.props.errorImage}</p>
                    </div>
                    <aside style={thumbsContainer}>
                        {this.props.img}
                    </aside>
                </section>
            )}
        </Dropzone>)

    }
}
export default DragAndDrop