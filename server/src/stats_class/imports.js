//function for returning a day
function day_of_week(day_number)
{
	switch(day_number)
	{
		case '0':
			return 'Sunday';
		case '1':
			return 'Monday';
		case '2':
			return 'Tuesday';
		case '3':
			return 'Wednesday';
		case '4':
			return 'Thursday';
		case '5':
			return 'Friday';
		case '6':
			return 'Saturday';
	}
}

//function that returns the path to directory containing date folders
function path(){
	return "C:/Users/Victor/VueJs/exemplum_meum/Exemplum_Meum/server";
}



module.exports.weekDay = day_of_week;
module.exports.my_path = path;