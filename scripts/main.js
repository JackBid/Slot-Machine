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

	var slots = [ {html: $("#slot-1"), hasSpun: false}, {html: $("#slot-2"), hasSpun: false}, {html: $("#slot-3"), hasSpun: false}];

	var isSpinning = false;

	function pickRandomProperty(obj) {
    	var result;
    	var count = 0;
    	for (var prop in obj)
        	if (Math.random() < 1/++count)
           	result = prop;
    	return result;
	}

	function pickSlot(fruits){
		var total = 0;
    	var randNumber = Math.round(Math.random()*100);
    		
    	for(var i=0; i<fruits.length;i++){  		
    		if(randNumber >= total && randNumber <= total+fruits[i][1])
    			return icons[fruits[i][0]];
    		total+=fruits[i][1];
    	}
	}

	function changeSlot(slot,value){
		slot.html(value);
	}

	function changeSlots(slot1, slot2, slot3){
		slots[0].html.html(slot1);
		slots[1].html.html(slot2);
		slots[2].html.html(slot3);
	}

	function allRandomSlots(){
		var arr = [pickRandomProperty(icons), pickRandomProperty(icons), pickRandomProperty(icons)];
		changeSlots(icons[arr[0]], icons[arr[1]], icons[arr[2]]);
	}

	function spin(){
		isSpinning = true;
		var counter = 0;
		function timer(){
			// Keep flicking through slots changing them
			for(var i=0; i<slots.length; i++){
				if(!slots[i].hasSpun){
					changeSlot(slots[i].html, icons[pickRandomProperty(icons)]);
				}
			}
			counter++;

			// Change slots at different times
			if(counter === 40){
				slots[2].hasSpun = true;
				changeSlot(slots[2].html, pickSlot([["plum", 25], ["lemon", 20], ["cherries", 10], ["bananas", 10], ["orange", 10], ["melon", 10], ["bar", 7], ["seven", 5], ["big_win", 3]]));
				clearInterval(interval);
				isSpinning = false;
				checkWin();
			}else if(counter === 30){
				slots[1].hasSpun = true;
				changeSlot(slots[1].html, pickSlot([["plum", 25], ["lemon", 20], ["cherries", 10], ["bananas", 10], ["orange", 10], ["melon", 10], ["bar", 7], ["seven", 5], ["big_win", 3]]));
			}else if(counter === 20){
				slots[0].hasSpun = true;
				changeSlot(slots[0].html, pickSlot([["plum", 25], ["lemon", 20], ["cherries", 10], ["bananas", 10], ["orange", 10], ["melon", 10], ["bar", 7], ["seven", 5], ["big_win", 3]]));
			}
		}
		var interval = setInterval(timer, 75);
		for(var slot in slots)
			slots[slot].hasSpun = false;
	}

	function checkWin(){
		var first = slots[0].html.contents().attr("alt");
		var second = slots[1].html.contents().attr("alt");
		var third = slots[2].html.contents().attr("alt");

		if(first === second && second === third){
			console.log("3 matches!");
		}else if(first === second || second === third || first === third){
			console.log("2 matches");
		}else{
			console.log("no matches");
		}
	}

	changeSlots(icons.big_win, icons.big_win, icons.big_win);

	$("button").click(function(){
		if(!isSpinning){
			spin();
		}
	});

});