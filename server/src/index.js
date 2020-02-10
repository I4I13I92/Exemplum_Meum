const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs  = require('fs');
const activity  = require("C:/Users/Victor/VueJs/exemplum_meum/Exemplum_Meum/server/src/stats_class/activity");
const stats = require("C:/Users/Victor/VueJs/exemplum_meum/Exemplum_Meum/server/src/stats_class/dailyStats");

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/a/:act', (req, res) => {
//for testing purposes

	let curr_act = new activity(req.params.act, 10)
	curr_act.write_Activity()

	res.send({ message: curr_act })
})

app.post('/astroserver', (req, res) => {

	let curr_act = new activity(req.body.activity, req.body.duration);
})

app.listen(process.env.PORT || 8081);
