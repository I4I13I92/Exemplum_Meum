const fs = require('fs').promises;
const util = require('util');
const path = require('path');


//const writeFile = util.promisify(fs.writeFile);
//const mkdir = util.promisify(fs.mkdir);
//const exists = util.promisify(fs.exists);

const imports = require('./imports.js');
const stats = require('./stats_calculator.js');

// Activity class
module.exports = class activity{

	static count = 1;
	
	//class constructor, mostly defined by Date object upon instantiating time
	//gets type from user/front-end
	constructor(type, duration){

		this.id = activity.count++;
		this.type = type;
		this.duration = duration;
		this.today_date = new Date();
		this.month = this.today_date.getMonth() + 1;
		this.day = this.today_date.getDay();
		this.date = this.today_date.getDate();
		this.year = this.today_date.getFullYear();
	}

	//set the event type based on the user's input
	set_type(event_type)
	{
		this.type = event_type;
	}

	get_type()
	{
		return `${this.type}`;
	}

	//set duration of activity logged in by user
	set_duration(duration)
	{
		this.duration = duration;
	}

	get_duration()
	{
		return Nummber(this.duration);
	}

	//print info on specific event
	print_Info() 
	{	
		console.log(`You spent ${this.duration} minute(s) ${this.type} on ${this.month}-${this.date}-${this.year}.`);
	}

	//return the date of the event based on when the object is created in mm/dd/yyyy format
	date_created()
	{
		return `${this.month}-${this.date}-${this.year}`;
	}

	//return id
	get_Id()
	{
		return `${this.id}`;
	}

	get_day()
	{
		return `${this.day}`;
	}

	get_Month()
	{
		return `${this.month}`;
	}

	get_activty_duration()
	{
		return {activity: `${this.type}`, duration: `${this.duration}`};
	}


	


