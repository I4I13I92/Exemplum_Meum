//Need to fix!!
//handle unresolved promises
//concantination int conversion after reading from file server
const fs = require('fs');
const path = require('path');
const util = require('util');


const readDir = util.promisify(fs.readdir);
const readfile = util.promisify(fs.readFile);

const activity = require('./activity.js');
const stats = require('./stats_calculator.js');
const imports = require('./imports.js');//need to name better, imports isnt that great of a name 

// Activity class
module.exports = class dailyStats{

	//date in mm//dd/yyyy format, day in int, ex. 0 == Sun, 1 == Mon, etc..
	constructor(date, day_number)
	{
		this.minutes = 1440; //minutes in day, for calculation purposes
		this.Activities = [];//keep trak of all read activity objects
		this.date = date; // get the date
		this.day = imports.weekDay(day_number); // day of the week
		this.activity_minutes = new Map();//keep track of minutes for logged events by activty type
		this.activity_stats = []//keep track of percantages for activities of a day
		Object.assign(this, stats.get_Stats(this), stats.get_obj(this));//merge instantiation with stats_calculator.js
	}

	//Returns an array with a date's list of activities
	//returns a promise, must catch with .then/.catch
	//when called to handle promise
	async get_Activities()
	{

		const directoryPath = path.join(imports.my_path(), this.date);
		let directoryFiles = await readDir(directoryPath);

		for(let f = 0; f < directoryFiles.length - 1; f++)
		{
			let filePath = path.join(directoryPath, directoryFiles[f]);
			let fileData = await readfile(filePath);
			let parsed_json = await JSON.parse(fileData);
			this.Activities.push(parsed_json);
		}
	}

	async set_activity_minutes()
	{
		//get the Activities from the specific date provided in the constructor
		//await this.get_Activities();

		//return if no activties logged	
		if (this.Activities.length == 0)
		{
			return null;
		}
		
		for(let i = 0; i < this.Activities.length; i++)
		{
			//check to see if the current activity has already been logged into the map
			if(this.activity_minutes.has(this.Activities[i].type))
			{
				//take the current amount of time for a specific activity and add the new but same type activitie's minutes
				//to the current amount
				let activity_total_time = this.activity_minutes.get(this.Activities[i].type) + this.Activities[i].duration;//need to convert this into an int, getting string
				this.activity_minutes.set(this.Activities[i].type, activity_total_time);
			}
			else
			{
				this.activity_minutes.set(this.Activities[i].type, this.Activities[i].duration);
			}
		}
	}

	async set_stats()
	{
		await this.get_Activities();
		await this.set_activity_minutes();
		this.det_stats();
	}
}

//update stats tester
