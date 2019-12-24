const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const fs  = require('fs');


const app = express();
let count = 0;
let d = new Date();


app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
	fs.stat('stuff', (err, stats) => 
	{
		if (!err) 
		{
			console.log('file or directory exits');
		}
		else
		{
			console.log('file/directory does not exist');
			fs.mkdir('stuff', function()
			{
				
			});
			console.log('directory stuff has been made')
		}
	})
	/*let month = (d.getMonth() + 1).padStart(2, '0');
	let day = d.getDate().padStart(2, '0');
	let year = d.getFullYear();*/

	res.send({
		message: (d.getMonth() + 1) +'-'+ d.getDate() +'-' + d.getFullYear()
	})
})

app.listen(process.env.PORT || 8081);