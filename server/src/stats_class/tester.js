const stats = require('./stats_calculator.js');
const activity = require('./activity.js');
const daily_Stats = require('./dailyStats.js');
//const day = require('./imports.js');

let daily_stats_one = new daily_Stats('12-30-2019', 2);
console.log(daily_stats_one);

daily_stats_one.get_Activities()
.then(res => console.log(res))
.catch(err => console.log(err));

/*daily_stats_one.update_activities('sleeping', 570);

daily_stats_one.get_Activities('12-30-2019')
.then(res => {
	console.log(res); 
	console.log(daily_stats_one);
})
.catch(err => console.log(err));



//console.log(day.weekDay(5));*/



