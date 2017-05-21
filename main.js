const express = require('express');
const _ = require('lodash');
const statsParser = require('./parse');

// console.log(parse(2015));



/// ~ Initialize app
var app = express();

app.use(express.static('public'));

app.listen(8888, () => console.log('Server started.'));


/// ~ API Routes

app.get('/stats/:year', (req, res) => {
	res.json(statsParser({
		year: req.params.year,
		round: (req.query.group == 'round')
	}));
});
