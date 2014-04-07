//it's temporarily 1D because of ids
var boxes = new Array();

function gridTable()
{
    var ret = "<svg id='calendar-graph' height='110' width='721'><g transform='translate(20, 20)'>";
    
    //excuse the noob id approach, I'll fix it to smt that makes more sense later, too tired XD
    //just wanted teh colors to appear
    var idNum = 0;
    for(var i = 0; i <= 650 ; i += 13)
    {
        ret += "<g transform='translate(" + i + ", 0)'>";
        
	for(var j = 0; j <= 78; j += 13)
        {
	    ret += "<rect id='" + idNum + "' onclick='color(" + idNum + ")' class='day' width='11' height='11' y='" + j + "' style='fill: rgb(238, 238, 238);'></rect>";
	    boxes[idNum] = 0;
	    idNum++;
	}
        ret+="</g>";
    }
    ret += "</g></svg>";
    return ret;
}



function createGrid()
{
    var obj = document.getElementById("gridBody");
    obj.innerHTML = gridTable();
}


function color(id)
{
    //console.log("running color(" + id + ")");
    // Check the current colour and update to the next colour.
    var box = document.getElementById(id);
    switch (boxes[id])
    {
      case 0:	
	box.setAttribute("style", "fill: rgb(214, 230, 133);");
	boxes[id]++;
	calculateDate(id);
	break;
      case 1:
	box.setAttribute("style", "fill: rgb(140, 198, 101);")
	boxes[id]++;
	break;
      case 2:
	box.setAttribute("style", "fill: rgb(68, 163, 64);")
	boxes[id]++;
	break;
      case 3:
	box.setAttribute("style", "fill: rgb(30, 104, 35);")
	boxes[id]++;
	break;
      case 4:
	box.setAttribute("style", "fill: rgb(238, 238, 238);")
	boxes[id] = 0;
	break;
    }

}



function colorUpdate(id, array)
{
    //here we'll access the 2D array - check the current colour, and update to the next colour
    var box = document.getElementById(id);
    switch (array[id])
    {
      case 0:
  box.setAttribute = "fill: rgb(214, 230, 133);";
  break;
      case 1:
  box.setAttribute = "fill: rgb(140, 198, 101);";
  break;
      case 2:
  box.setAttribute = "fill: rgb(68, 163, 64);";
  break;
      case 3:
  box.setAttribute = "fill: rgb(30, 104, 35);";
  break;
      case 4:
  box.setAttribute = "fill: rgb(238, 238, 238);";
  break;
    }

}





var save1 = new Array;

function save() {
  save1 = boxes;
  for (i = 0; i < save1.length; i++){
    if (save1[i] != 0) {
    console.log("position: " + i + " color: " + save1[i]);
      }
  }
}



function load() {
  difference();
  for (i = 0; i < save1.length; i++){
      colorUpdate(i, save1);
      if (save1[i] != 0){
        console.log("filled " + i + " with color " + save1[i]);
    }
  }
}

function difference(){
  console.log("difference called");
  for (i = 0; i < save1.length; i++){
    if (save1[i] != boxes[i]) {
      console.log("different at position " + i);
    }

  }

}



// reetah's stuff



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
var inputColumn = 0; // between 0 and 52 inclusive

var squareNumber = 365;

//////////////////
// END OF INPUT //
//////////////////

//console.log("At position [" + inputRow + "][" + inputColumn + "] of the array, the date is:");



inputColumn++; // add 1 to offset incomplete column at the beginning

/* leap years occur on years that are divisile by 4 (with some exceptions
 * but those happend once every century or so so we'll ignore them for now) */

function calculateDate(number) {

squareNumber = number;
console.log("Square #" + squareNumber + " corresponds to: ")

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
var startingDate = (presentTotal - presentDayOfWeek + 365 + 6) - (7)*(52);

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
  // outputTotal = (inputColumn * 7 + inputRow + startingDate) % 365;
  outputTotal = (squareNumber + startingDate) % 365;

}
else {
  //outputTotal = (inputColumn * 7 + inputRow + startingDate) % 366;
  outputTotal = (squareNumber + startingDate) % 366;
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
}