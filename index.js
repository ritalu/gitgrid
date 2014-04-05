//////////////////////////////
// POSITION ON GRID to DATE //
//////////////////////////////

// stores information about present date

var d = new Date();
var presentDayOfWeek = d.getDay(); // 0 = Sunday, 1 = Monday, ... , 6 = Saturday
var presentDay = d.getDate();
var presentMonth = d.getMonth();;
var presentYear = d.getFullYear();

///////////
// INPUT //
///////////

var inputRow = 0; // between 0 and 6 inclusive
var inputColumn = 1; // between 0 and 52 inclusive

//////////////////
// END OF INPUT //
//////////////////

console.log("At position [" + inputRow + "][" + inputColumn + "] of the array, the date is:");

/* leap years occur on years that are divisile by 4 (with some exceptions
 * but those happend once every century or so so we'll ignore them for now) */

var leap = false;

if (presentYear % 4 == 0){
	leap = true;
}
// maxDays holds maximum amount of days in every month, accounting for leap and non-leap years
var maxDays = new Array();

if (leap){
	maxDays[0] = 31;
	maxDays[1] = 29;
	maxDays[2] = 31;
	maxDays[3] = 30;
	maxDays[4] = 31;
	maxDays[5] = 30;
	maxDays[6] = 31;
	maxDays[7] = 31;
	maxDays[8] = 30;
	maxDays[9] = 31;
	maxDays[10] = 30;
	maxDays[11] = 31;
}
else {

	maxDays[0] = 31;
	maxDays[1] = 28;
	maxDays[2] = 31;
	maxDays[3] = 30;
	maxDays[4] = 31;
	maxDays[5] = 30;
	maxDays[6] = 31;
	maxDays[7] = 31;
	maxDays[8] = 30;
	maxDays[9] = 31;
	maxDays[10] = 30;
	maxDays[11] = 31;

}

// calculate number of days out of 365 the present date is
var presentTotal = 0;

for (j = 0; j < presentMonth; j++){
	presentTotal = presentTotal + maxDays[j];
}
presentTotal = presentTotal + presentDay;


// calculate what the sampleTotalth day of the year is
var startingDate = (presentTotal - presentDayOfWeek + 365) - (7)*(52);

////////////
// OUTPUT //
////////////

var outputDay;
var outputMonth;
var outputYear;

///////////////////
// END OF OUTPUT //
///////////////////

var outputTotal;
if (leap) {
	outputTotal = (inputColumn * 7 + inputRow + startingDate) % 365;

}
else {
	outputTotal = (inputColumn * 7 + inputRow + startingDate) % 366;
}

for (i = 0; i < 12; i++){
	if (outputTotal - maxDays[i] > 0) {
		outputTotal = outputTotal - maxDays[i];
	}
	else break;

}

outputMonth = i + 1;

if (outputMonth > presentMonth && outputDay > presentDay){
	outputYear = presentYear - 1;
}
else {
	outputYear = presentYear;
}

if (outputTotal > 0) {
	outputDay = outputTotal;
}
console.log("Month: " + outputMonth);
console.log("Day: " + outputDay);
console.log("Year: " + outputYear);