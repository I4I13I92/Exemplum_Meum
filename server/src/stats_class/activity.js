const fs = require('fs').promises;
const util = require('util');
const path = require('path');

//const writeFile = util.promisify(fs.writeFile);
//const mkdir = util.promisify(fs.mkdir);
//const exists = util.promisify(fs.exists);

const imports = require('./imports.js');

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
		//create the path where daily activities will be stored
		let path_to_folder = path.join(imports.my_path() + "\\"+ this.date_created());
		await this.create_directory(path_to_folder);
		console.log(path_to_folder + '\\' + this.id);

		await fs.writeFile(path_to_folder + '\\' + this.id, JSON.stringify(this));

		//log first activity of day to keep track of all daily minutes as its own seperate file
		if (this.id === 1) 
		{
			let stats_setter = {}
			stats_setter[this.type] = this.duration;
			await fs.writeFile(path_to_folder + '\\' + 'activity_sums', JSON.stringify(stats_setter));
		}
	}

	async create_directory(a_path)
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
				return;
			}
		}
	}

	async (a_path)
	{

	}
}


