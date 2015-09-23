$(document).ready(function(){

	var icons = {
		seven: "<img src='assets/images/icon_7.png' alt='7' height='150' width='150'>",
		bananas: "<img src='assets/images/icon_bananas.png' alt='bananas' height='150' width='150'>",
		bar: "<img src='assets/images/icon_bar.png' alt='bar' height='150' width='150'>",
		big_win: "<img src='assets/images/icon_big_win.png' alt='big win' height='150' width='150'>",
		cherries: "<img src='assets/images/icon_cherries.png' alt='cherries' height='150' width='150'>",
		lemon: "<img src='assets/images/icon_lemon.png' alt='lemon' height='150' width='150'>",
		melon: "<img src='assets/images/icon_melon.png' alt='melon' height='150' width='150'>",
		plum: "<img src='assets/images/icon_plum.png' alt='plum' height='150' width='150'>",
		orange: "<img src='assets/images/icon_orange.png' alt='orange' height='150' width='150'>" 
	}

	function pickRandomProperty(obj) {
    	var result;
    	var count = 0;
    	for (var prop in obj)
        	if (Math.random() < 1/++count)
           	result = prop;
    	return result;
	}

	function changeSlots(slot1, slot2, slot3){
		$("#slot-1").html(slot1);
		$("#slot-2").html(slot2);
		$("#slot-3").html(slot3);
	}

	
	changeSlots(icons.big_win, icons.big_win, icons.big_win);

	$("button").click(function(){
		var arr = [pickRandomProperty(icons), pickRandomProperty(icons), pickRandomProperty(icons)];
		changeSlots(icons[arr[0]], icons[arr[1]], icons[arr[2]]);
	});

});