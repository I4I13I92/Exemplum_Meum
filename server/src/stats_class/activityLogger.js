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
			update_logged_activities(this.path_to_month);
		}
		else
		{
			//update monthly stats
			await fs.writeFile(this.path_to_month + "\\" + "Total_Sums", JSON.stringify(this.activity.get_activity_duration()));
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
			update_logged_activities(this.path_to_date);
		}
		else
		{
			await fs.writeFile(this.path_to_date + "\\" + "Total_Sums", JSON.stringify(this.activity.get_activity_duration()));	
		}
	}

	async update_logged_activities(path_to_location)
	{
		let unparsed_data = await fs.readFile(path_to_location);
		let parsed_daily_data = new Map(Object.entries(JSON.parse(unparsed_data)));

		if(parsed_daily_data.has(this.activity.get_type()))
		{
			//get the logged minutes of a specific daily event type
			let daily_activity_minutes = Number(parsed_daily_data.get(this.activity.get_type()));
			daily_activity_minutes += this.activity.get_duraiotn(); 
			parsed_daily_data.set(this.activity.get_type(), daily_activity_minutes);
		}
		else
		{
			parsed_daily_data.set(this.activity.get_type(), this.activity.get_duraiotn());
		}

		let data_for_JSON = Object.fromEntries(parsed_daily_data);
		await fs.writeFile(path_to_location, data_for_JSON);
		
	}
}

