var fs = require('fs');

/// ~ CSV => JSON
var Converter = require('csvtojson').Converter;


/// ~ Load CSV files, convert into JSON
var csvFiles = fs.readdirSync('export');

csvFiles.forEach(function (file) {
	console.log('Loading file:', file);

	var converter = new Converter({
		// First row of data is header
		noheader: true,
		headers: [
			'Rank', 'Date', 'Home', 'Away', 'Result','MP',
			'FG', 'FGA', 'FG%', '2P', '2PA', '2P%', '3P', '3PA', '3P%', 'FT', 'FTA', 'FT%', 'PTS', 
			'OFG', 'OFGA', 'OFG%', 'O2P', 'O2PA', 'O2P%', 'O3P', 'O3PA', 'O3P%', 'OFT', 'OFTA', 'OFT%', 'OPTS'
		]
	});

	// Skip if converted file already exists
	converter.fromFile('./export/' + file, (err, result) => {
		if (result) {
			var convertedFileName = file.replace('.csv', '.json');

			fs.writeFile('./output/' + convertedFileName, JSON.stringify(result), (err) => {
				if (!err) { console.log('Saved file:', convertedFileName); }
			});
		}
	});
});
