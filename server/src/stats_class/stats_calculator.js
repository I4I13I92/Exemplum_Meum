const fs = require('fs');
const path = require('path');
const util = require('util');

const readfile = util.promisify(fs.readFile);

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
	async read_daily_stats(a_date)//in mm/dd/yyyy format
	{
		const file_name = 'activity_sums';
		const stats_obj_file = path.join(imports.my_path(), file_name, a_date)
		let daily_stats = new Map();
		console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
		console.log(stats_obj_file);
		console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

		//daily_stats = await readfile()
		//const directoryPath = path.join(imports.my_path(), this.date);
 
	}
})


module.exports.get_Stats = get_stats;
module.exports.get_obj = get_daily_stats;