var _ = require('lodash');
var ss = require('simple-statistics');


const blowoutThreshold = 15;
const buzzerBeaterThreshold = 5;

/// ~ Export

module.exports = function (games) {
	// Calculate point differential for each game
	var blowouts = _.filter(games, (result) => {
		return Math.abs(result.PTS - result.OPTS) > blowoutThreshold;
	}).length;

	var close = _.filter(games, (result) => {
		return Math.abs(result.PTS - result.OPTS) < buzzerBeaterThreshold;
	}).length;


	return {
		'gameCount': games.length,
		'close': close,
		'blowouts': blowouts
	};
};