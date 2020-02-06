const stats = require('./stats_calculator.js');
const activity = require('./activity.js');
const daily_Stats = require('./dailyStats.js');
const imports = require('./imports.js');

let my_map = new Map();
my_map.set("sleeping", 30);
my_map.set("running", 54);

let obj = Object.fromEntries(my_map);

console.log(JSON.stringify(obj));



