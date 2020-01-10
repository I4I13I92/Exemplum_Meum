const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs  = require('fs');
const activity  = require('../stats_class/activity');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send({ mesasge: `Hello World`})
})

app.post('/astroserver', (req, res) => {

	let curr_act = new activity(req.body.activity, req.body.duration);
})

app.listen(process.env.PORT || 8081);