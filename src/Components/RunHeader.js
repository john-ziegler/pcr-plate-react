import React, { Component, PropTypes } from 'react';
import {dispatch} from '../Dispatcher/PCRDispatcher';
import {Grid, Col, Row, Input, ButtonInput } from 'react-bootstrap';

var PCRAppAPI = require('../Utils/PCRAppAPI');

export default class RunHeader extends Component {


	handleRunChange (e) {
		var run_number = e.target.value;
		dispatch({type: 'run/change-run', run_number: run_number});
	}

	handleSave(e) {
		PCRAppAPI.sendSaveAllSamples(this.props.sampleList, this.props.samplePositions, this.props.runNumber);
	}

	render() {
		return (<Grid>
					<div style={{textAlign: "center"}}>
						<h3> PCR Worksheet </h3>
					</div>
					<Row>
						<Input type="text" onChange={this.handleRunChange} label="Selected Run" />
					</Row>
					<Row>
						<ButtonInput type="submit" bsStyle="primary" block value="Save Current Layout" onClick={this.handleSave.bind(this)}/>
					</Row>
				</Grid>);
	}
}

RunHeader.propTypes = {
  runNumber: PropTypes.string.isRequired,
};