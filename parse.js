var fs = require('fs');
var _ = require('lodash');
var requiredir = require('requiredir');


/// ~ Constants
const inputTemplate = _.template('./output/${year}.json');
const outputTemplate = _.template('./output/${year}-${round}-analysis.json');


/// ~ Inputs
module.exports = function (config) {
	// Playoff year to pull stats for
	var year = config.year;
	// true to group by round
	var round = config.round;
	// true to group by home/away
	var home = config.home;

	/// ~ Load file
	var inputFile = inputTemplate({ 'year': year });
	var outputFile = outputTemplate({ 'year': year, 'round': (round || 'all') });


	console.log('Loading year:', year);

	var games = JSON.parse(fs.readFileSync(inputFile, { encoding: 'utf8' }));

	var analyzers = requiredir('./analysis').toArray();


	if (round) {
		// Group games into rounds
		// Rounds are 1, 2 (conf semis), 3 (conf finals), 4 (finals)

		var rounds = parseRounds(games);
		var grouped = _.groupBy(games, getMatchup);

		// TODO: clean up this garbage
		var groups = _.reduce(grouped, function (result, games, matchup) {
			// Reverse rounds so that finals are the last item in the array
			var round = 3 - rounds[matchup];
			if (!result[round]) {
				result[round] = [];
			}

			result[round] = result[round].concat(games);
			return result;
		}, []);

		// Pass groups into analyzers instead of games
		return _.map(groups, function (round, index) {
			return _.reduce(analyzers, (curr, fn) => {
				return _.extend(curr, fn(round));
			}, { year: year, round: (index+1) });
		});
	}


	/// TODO: do stuff with rounds + home/away
	///

	// Combine resulting output from analyzers
	var output = _.reduce(analyzers, (curr, fn) => {
		return _.extend(curr, fn(games));
	}, { year: year });

	// fs.writeFile(outputFile, JSON.stringify(output));

	// console.log(output);

	return output;
};


// --------------------------------------------------------

function parseRounds(games) {
	var matchups = {};

	games.reduce(function (round, game) {
		var match = getMatchup(game);
		var totalMatchups = Math.pow(2, round);

		if (!(match in matchups)) {
			// Find how many we've seen in this round
			var count = _.values(matchups).filter(function (r) { return r == round; }).length;
			if (count < totalMatchups) {
				matchups[match] = round;
			}
			else {
				matchups[match] = (++round);
			}
		}

		return round;
	}, 0);

	return matchups;
}

// Get compacy, unique name for a series matchup
function getMatchup(game) {
	return [game.Home, game.Away].sort().join('');
}
