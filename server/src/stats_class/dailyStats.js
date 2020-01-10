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

	//date in mm//dd/yyyy format, day in int, ex. 0 == Sun
	constructor(date, day_number)
	{
		this.minutes = 1440; //minutes in day, for calculation purposes
		this.Activities = [];//keep trak of all read activity objects
		this.date = date; // get the date
		this.day = imports.weekDay(day_number); // day of the week
		this.activity_minutes = new Map();//keep track of minutes for logged events by activty type
		this.activity_stats = []//keep track of percantages for activities of a day
		Object.assign(this, stats.get_Stats(this));//merge instantiation with stats_calculator.js
	}

	//Returns an array with a date's list of activities
	//returns a promise, must catch with .then/.catch
	//when called to handle promise
	async get_Activities()
	{

		const directoryPath = path.join(imports.my_path(), this.date);
		let directoryFiles = await readDir(directoryPath);

		for(let f of directoryFiles)
		{
			let filePath = path.join(directoryPath, f);
			let fileData = await readfile(filePath);
			let parsed_json = await JSON.parse(fileData);
			this.Activities.push(parsed_json);
		}
	}

	async set_activity_minutes()
	{
		//get the Activities from the specific date provided in the constructor
		await this.get_Activities();

		//return if no activties logged	
		if (this.Activities.length == 0)
		{
			console.log('No activities.');
			return null;
		}
		else
		{
			console.log("Adding up the minutes by activity.");
		}
		
		for(let i = 0; i < this.Activities.length; i++)
		{
			//check to see if the current activity has already been logged into the map
			if(this.activity_minutes.has(this.Activities[i].type))
			{
				//take the current amount of time for a specific activity and add the new but same type activitie's minutes
				//to the current amount
				console.log("Increased a logged activities' minutes");
				let activity_total_time = this.activity_minutes.get(this.Activities[i].type) + this.Activities[i].duration;
				this.activity_minutes.set(this.Activities[i].type, activity_total_time);
			}
			else
			{
				console.log("Logged a new activities' minutes");
				this.activity_minutes.set(this.Activities[i].type, this.Activities[i].duration);
			}
		}
	}
}

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