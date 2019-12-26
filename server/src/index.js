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

app.get('/', (req, res) =>{

	let act = new activity('sleeping', 45);

	fs.stat(act.date_created(), (err, stats) => 
	{
		//check if current foloder exists, if true, write file containing data
		if (!err) 
		{
			console.log('file or directory exits');
			fs.writeFile(act.date_created() + '/'+ act.get_Id(), JSON.stringify(act), (err) =>
			{
				if (err) throw err;
				console.log('Saved');
			})
		}
		else
		{
			//create directory if it doesnt exist, using today's date as a name
			console.log('file/directory does not exist');
			fs.mkdir(act.date_created(), function()
			{
				fs.writeFile(act.date_created() + '/'+ act.get_Id(), JSON.stringify(act), (err) =>
				{
					if (err) throw err;
					console.log('Saved');
				})

			});
			console.log('directory stuff has been made');
		}
	})
	res.send({
		message: act.print_Info() +" " + act.get_Id()
	})
})

app.listen(process.env.PORT || 8081);