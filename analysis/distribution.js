var _ = require('lodash');
var ss = require('simple-statistics');


/// ~ Export

module.exports = function (games) {
	// Group games by point differential
	var differential = _.map(games, (result) => {
		return Math.abs(result.PTS - result.OPTS);
	});

	var distribution = _.reduce(_.groupBy(differential, _.identity), (total, items, value) => {
		total[value] = items.length;
		return total;
	}, {});


	return {
		'ptsDiffDistribution': distribution,
		'ptsDiffQuartile': ss.quantile(differential, [0, 0.25, 0.5, 0.75, 1])
	};
};