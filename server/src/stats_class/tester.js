const stats = require('./stats_calculator.js');
const activity = require('./activity.js');
const daily_Stats = require('./dailyStats.js');
const imports = require('./imports.js');

let my_map = new Map();
let obj = {}
obj.age = 23;
obj.name = "Victor";
my_map.set("sleeping", 30);
my_map.set("running", 54);
[...my_map];
console.log(JSON.stringify(obj));


