const fs = require('fs').promises;
const util = require('util');
const path = require('path');

const imports = require('./imports.js');
const activty = require('./activity.js');


module.exports = class activityLogger{

	constructor(type, duration)
	{
		this.activity = new activity(type, duration);
		this.path_to_month = path.join(imports.my_path() + "\\" + imports.months(this.activity.get_month()));
		this.path_to_date = path.join(path_to_month + "\\" + this.activity.date_created());
		this.monthly_file_created = Create_Month_Directory();
		this.daily_file_created = Create_Day_Directory(); 
	}

	async Create_Month_Directory()
	{
		try
		{
			await fs.mkdir(this.path_to_month);
		}
		catch(err)
		{
			if(err.code === 'EEXIST')
			{
				this.monthly_file_created = true;
			}
		}

		this,monthly_file_created = false;


	}

	async Update_Monthly_Stat()
	{
		if (this.monthly_file_created)
		{
		}
		else
		{
			//update monthly stats
			fs.writeFile(this.path_to_month + "\\" + "Total_Sums", JSON.stringify(this.activity.get_activity_duration()));
		}
	}

	async Create_Day_Directory()
	{
		try
		{
			await fs.mkdir(this.path_to_date);
		}
		catch(err)
		{
			//returns if the directory is already created
			if(err.code === 'EEXIST')
			{
				this.daily_file_created = true;
			}
		}

		this.daily_file_created = false;
	}

	async Update_Daily_Stat()
	{
		if(this.daily_file_created)
		{

		}
		else
		{
			fs.writeFile(this.path_to_date + "\\" + "Total_Sums", JSON.stringify(this.activity.get_activity_duration()));	
		}
	}
	

	/*async write_Activity()
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
	
	}*/

	//creates a directory for holding daily activities
	/*async create_daily_directory(a_path)
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
	}*/

	//creates a directory for the month containing the daily directories
	/*async create_monthly_directory()
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
	}*/
}

