'use strict'

import Immutable from 'immutable';

const SampleRecord = Immutable.Record({
	accession_number: "M0",
	chosen_volume: 0,
	suggested_volume: 0,
	concentration: 0,
	assay_type: "NONE",
	patient_first_name: "",
	patient_last_name: "",
});

export default class IncludedSample extends SampleRecord {
	accession_number: string;
	chosen_volume: number;
	concentration: number;
	assay_type: string;
	patient_first_name: string;
	patient_last_name: string;

	constructor(acc_number: string, chosen_vol: number, conc: number, assay: string, patient_first_name, patient_last_name) {
		super({
			accession_number: acc_number, 
			chosen_volume: chosen_vol,
			suggested_volume: 150/chosen_vol,
			concentration: conc,
			assay_type: assay,
			patient_first_name: patient_first_name,
			patient_last_name: patient_last_name,
		});
	}
}