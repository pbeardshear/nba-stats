var _ = require('lodash');
var ss = require('simple-statistics');

/// ~ Export

module.exports = function (games) {
	// Calculate point differential for each game
	var homeDifferential = _.map(games, (result) => {
		return result.PTS - result.OPTS;
	});

	var differential = _.map(homeDifferential, diff => {
		return Math.abs(diff);
	});

	return {
		'ptsDiffHome': homeDifferential,
		'ptsDiffRaw': differential,
		'ptsDiffTotal': ss.sum(differential),
		'ptsDiffAvg': ss.mean(differential),
		'ptsDiffMedian': ss.median(differential),
		'ptsDiffStdDev': ss.sampleStandardDeviation(differential),
		'ptsDiffMin': ss.min(differential),
		'ptsDiffMax': ss.max(differential)
	};
};