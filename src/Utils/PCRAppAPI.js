import IncludedSample from '../Components/IncludedSample';
import PlateLocation from '../Components/PlateLocation';
import Immutable from 'immutable';
import {dispatch} from '../Dispatcher/PCRDispatcher';


var request = require('superagent');

module.exports = {

	sendReqForSamplesForRun: function(run_number) {
		
		request.get('http://localhost:5001/samples/'+run_number)
      		.set('Accept', 'application/json')
      		.end(function(err, response) {
        		if (err) return console.error(err);

        		dispatch({type: 'receive-all-samples', response: response.body});
      		});
	},

	sendSaveAllSamples: function(sampleList, samplePositions, run_number) {

		var samples = sampleList.toJS();
		var totalSampleList = [];
		for(var sample in samples) {
			totalSampleList.push({accession_number: samples[sample].accession_number, 
									concentration: samples[sample].concentration, 
									chosen_volume: samples[sample].chosen_volume, 
									suggested_volume: samples[sample].suggested_volume, 
									assay_type: samples[sample].assay_type,
									patient_first_name: samples[sample].patient_first_name,
									patient_last_name: samples[sample].patient_last_name, 
									plate_location: samplePositions[sample]});

		}

		request.post('http://localhost:5001/save_samples_for_run/'+ run_number)
			.send({samples: totalSampleList})
			.end(function(err, response) {
        		if (err) return console.error(err);

        		console.log(response.body);
      		});
		


	}
}