
module.exports = {

  init: function() {
    localStorage.clear();
    localStorage.setItem('samples', JSON.stringify([
      {
        accession_number: 'sample_1',
        assay_type: 'assay_1',
        chosen_volume: 4,
        concentration: 10,
        plate_location: [0,0],
        run_name: "run_1"
      },
      {
        accession_number: 'sample_2',
        assay_type: 'assay_1',
        chosen_volume: 4,
        concentration: 10,
        plate_location: [0,1],
        run_name: "run_1"
      },
      {
        accession_number: 'sample_3',
        assay_type: 'assay_1',
        chosen_volume: 4,
        concentration: 10,
        plate_location: [0,2],
        run_name: "run_1"
      },
      {
        accession_number: 'sample_4',
        assay_type: 'assay_1',
        chosen_volume: 4,
        concentration: 10,
        plate_location: [0,3],
        run_name: "run_1"
      },
      {
        accession_number: 'sample_5',
        assay_type: 'assay_1',
        chosen_volume: 4,
        concentration: 10,
        plate_location: [0,4],
        run_name: "run_1"
      },
      {
        accession_number: 'sample_6',
        assay_type: 'assay_1',
        chosen_volume: 4,
        concentration: 10,
        plate_location: [0,5],
        run_name: "run_1"
      },
      {
        accession_number: 'sample_7',
        assay_type: 'assay_1',
        chosen_volume: 4,
        concentration: 10,
        plate_location: [0,6],
        run_name: "run_1"
      },
      {
        accession_number: 'control_1',
        assay_type: 'control',
        chosen_volume: 4,
        concentration: 10,
        plate_location: [2,0],
        run_name: "run_1"
      },
      {
        accession_number: 'control_2',
        assay_type: 'control',
        chosen_volume: 4,
        concentration: 10,
        plate_location: [2,1],
        run_name: "run_1"
      },
    ]));
  }

};