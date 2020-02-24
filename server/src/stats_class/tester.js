const fs = require('fs').promises;
const util = require('util');
const path = require('path');

const imports = require('./imports.js');
const stats = require('./stats_calculator.js');
const DailyStats = require('./DailyStats.js');
const Stats = require('./Stats.js');


let day_stat = new DailyStats();
//let stat = new Stats();
console.log(day_stat.determine_minutes());