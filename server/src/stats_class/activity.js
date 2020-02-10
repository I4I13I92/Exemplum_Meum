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
		Object.assign(this, stats.up_Day_Stats(this), stats.up_Mon_Stats(this));
	}

	//set the event type based on the user's input
	set_type(event_type)
	{
		this.type = event_type;
	}

	//set duration of activity logged in by user
	set_duration(duration)
	{
		this.duration = duration;
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

	async write_Activity()
	{
		//where monthly stat file will be created
		//await fs.writeFile(await this.create_monthly_directory() + "\\" + 'Total_Sums', JSON.stringify(''));
		//create the path where daily activities will be stored

		if(await this.create_monthly_directory() != false)
		{
			await this.update_monthly_stats(await this.create_monthly_directory());
		}

		let path_to_day_folder = path.join(await this.create_monthly_directory() + "\\"+ this.date_created());
		
		await this.create_daily_directory(path_to_day_folder);
		await fs.writeFile(path_to_day_folder + '\\' + this.id, JSON.stringify(this));

		//update daily stats
		if (this.id === 1) 
		{
			let stats_setter = {}
			stats_setter[this.type] = this.duration;
			await fs.writeFile(path_to_day_folder + '\\' + 'Total_Sums', JSON.stringify(stats_setter));
			console.log("Just logged the first activity of the day:" + " " + this.type);
		}
		//log first activity of day to keep track of all daily minutes as its own seperate file

		await this.update_day_stats(path_to_day_folder, this.date_created());
		console.log("Updated activity stats:" + " " + this.type);
	
	}

	//creates a directory for holding daily activities
	async create_daily_directory(a_path)
	{
		//create the directory
		try
		{
			await fs.mkdir(a_path);
		}
		catch(err)
		{
			//returns if the directory is already created
			if(err.code === 'EEXIST')
			{
				null;
			}
		}
	}

	//creates a directory for the month containing the daily directories
	async create_monthly_directory()
	{
		let path_of_folder = path.join(imports.my_path() + "\\" + imports.months(this.month));
		console.log(path_of_folder);

		try
		{
			await fs.mkdir(path_of_folder);
		}
		catch(err)
		{
			if(err.code === 'EEXIST')
			{
				return path_of_folder;
			}
		}

		return false;
	}
}


