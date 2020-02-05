const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs  = require('fs');
const activity  = require('../stats_class/activity');
const stats = require('../stats_class/dailyStats');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
//for testing purposes
	let minutes = [10, 20, 30, 40, 50, 60, 70];
	let activities = ['running', 'sleeping', 'eating', 'programming', 'napping', 'lifting', 'reading', 'cleaning'];
	let min_count = 0;
	let act_count = 0;

	let curr_act = new activity(activity[act_count++], minutes[min_count++])
	//curr_act.write_Activity()


	if (min_count === 6) { min_count = 0};
	if (act_count === 7) { act_count = 0};

	res.send({ message: {$curr_act})
})

app.post('/astroserver', (req, res) => {

	let curr_act = new activity(req.body.activity, req.body.duration);
})

app.listen(process.env.PORT || 8081);