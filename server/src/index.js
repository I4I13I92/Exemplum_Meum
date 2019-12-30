const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs  = require('fs');
const activity  = require('../activity');


const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
	res.send({ mesasge: `Hello World`})
})

app.post('/astroserver', (req, res) => {

	let curr_act = new activity(req.body.activity, req.body.duration);
	console.log(JSON.stringify(curr_act));


	fs.stat(curr_act.date_created(), (err, stats) => 
	{
		//check if current foloder exists, if true, write file containing data
		if (!err) 
		{
			console.log('file or directory exits');
			fs.writeFile(curr_act.date_created() + '/'+ curr_act.get_Id(), JSON.stringify(curr_act), (err) =>
			{
				if (err) throw err;
				console.log(JSON.stringify(curr_act));
				console.log("Object has been logged")
			})
		}
		else
		{
			//create directory if it doesnt exist, using today's date as a name
			console.log('file/directory does not exist');
			fs.mkdir(curr_act.date_created(), function()
			{
				fs.writeFile(curr_act.date_created() + '/'+ curr_act.get_Id(), JSON.stringify(curr_act), (err) =>
				{
					if (err) throw err;
					console.log('Saved');
				})

			});
			console.log("Directory has been created and object has been logged");
		}
	})
	res.send({curr_act});
})

app.listen(process.env.PORT || 8081);