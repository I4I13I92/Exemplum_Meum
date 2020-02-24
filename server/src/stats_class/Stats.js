const fs = require('fs').promises;
const util = require('util');
const path = require('path');

const imports = require('./imports.js');
const stats = require('./stats_calculator.js');

module.exports = class Stats{

	activities = [];

	constructor()
	{
		if (this.constructor === Stats) 
		{
			throw new Error("Abstract classes can't be instantiated!");
		}
	}

	determine_minutes()
	{
	 throw new Error("Method 'determine_minutes()' must be implemented!")
	}

	get_path()
	{
		return imports.my_path();
	}
}