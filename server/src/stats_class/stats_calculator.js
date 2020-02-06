const fs = require('fs').promises;
const FS = require('fs');//clean up
const path = require('path');
const util = require('util');

//const readfile = util.promisify(fs.readFile);
//const writefile = util.promisify(fs.writeFile);

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
		//set the path to read from direcotries/files
		const file_name = 'activity_sums';
		const stats_obj_file = path.join(imports.my_path(), date, file_name);
		//read file and parse json into map
		let daily_stats = JSON.parse(await fs.readFile(stats_obj_file));
		state.activity_minutes = new Map(Object.entries(daily_stats));

	}
})

const update_daily_stats = (state) => ({
	async update_day_stats(path_to_month, date)//date in mm/dd/yyyy format
	{
		const file_name = 'activity_sums';
		const activities_path = path.join(path_to_month, file_name);
		console.log(activities_path);

		//read from file, parse json, and convert into a map
		let unparsed_data = await fs.readFile(activities_path);
		let update_day_stats_map = new Map(Object.entries(JSON.parse(unparsed_data)));

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
		//convert to reg object since since JSON stringify doesn't work on maps(ES6)
		// and write updated stats to file server
		let map_to_object = Object.fromEntries(update_day_stats_map);
		await fs.writeFile(activities_path, JSON.stringify(map_to_object));
	}
})

module.exports.get_Stats = get_stats;
module.exports.get_obj = get_daily_stats;
module.exports.up_Day_Stats = update_daily_stats;