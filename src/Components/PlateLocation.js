'use strict';

import Immutable from 'immutable';

const PlateLocationRecord = Immutable.Record({
	accession_number: undefined,
	location: undefined,
});

export default class PlateLocation extends PlateLocationRecord {
	accession_number: string;
	location: array;

	constructor(accession_number: string, location: array) {
		super({
			accession_number, 
			location,
		});
	}
}