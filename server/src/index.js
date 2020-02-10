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
	let minutes = [10, 20, 30, 40, 50, 60, 70];

	let count = 0;
	count = counter(count);

	let min = minutes[count];


	let curr_act = new activity(req.params.act, min)
	curr_act.write_Activity()
	//console.log(typeof(min));


	res.send({ message: curr_act })
})

app.post('/astroserver', (req, res) => {

	let curr_act = new activity(req.body.activity, req.body.duration);
})

app.listen(process.env.PORT || 8081);


function counter(num)
{
	if(num === 6)
	{
		num = 0;
		return num;
	}
	else
	{
		num++;
		return num;
	}
}