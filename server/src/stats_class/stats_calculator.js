const stats_up = (state) => ({
	update_activities(type, duration){
		if(state.stats.has(type))
		{
			console.log('It has the type');
			let activity_total = state.stats.get(type) + duration;
			state.stats.set(type, activity_total);
		}
		else
		{
			console.log('it does not');
			state.stats.set(type, duration);
		}
	}
})

module.exports.update_stats = stats_up;