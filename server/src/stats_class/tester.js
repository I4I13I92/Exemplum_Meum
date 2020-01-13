const stats = require('./stats_calculator.js');
const activity = require('./activity.js');
const daily_Stats = require('./dailyStats.js');
//const day = require('./imports.js');

/*let daily_stats_one = new daily_Stats('12-30-2019', 2);

daily_stats_one.get_Activities()
.then(stats_obj => {
	let stats = stats_obj;
	daily_stats_one.det_stats();
	console.log(daily_stats_one.activity_stats);
}) 
.catch(err => console.log(err));*/

let daily_stats_one = new daily_Stats('12-30-2019', 2);
/*daily_stats_one.set_activity_minutes()
.then(() => {
	daily_stats_one.det_stats();
})
.catch(err => console.log(err));*/

//console.log(daily_stats_one.activity_minutes);
daily_stats_one.set_stats();

/*daily_stats_one.update_activities('sleeping', 570);

daily_stats_one.get_Activities('12-30-2019')
.then(res => {
	console.log(res); 
	console.log(daily_stats_one);
})
.catch(err => console.log(err));



//console.log(day.weekDay(5));*/



