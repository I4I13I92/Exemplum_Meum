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

function days_in_month(month_number)
{
	let longer_months = [1,3,5,7,8,10,12];
	let shorter_months = [4,6,9,11]

	if(shorter_months.includes(month_number))
	{
		return 30;
	}
	else if(longer_months.includes(month_number))
	{
		return 31;
	}
	else
	{
		return 28;
	}

}

//function that returns the path to directory containing date folders
function path(){
	return "C:/Users/Victor/VueJs/exemplum_meum/Exemplum_Meum/server";
}



module.exports.weekDay = day_of_week;
module.exports.my_path = path;