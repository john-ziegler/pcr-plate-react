import type Immutable from 'immutable';
import type {Store} from 'flux/utils';
import type IncludedSample from './IncludedSample';
import type PlateLocation from './PlateLocation';
import NewSampleModal from './NewSampleModal';
import {Container} from 'flux/utils';
import Plate from './Plate';
import React, {Component} from 'react';
import SampleStore from '../Stores/SampleStore';
import PlateLocationStore from '../Stores/PlateLocationStore';
import RunStore from '../Stores/RunStore';
import SampleModalStore from '../Stores/SampleModalStore';
import SampleEditingStore from '../Stores/SampleEditingStore';
import RunHeader from './RunHeader';
import {dispatch} from '../Dispatcher/PCRDispatcher'

type State = {
	samples: Immutable.Map<string, IncludedSample>;
	locations: Immutable.Map<string, PlateLocation>;
	runNumber: string;
	isModalOpen: boolean;
	editingObject: Immutable.map<string, EditingSample>;
};

class PCRApp extends Component<{}, {}, State> {
	static getStores(): Array<Store> {
		return [SampleStore, PlateLocationStore, RunStore, SampleModalStore, SampleEditingStore];
	}

	static calculateState(prevState: ?State): State {
		return {
			samples: SampleStore.getState(),
			locations: PlateLocationStore.getState(),
			runNumber: RunStore.getState(),
			isModalOpen: SampleModalStore.getState(),
			editingLocation: SampleEditingStore.getState(),
		};
	}

	render(): ?ReactElement {
		var samplePositions = {};
		var editingSample = {};
		var sampleList = this.state.samples;
		var isNew = true;
	
		var samplePosJS = this.state.locations.toJS();
		for(var key in samplePosJS){
			samplePositions[key] = samplePosJS[key].location;
			var locationX = samplePosJS[key].location[0];
			var locationY = samplePosJS[key].location[1];
			if(this.state.editingLocation[0] == locationX && this.state.editingLocation[1] == locationY)
			{
				isNew = false;
				var sample = sampleList.get(key);
				console.log(sample);
				editingSample = { accession_number: key, concentration: sample.get('concentration'), chosen_volume: sample.get('chosen_volume'), suggested_volume: sample.get('suggested_volume'), assay_type: sample.get('assay_type'), patient_first_name: sample.get('patient_first_name'), patient_last_name: sample.get('patient_last_name')};
				console.log(editingSample);
			}
		}
		

		return (<div>
					<RunHeader runNumber={this.state.runNumber} samplePositions={samplePositions} sampleList={this.state.samples}/>
					<Plate samplePositions = {samplePositions} sampleList={this.state.samples} />
					<NewSampleModal accession_number={editingSample.accession_number} 
							chosen_volume={editingSample.chosen_volume} suggested_volume={editingSample.suggested_volume} location={this.state.editingLocation}
							concentration={editingSample.concentration} assay_type={editingSample.assay_type} isNew={isNew} modalIsOpen={this.state.isModalOpen} patient_first_name={editingSample.patient_first_name} patient_last_name={editingSample.patient_last_name} />
				</div>);
	}
}

const PCRAppContainer = Container.create(PCRApp);
export default PCRAppContainer;