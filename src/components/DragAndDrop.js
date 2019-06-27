import React from 'react'
import Box from '@material-ui/core/Box';

class DragAndDrop extends React.Component {

    constructor(props)
    {
        super(props);
        this.dragCounter = 0;
        this.state = {dragging : false};
    }

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter++;
        if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
            this.setState({dragging: true})
        }
    };

    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.dragCounter--;
        if (this.dragCounter > 0) {
            return
        }
        this.setState({dragging: false})
    };

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: false});
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.props.handleDrop(e.dataTransfer.files);
            e.dataTransfer.clearData();
            this.dragCounter = 0
        }
    };

    render() {
        return (
            <Box component="div" m={50} clone>
            <div onDragEnter={this.handleDragIn} onDragLeave={this.handleDragOut} onDragOver={this.handleDrag} onDrop={this.handleDrop}>
                {this.state.dragging && <div>drop here your image please</div>}
            </div>
            </Box>
        )
    }
}
export default DragAndDrop