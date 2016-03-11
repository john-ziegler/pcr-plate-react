import React, { Component, PropTypes } from 'react';
import PlateWell from './PlateWell';
import Well from './Well';
import Sample from './Sample';
import { DragDropContext } from 'react-dnd';
import { default as TouchBackend } from 'react-dnd-touch-backend';
import HTML5Backend from 'react-dnd-html5-backend';

class Plate extends Component {
	renderWell(i) {
		const x = i % 12;
		const y = Math.floor(i / 12);
		
		return (
			<div key={i} 
				style={{ width: '8.25%', height: '12.5%'}}>
				<PlateWell x={x} y={y}>
					{this.renderSample(x,y)}
				</PlateWell>
			</div>
		);
	}

	renderSample(x, y) {
		for (var sample in this.props.samplePositions) {
			const [sampleX, sampleY] = this.props.samplePositions[sample];
			if(x === sampleX && y === sampleY) {
				
				return <Sample accession_number={sample} 
						chosen_volume={this.props.sampleList.get(sample).get('chosen_volume')} 
						concentration={this.props.sampleList.get(sample).get('concentration')} 
						assay={this.props.sampleList.get(sample).get('assay_type')}/>;
	  		}
	  	}
  	}


	render() {
		const wells = [];
		for (let i = 0; i < 96; i++) {
      		wells.push(this.renderWell(i));
   		 }

	    return (
	      <div style={{
	      	margin: '15px',
	        width: '99%',
	        height: '80%',
	        minHeight: '575px',
	        minWidth: '1000px',
	        display: 'flex',
	        flexWrap: 'wrap'
	      }}>
	        {wells}
	      </div>
    	);
	}

}

Plate.propTypes = {
		samplePositions: PropTypes.object.isRequired,
		sampleList: PropTypes.object.isRequired
};



export default DragDropContext(TouchBackend({ enableMouseEvents: true }))(Plate);