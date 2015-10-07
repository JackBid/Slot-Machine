$(document).ready(function(){

	var icons = {
		seven: "<img src='assets/images/icon_7.png' alt='seven' height='150' width='150'>",
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
	var score = 0;
	var prev;

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
    		if(fruits[i]){
	    		if(randNumber >= total && randNumber <= total+fruits[i][1]){
	    			return icons[fruits[i][0]];
	    		}
    		
    			total+=fruits[i][1];
			}
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

				prev = slots[1].html.contents().attr("alt");
				
				if(prev === "plum" || prev === "lemon" || prev === "cherries"){
					changeSlot(slots[2].html, pickSlot([["plum", 20], ["lemon", 20], ["cherries", 20], ["bananas", 10] ["orange", 10], ["melon", 5], ["bar", 5], ["seven", 5], ["big_win", 5]]));
				}else if(prev === "bananas" || prev === "orange" || prev === "melon"){
					changeSlot(slots[2].html, pickSlot([["plum", 5], ["lemon", 5], ["cherries", 5], ["bananas", 20] ["orange", 20], ["melon", 20], ["bar", 10], ["seven", 10], ["big_win", 5]]));
				}else if(prev === "bar" || prev === "seven" || prev === "big win"){
					changeSlot(slots[2].html, pickSlot([["plum", 5], ["lemon", 5], ["cherries", 5], ["bananas", 5] ["orange", 10], ["melon", 10], ["bar", 20], ["seven", 20], ["big_win", 20]]));
				}else{
					console.log("error");
				}
				
				
				clearInterval(interval);
				isSpinning = false;
				checkWin();
			}else if(counter === 30){
				slots[1].hasSpun = true;
				prev = slots[0].html.contents().attr("alt");
				
				if(prev === "plum" || prev === "lemon" || prev === "cherries"){
					changeSlot(slots[1].html, pickSlot([["plum", 20], ["lemon", 20], ["cherries", 20], ["bananas", 10] ["orange", 10], ["melon", 5], ["bar", 5], ["seven", 5], ["big_win", 5]]));
				}else if(prev === "bananas" || prev === "orange" || prev === "melon"){
					changeSlot(slots[1].html, pickSlot([["plum", 5], ["lemon", 5], ["cherries", 5], ["bananas", 20] ["orange", 20], ["melon", 20], ["bar", 10], ["seven", 10], ["big_win", 5]]));
				}else if(prev === "bar" || prev === "seven" || prev === "big win"){
					changeSlot(slots[1].html, pickSlot([["plum", 5], ["lemon", 5], ["cherries", 5], ["bananas", 5] ["orange", 10], ["melon", 10], ["bar", 20], ["seven", 20], ["big_win", 20]]));
				}else{
					console.log("error");
				}

				
			}else if(counter === 20){
				slots[0].hasSpun = true;
				changeSlot(slots[0].html, pickSlot([["plum", 20], ["lemon", 10], ["cherries", 15], ["bananas", 10], ["orange", 10], ["melon", 10], ["bar", 10], ["seven", 10], ["big_win", 5]]));
			}
		}
		var interval = setInterval(timer, 75);
		for(var slot in slots)
			slots[slot].hasSpun = false;
	}

	function updateScore(increment){
		score += increment;
		$("#score").html(score);
	}

	function checkWin(){

		var first = slots[0].html.contents().attr("alt");
		var second = slots[1].html.contents().attr("alt");
		var third = slots[2].html.contents().attr("alt");

	
		if(first === second && second === third){
			if(first === "big win"){
				updateScore(1000);
			}else if(first === "seven"){
				updateScore(750);
			}else if(first === "bar"){
				updateScore(600);
			}else if(first === "melon"){
				updateScore(300);
			}else if(first === "orange"){
				updateScore(200);
			}else if(first === "bananas"){
				updateScore(100);
			}else if(first === "cherries"){
				updateScore(150);
			}
		}else if(first === second || second === third || first === third){
			if(first === "cherries" || second === "cherries" || third === "cherries"){
				updateScore(100)
			}
		}else{
			if(first === "cherries" || second === "cherries" || third === "cherries"){
				updateScore(50);
			}
		}
	}

	changeSlots(icons.big_win, icons.big_win, icons.big_win);

	$("button").click(function(){
		if(!isSpinning){
			spin();
		}
	});

});