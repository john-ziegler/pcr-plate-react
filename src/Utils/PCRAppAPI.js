import IncludedSample from '../Components/IncludedSample';
import PlateLocation from '../Components/PlateLocation';
import Immutable from 'immutable';
import {dispatch} from '../Dispatcher/PCRDispatcher';


var request = require('superagent');

module.exports = {

	sendReqForSamplesForRun: function(run_number) {
		/** simulating a call to an api with all the samples for a given run ***
		  * in the real world could look something like this:

		   * request.get('/api/samples/RUN1234')
      	   *  .set('Accept', 'application/json')
      	   *  .end(function(err, response) {
           *	if (err) return console.error(err);

           *	dispatch({type: 'receive-all-samples', response: response.body});
      	   * });
      	*/
      	var allSamples = JSON.parse(localStorage.getItem('samples'));
      	console.log(allSamples);
      	var filteredSampleList =[]
      	allSamples.forEach(function (sample) {
      		if(sample.run_name == run_number)
      			filteredSampleList.push(sample);
      	});
      	console.log(filteredSampleList);
      	return {samples: filteredSampleList};
	},

	sendSaveAllSamples: function(sampleList, samplePositions, run_number) {

		/** simulating a call to an api to save all the samples currently on the plate ***
		  * in the real world could look something like this:

		   * request.post('/api/save_samples_for_run/'<run_number>)
		   * .send({samples: totalSampleList})
		   *	.end(function(err, response) {
           *	if (err) return console.error(err);
		   * 
           *		console.log(response.body);
      	   *	});
      	*/

		var samples = sampleList.toJS();
		var totalSampleList = [];
		for(var sample in samples) {
			totalSampleList.push({accession_number: samples[sample].accession_number, 
									concentration: samples[sample].concentration, 
									chosen_volume: samples[sample].chosen_volume, 
									suggested_volume: samples[sample].suggested_volume, 
									assay_type: samples[sample].assay_type,
									run_name: run_number,
									plate_location: samplePositions[sample]});

		}
		localStorage.clear();
    	localStorage.setItem('samples', JSON.stringify(totalSampleList));

	}
}