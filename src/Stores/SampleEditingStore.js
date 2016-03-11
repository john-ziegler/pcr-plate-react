import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import type {Action} from '../Actions/PCRActions';
import PCRDispatcher from '../Dispatcher/PCRDispatcher';
var PCRAppAPI = require('../Utils/PCRAppAPI');



class SampleEditingStore extends ReduceStore<array> {
	getInitialState(): object {
		return [undefined, undefined];

	}

	reduce (state: array, action: Action): array {
		switch (action.type) {
			case 'sample/open-sample-modal':
				return [action.xLoc, action.yLoc];
			default:
				return state;
		}
	}
}


const instance = new SampleEditingStore(PCRDispatcher);
export default instance;
