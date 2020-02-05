const stats = require('./stats_calculator.js');
const activity = require('./activity.js');
const daily_Stats = require('./dailyStats.js');
const imports = require('./imports.js');


let activity_one = new activity('sleeping', 20);


let activity_two = new activity('programming', 45);

let activity_three = new activity('running', 45);
//activity_three.write_Activity();

let activity_four = new activity('cleaning', 45);
//activity_four.write_Activity();

//let day_one_stats = new daily_Stats(activity_four.date_created(), activity_four.get_day());

activity_one.write_Activity();
activity_two.write_Activity();
activity_three.write_Activity();
activity_four.write_Activity();




/*day_one_stats.set_stats()
.then( () => {
	console.log(day_one_stats);
	day_one_stats.read_daily_stats('2-4-2020');
})
.catch(err => {
	console.log(err);
})*/

