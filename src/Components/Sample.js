import React, { Component } from 'react';
var PropTypes = React.PropTypes;
import { ItemTypes, AssayColors } from '../Utils/Constants';
import { DragSource } from 'react-dnd';

const SampleSource = {
  beginDrag(props) {
    return {id: props.accession_number};
  }
};

function collect(connect, monitor) {
	return {
		  connectDragSource: connect.dragSource(),
    	isDragging: monitor.isDragging()
	}
}

class Sample extends Component {
  determineColor(str) {
    return AssayColors[str];
  }  

  render() {
  	const {connectDragSource, isDragging, accession_number, chosen_volume, concentration, assay} = this.props;
    const color = this.determineColor(assay);
    return connectDragSource(<div style={{ height: "100%", fontWeight: "bold", fontSize: "10px", textAlign: "center", backgroundColor: color, opacity: isDragging ? 0.5 : 1}}>
    			<div>{accession_number}</div>
    			<div>{chosen_volume} μL</div>
    			<div>{concentration} ng/μL</div>
    			<div>{assay}</div>
    		</div>);
  }
}

Sample.propTypes =  {connectDragSource: PropTypes.func.isRequired, 
                      isDragging: PropTypes.bool.isRequired, 
                      accession_number: PropTypes.string.isRequired,
                      chosen_volume: PropTypes.number,
                      concentration: PropTypes.number,
                      assay: PropTypes.string };

export default DragSource(ItemTypes.SAMPLE, SampleSource, collect)(Sample);
