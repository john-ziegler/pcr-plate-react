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
				PCRAppAPI.sendReqForSamplesForRun(action.run_number);
				return action.run_number;
			default:
				return state;
		}
	}
}


const instance = new RunStore(PCRDispatcher);
export default instance;

