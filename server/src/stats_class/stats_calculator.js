const fs = require('fs');
const path = require('path');
const util = require('util');

const readfile = util.promisify(fs.readFile);
const writefile = util.promisify(fs.writeFile);

const imports = require('./imports.js');


const get_stats = (state) => ({
	det_stats(){
		
		//check to make sure there logged activities for the date of daily stat object
		if(state.Activities.length == 0)
		{
			console.log("no activities");
			return; 
		}


		for(let [k, v] of state.activity_minutes.entries())
		{
			//determine/round  the stat up too the hundredths place
			let percent = (Math.round(v/state.minutes * 10000) / 100);
			//console.log('activty:' + k + ' Total time spent in min:' + v + ' Pecentage of daily time spent:' + percent + '%');
			let activty_stat = {activty: k, duration: v, percentage: percent};
			state.activity_stats.push(activty_stat);
		} 
		
	}
})

const get_daily_stats = (state) => ({
	async read_daily_stats(date)//in mm/dd/yyyy format
	{
		//set teh path to read from direcotries/files
		const file_name = 'activity_sums';
		const stats_obj_file = path.join(imports.my_path(), date, file_name);
		//read file and parse json into map
		let daily_stats = JSON.parse(await readfile(stats_obj_file));
		state.activity_minutes = new Map(Object.entries(daily_stats));

	}
})

const update_daily_stats = (state) => ({
	async update_day_stats(date)//date in mm/dd/yyyy format
	{
		const file_name = 'acitivty_sums';
		const activities_path = path.join(imports.my_path(), date, file_name);

		//read from file, parse json, and convert into a map
		let day_stats = JSON.parse(await readfile(activities_path));
		let update_day_stats_map = new Map(object.entries(day_stats));

		//update the new activity to include into new data
		if(update_day_stats_map.has(state.type)) 
		{
			let update_activity_day_minutes = Number(update_day_stats_map.get(state.type));
			update_activity_day_minutes += state.duration;
			update_day_stats_map.set(state.type, update_activity_day_minutes); 
		}
		else
		{
			update_day_stats_map.set(state.type, state.duration);
		}

		//write updated stats to file server
		await fs.writeFile(path.join(imports.my_path(), date) + '\\' + file_name, JSON.stringify(update_day_stats_map));
	}
})

module.exports.get_Stats = get_stats;
module.exports.get_obj = get_daily_stats;