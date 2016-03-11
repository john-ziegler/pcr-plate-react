import {ReduceStore} from 'flux/utils';
import IncludedSample from '../Components/IncludedSample';
import Immutable from 'immutable';
import type {Action} from '../Actions/PCRActions';
import PCRDispatcher from '../Dispatcher/PCRDispatcher';
var PCRAppAPI = require('../Utils/PCRAppAPI');

type State = Immutable.OrderedMap<string, IncludedSample>;

class SampleStore extends ReduceStore<string, IncludedSample> {
	getInitialState(): State {
		return Immutable.OrderedMap();

	}

	reduce (state: State, action: Action): State {
		switch (action.type) {
			default:
				return state;
			case 'sample/create':
				return addSample(state, action.accession_number, action.chosen_volume, action.concentration, action.assay_type, action.patient_first_name, action.patient_last_name);
			case 'receive-all-samples':
				return addAllSamples(state, action.response);
			case 'sample/delete':
				return state.delete(action.accession_number);
			case 'sample/update':
				return state.set(action.accession_number, new IncludedSample(action.accession_number, action.chosen_volume, action.concentration, action.assay_type, action.patient_first_name, action.patient_last_name));
		}
	}
}

function addAllSamples(state: State, response: object): State {
	var samples = response.samples;
	var newMap = {};
	samples.forEach(function(sample) {
		newMap[sample.accession_number] = new IncludedSample(sample.accession_number, sample.chosen_volume, sample.concentration, sample.assay_type, sample.patient_first_name, sample.patient_last_name);
	});
	return fromJSOrdered(newMap);
}

function addSample(state: State, accession_number: string, chosen_volume: number, suggested_volume: number, concentration: number, assay_type: string, patient_first_name: string, patient_last_name: string): State {
	if(state.has(accession_number)) {
		var rpt_accession_number = _getRepeatName(state, accession_number, 1);
		console.log(rpt_accession_number);
		var newSample = new IncludedSample(rpt_accession_number, chosen_volume, concentration, assay_type, patient_first_name, patient_last_name);
		return state.set(newSample.accession_number, newSample)
	}
	var newSample = new IncludedSample(accession_number, chosen_volume, concentration, assay_type, patient_first_name, patient_last_name);
	return state.set(newSample.accession_number, newSample);
}

function fromJSOrdered(js) {
  return typeof js !== 'object' || js === null ? js :
    Array.isArray(js) ? 
      Immutable.Seq(js).map(fromJSOrdered).toList() :
      Immutable.Seq(js).map(fromJSOrdered).toOrderedMap();
}

function _getRepeatName(state, accession_number, counter) {
	if(state.has(accession_number + "rpt" + counter))
		return _getRepeatName(state, accession_number, counter + 1);
	else
		return accession_number + "rpt" + counter;
}

const instance = new SampleStore(PCRDispatcher);
export default instance;

