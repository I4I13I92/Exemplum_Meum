const fs = require('fs').promises;
const util = require('util');
const path = require('path');

//const writeFile = util.promisify(fs.writeFile);
//const mkdir = util.promisify(fs.mkdir);
//const exists = util.promisify(fs.exists);

const imports = require('./imports.js');

// Activity class
module.exports = class activity{

	static count = 0;
	
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

	async write_Activity()
	{
		//create the path where daily activities will be stored
		let path_to_folder = path.join(imports.my_path() + "\\"+ this.date_created());
		await this.create_directory(path_to_folder);
		console.log(path_to_folder + '\\' + this.id);

		await fs.writeFile(path_to_folder + '\\' + this.id, JSON.stringify(this));
		//check to see if the folder exists, ex. my_path + date
		/*let dir_created = await fs.access(path_to_folder);
		
		if(dir_created)
		{
			console.log("created already");

			try
			{
				await fs.writeFile(path_to_folder, JSON.stringify(this));
			} catch(err){console.log(err)}
		}
		else
		{
			console.log("not created");
			try
			{
				await fs.mkdir(path_to_folder);
			} catch(err){console.log(err)}

			/*try
			{
				await fs.writeFile(path_to_folder + '\\', JSON.stringify(this));
			} catch(err){console.error(err)}

			console.log("created folder and logged activity too!");
		}*/
		/*console.log(dir_exists);
		console.log('Before write function');
		await writeFile(server_path() + , JSON.stringify(this));
		console.log('After write function');*/
	}

	async create_directory(a_path)
	{
		//make the directory
		try
		{
			await fs.mkdir(a_path);
		}
		catch(err)
		{
			//returns false if the directory is already created
			if(err.code === 'EEXIST')
			{
				console.error(err);
			}
		}
	}
}


