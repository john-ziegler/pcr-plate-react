import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import type {Action} from '../Actions/PCRActions';
import PCRDispatcher from '../Dispatcher/PCRDispatcher';
var PCRAppAPI = require('../Utils/PCRAppAPI');


class RunStore extends ReduceStore<string> {
	getInitialState(): string {
		return "";

	}

	reduce (state: string, action: Action): string {
		switch (action.type) {
			case 'run/change-run':
				/* ***Note*** 
				 * This is where we would send the request back to our API, Ex:
				 * PCRAppAPI.sendReqForSamplesForRun(action.run_number);
				 * Then the other stores would wait for a 'receive successful response' action to update
				 * Instead just to demo the application, I return run number here and subscribe to the same
				 * action in the other stores to update
				 */
				return action.run_number;
			default:
				return state;
		}
	}
}


const instance = new RunStore(PCRDispatcher);
export default instance;

