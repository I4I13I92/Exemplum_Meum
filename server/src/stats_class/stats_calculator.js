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









module.exports.get_Stats = get_stats;
module.exports.get_obj = get_daily_stats;