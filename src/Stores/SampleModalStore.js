import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import type {Action} from '../Actions/PCRActions';
import PCRDispatcher from '../Dispatcher/PCRDispatcher';


class SampleModalStore extends ReduceStore<boolean> {
	getInitialState(): string {
		return false;

	}

	reduce (state: boolean, action: Action): boolean {
		switch (action.type) {
			case 'sample/open-sample-modal':
				return true;
			case 'sample/close-sample-modal':
				return false;
			default:
				return state;
		}
	}
}


const instance = new SampleModalStore(PCRDispatcher);
export default instance;

