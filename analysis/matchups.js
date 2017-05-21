var _ = require('lodash');
var ss = require('simple-statistics');


/// ~ Export

module.exports = function (games) {
	// Group games by point differential
	var differential = _.groupBy(games, getMatchup);

	console.log(Object.keys(differential));

	var matchups = _.reduce(differential, (total, group, matchup) => {
		total[matchup] = _.map(group, (game) => {
			// true if home team name is alphabetically before away team name
			var homeFirst = (game.Home < game.Away);
			return {
				home: game.Home,
				away: game.Away,
				result: [game.PTS, game.OPTS],
				order: matchup.split(' - '),
				diff: homeFirst ? (game.PTS - game.OPTS) : (game.OPTS - game.PTS)
			}
		}).reverse();

		return total;
	}, {});

	console.log(matchups);

	return {
		matchups: matchups
	};
};

function getMatchup(game) {
	return [game.Home, game.Away].sort().join(' - ');
}
