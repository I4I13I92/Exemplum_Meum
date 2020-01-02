//const activity = require('./activity.js'); 
const fs = require('fs');
const path = require('path');
const util = require('util');
// Activity class

/*module.exports = class dailyStats{

	static daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	//date in mm//dd/yyyy format, day in int, ex. 0 == Sun
	constructor(date, day)
	{
		this.dailyActivities = [];//keep trak of all read activities
		this.date = date; // get the date
		this.day = daysOfWeek[day]; // day of the week
		this.stats = new Map();
	}


	get_Activities()
	{

	}

	Log_Daily_Stats()
	{

	}

	Print_Daily_Info()
	{

	}
}*/

const readFile = util.promisify(fs.readFile);
readFile("C:/Users/Victor/VueJs/exemplum_meum/Exemplum_Meum/server/12-30-2019/5")
	.then(file => console.log(JSON.parse(file)))
	.catch(err => 
	{
		console.log(err);
	});

//read data from server
/*
const my_path = "C:/Users/Victor/VueJs/exemplum_meum/Exemplum_Meum/server";
let date = "12-30-2019";

const directoryPath = path.join(my_path,date);


fs.readdir(directoryPath, (err, files) => {

	console.log(directoryPath)
	
	if(err)
	{
		return console.log("Unable to read directory");
	}

	files.forEach((file) => {

		if(err)
		{
			return console.log("no activities for the day: " + err)
		}

		else
		{
			let filePath = path.join(directoryPath, file);
			fs.readFile(filePath, (err2, fileData) => {

				if(err2)
				{
					console.log(err2);
				}

				else
				{
					console.log(JSON.parse(fileData));
				}
			})
		}
	})
})*/


//update stats tester
/*let items  = new Map();


items.set('car', 4);
items.set('house', 6);
items.set('pet', 3);
items.set('property', 9);
items.set('debt', 0);
items.set('life', 1);

let min_to_add = 5;

//update value(minutes) asoociated with given key(activity) if contained
//if not insert new key with value
if(items.has('mansion'))
{
	x += items.get('car');
	items.set('car', x);
	console.log(items.get('car'));
}
else
{
	console.log('Does not currently have mansion(s)');
	items.set('mansion', 2);
	console.log(items.get('mansion'));
}*/






//write object to file server/create directory
/*fs.stat(curr_act.date_created(), (err, stats) => 
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
	})*/