var buttons = new Array();


// everything below this line was me working on buttons. feel free to delete!
var clicked = false;

function toggleColor() {
	clicked = !clicked;

	if (clicked) {
		document.getElementById("test").style.background="#000000";
	}
	else {
		document.getElementById("test").style.background="#17101A";
	}

}