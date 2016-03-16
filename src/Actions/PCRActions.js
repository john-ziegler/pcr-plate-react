'use strict';

export type Action = 
	{
		type: 'sample/move',
		accession_number: string,
		location: array
	} |
	{
		type: 'sample/create',
		accession_number: string,
		location: array,
		chosen_volume: number,
		assay_type: string,
	} |
	{
		type: 'sample/delete',
		accession_number: string,
	} |
	{ 
		type: 'sample/update',
		accession_number: string,
		chosen_volume: number,
		assay_type: string,
		concentration: number,	
	} |
	{
		type: 'sample/open-sample-modal',
		xLoc: number,
		yLoc: number,
	} |
	{
		type: 'sample/close-sample-modal',
	} |
	{
		type: 'run/change-run',
		run_number: string,
	} |
	{
		type: 'run/save-all',
		run_number: string,
	} |
	{
		type: 'receive-all-samples',
		response: object,
	};

