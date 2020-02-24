const fs = require('fs').promises;
const path = require('path');
const util = require('util');

const activity = require('./activity.js');
const stats = require('./stats_calculator.js');
const imports = require('./imports.js');//need to name better, imports isnt that great of a name 

// Activity class
module.exports = class WeeklyStats{

	//date in mm//dd/yyyy format, day in int, ex. 0 == Sun, 1 == Mon, etc..
	constructor()
	{
		this.minutes = 1440 * 7; //minutes in day, for calculation purposes
		this.activities = [];
		Object.assign(this, stats.get_Stats(this), stats.get_obj(this));//merge instantiation with stats_calculator.js
	}
}


