const fs = require('fs');
const path = require('path');
const util = require('util');


const readDir = util.promisify(fs.readdir);
const readfile = util.promisify(fs.readFile);

const activity = require('./activity.js');
const stats= require('./stats_calculator.js');
const day = require('./imports.js'); 

//PATH NEEDS TO BE IMPORTED!!!!!!
//Date is just for testing purposes
const my_path = "C:/Users/Victor/VueJs/exemplum_meum/Exemplum_Meum/server";
const date = "12-30-2019";
// Activity class

module.exports = class dailyStats{

	//date in mm//dd/yyyy format, day in int, ex. 0 == Sun
	constructor(date, day_number)
	{
		this.daily_Activities = [];//keep trak of all read activities
		this.date = date; // get the date
		this.day = day.weekDay(day_number); // day of the week
		this.stats = new Map();
		Object.assign(this, stats.update_stats(this));//merge instantiation with with stats_calculator.js
	}

	//Returns an array with a date's list of activities
	//returns a promise, must catch with .then/.catch
	//when called to handle promise
	async get_Activities(date)
	{

		const directoryPath = path.join(my_path, date);
		let directoryFiles = await readDir(directoryPath);

		for(let f of directoryFiles)
		{
			let filePath = path.join(directoryPath, f);
			let fileData = await readfile(filePath);
			let parsed_json = await JSON.parse(fileData);
			this.daily_Activities.push(parsed_json);
		}

		return this.daily_Activities;
	}



	//return Object.assign(stats_Generator.up_stats(dailyStats)); 
}




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