// Activity class
module.exports = class activity{

	static count = 0; 
	
	//class constructor, mostly defined by Date object upon instantiating time
	//gets type from user/front-end
	constructor(type, duration){


		this.id = activity.count++;
		this.type = type;
		this.duration = duration;
		this.today_date = new Date();
		this.month = this.today_date.getMonth() + 1;
		this.day = this.today_date.getDay();
		this.date = this.today_date.getDate();
		this.year = this.today_date.getFullYear();
	}

	//set the event type based on the user's input
	set_type(event_type)
	{
		this.type = event_type;
	}

	set_duration(duration)
	{
		this.duration = duration;
	}

	//print info on specific event
	print_Info(activity) 
	{	
		return `You spent ${this.duration} minute(s) ${this.type} on ${this.month}-${this.date}-${this.year}.`;
	}

	//return the date of the event based on when the object is created in mm/dd/yyyy format
	date_created()
	{
		return `${this.month}-${this.date}-${this.year}`;
	}

	//return id
	get_Id()
	{
		return `${this.id}`;
	}
		
}


