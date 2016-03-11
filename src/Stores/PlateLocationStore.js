import {MapStore} from 'flux/utils';
import PlateLocation from '../Components/PlateLocation';
import Immutable from 'immutable';
import type {Action} from '../Actions/PCRActions';
import PCRDispatcher from '../Dispatcher/PCRDispatcher';
var PCRAppAPI = require('../Utils/PCRAppAPI');

type State = Immutable.Map<string, PlateLocation>;

class PlateLocationStore extends MapStore<string, PlateLocation> {
	getInitialState(): State {
		return Immutable.Map();
	}

	reduce (state: State, action: Action): State {
		switch (action.type) {
			case 'sample/move':
				return state.setIn([action.accession_number, 'location'], action.location); 
			case 'sample/create':
				return addSample(state, action.accession_number, action.location);
			case 'sample/delete':
				return state.delete(action.accession_number);
			case 'receive-all-samples':
				return loadAllPositions(state, action.response);
			default:
				return state;
		
		}
	}
}

function addSample(state: State, accession_number: string, location: array): State {
	if(state.has(accession_number)) {
		var rpt_accession_number = _getRepeatName(state, accession_number, 1);
		var newPlateLocation = new PlateLocation(rpt_accession_number, location);
		return state.set(newPlateLocation.accession_number, newPlateLocation)
	}
	var newPlateLocation = new PlateLocation(accession_number, location);
	return state.set(newPlateLocation.accession_number, newPlateLocation);
}


function loadAllPositions(state: State, response: object): State {
	var samples = response.samples;
	var newMap = {};
	var i = 0;

	samples.forEach(function (sample) {
		if(sample.plate_location.length == 2){
			newMap[sample.accession_number] = new PlateLocation(sample.accession_number, sample.plate_location)
		}
		else {
			var y = i % 12;
			var x = Math.floor(i / 12);
			newMap[sample.accession_number] = new PlateLocation(sample.accession_number, [x, y]);
			i = i + 1;
		}
	});
	return Immutable.Map(newMap);
}

function _getRepeatName(state, accession_number, counter) {
	if(state.has(accession_number + "rpt" + counter))
		return _getRepeatName(state, accession_number, counter + 1);
	else
		return accession_number + "rpt" + counter;
}

const instance = new PlateLocationStore(PCRDispatcher);
export default instance;

