'use strict';

import React, { Component, PropTypes } from 'react';
import { Modal, Input, Button, FormControls } from 'react-bootstrap';
import {dispatch} from '../Dispatcher/PCRDispatcher';
import {AssayColors} from '../Utils/Constants'

export default class NewSampleModal extends Component {

	constructor(props) {
		super(props);
		this.state = {accession_number: props.accession_number, chosen_volume: props.chosen_volume, suggested_volume: props.suggested_volume, concentration: props.concentration, assay_type: props.assay_type, patient_first_name: props.patient_first_name, patient_last_name: props.patient_last_name};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({accession_number: nextProps.accession_number, chosen_volume: nextProps.chosen_volume, suggested_volume: nextProps.suggested_volume, concentration: nextProps.concentration, assay_type: nextProps.assay_type, patient_first_name: nextProps.patient_first_name, patient_last_name: nextProps.patient_last_name});
	}

	closeModal() {
		dispatch({type: 'sample/close-sample-modal'});
	}

	submitChanges () {
		if(this.props.isNew) {
			
			dispatch({type: 'sample/create', accession_number: this.state.accession_number, location: this.props.location, chosen_volume: this.state.chosen_volume, concentration: this.state.concentration, assay_type:this.state.assay_type, patient_first_name: this.state.patient_first_name, patient_last_name: this.state.patient_last_name});
			
			dispatch({type: 'sample/close-sample-modal'});
		}
		else {
			dispatch({type: 'sample/update', accession_number: this.state.accession_number, chosen_volume: this.state.chosen_volume, concentration: this.state.concentration, assay_type: this.state.assay_type, patient_first_name: this.state.patient_first_name, patient_last_name: this.state.patient_last_name});
			dispatch({type: 'sample/close-sample-modal'});
		}

	}

	submitDelete () {
		dispatch({type: 'sample/delete', accession_number: this.state.accession_number});
		dispatch({type: 'sample/close-sample-modal'});
	}

	handleChosenVolChange(e) {
		var newChosenVol = Number(e.target.value);
		this.setState({chosen_volume: newChosenVol});
	}
	handleAccNumChange(e) {
		var newAccNum = e.target.value;
		this.setState({accession_number: newAccNum});
	}
	handleConcChange(e) {
		var newConc = Number(e.target.value);
		this.setState({concentration: newConc});
	}
	handleAssayChange(e) {
		var newAssay = e.target.value;
		this.setState({assay_type: newAssay});
	}
	handleFirstNameChange(e) {
		var newFirst = e.target.value;
		this.setState({patient_first_name: newFirst});
	}
	handleLastNameChange(e) {
		var newLast = e.target.value;
		this.setState({patient_last_name: newLast});
	}
	render() {
		var options = Object.keys(AssayColors)
		return <Modal show={this.props.modalIsOpen} onHide={this.closeModal}>
			<Modal.Header closeButton><h3>Edit/Add Sample: {this.state.accession_number}</h3></Modal.Header>
			<Modal.Body>
				<form className="form-horizontal">
					<Input type="text" label="Patient First Name" value={this.state.patient_first_name} onChange={this.handleFirstNameChange.bind(this)} labelClassName="col-xs-4" wrapperClassName="col-xs-6"/>
					<Input type="text" label="Patient Last Name" value={this.state.patient_last_name} onChange={this.handleLastNameChange.bind(this)} labelClassName="col-xs-4" wrapperClassName="col-xs-6"/>
					<Input type="text" label="Accession Number" value={this.state.accession_number} onChange={this.handleAccNumChange.bind(this)} labelClassName="col-xs-4" wrapperClassName="col-xs-6"/>
					<Input type="text" label="Chosen Volume" addonAfter="μL" value={this.state.chosen_volume} onChange={this.handleChosenVolChange.bind(this)} labelClassName="col-xs-4" wrapperClassName="col-xs-6"/>
					<FormControls.Static label="Suggested Volume" addonAfter="μL" value={this.state.suggested_volume} labelClassName="col-xs-4" wrapperClassName="col-xs-6"/>
					<Input type="text" label="Concetration" addonAfter="ng/μL" value={this.state.concentration} onChange={this.handleConcChange.bind(this)} labelClassName="col-xs-4" wrapperClassName="col-xs-6"/>
					<Input type="select" label="Assay Type" value={this.state.assay_type} onChange={this.handleAssayChange.bind(this)} labelClassName="col-xs-4" wrapperClassName="col-xs-6">
						<option key="---" value="">---</option>
						{options.map(function(opt) {
                  			return <option key={opt} value={opt}>{opt}</option>;
                		})}
                	</Input>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button bsStyle="primary" onClick={this.submitChanges.bind(this)}>Submit</Button>
				<Button bsStyle="warning" onClick={this.submitDelete.bind(this)}>Delete</Button>
				<Button onClick={this.closeModal}>Close</Button>
			</Modal.Footer>
		</Modal>;
	}

}

NewSampleModal.propTypes = {accession_number: React.PropTypes.string,
							 patient_first_name: React.PropTypes.string,
							 patient_last_name: React.PropTypes.string,
							 chosen_volume: React.PropTypes.number,
							 suggested_volume: React.PropTypes.number,
							 concentration: React.PropTypes.number,
							 assay_type: React.PropTypes.string,
							 location: React.PropTypes.array,
							 modalIsOpen: React.PropTypes.bool,
							 isNew: React.PropTypes.bool};