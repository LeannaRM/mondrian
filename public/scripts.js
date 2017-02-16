window.addEventListener("load", function (){
	colorhash = {
		"red": "rgb(204, 0, 0)",
		"blue": "rgb(0, 0, 204)",
		"yellow": "rgb(255, 236, 0)",
		"white": "rgb(255, 255, 255)"
	}
	colorhashinverted = {
		"rgb(204, 0, 0)": "red",
		"rgb(0, 0, 204)": "blue",
		"rgb(255, 236, 0)": "yellow"
	}
	currentcolor = "";


	addClickListenerToClassEach("color",choosecolor);
	addClickListenerToClassEach("row",setcolor);

	function choosecolor(e){
		computedStyle = getComputedStyle(e.target, null)
		currentcolor = computedStyle.getPropertyValue('background-color')
	}

	function setcolor(e){
		e.target.style.backgroundColor = currentcolor;
	}



	addClickListenerToID("save_button",savePainting);

	function savePainting(e){
		var d = new Date();
		querystring = makeQueryString(d);
		// makeQueryPOSTRequest('/savenew',querystring);

		var ourRequest = new XMLHttpRequest();
		ourRequest.open('GET', '/savenew')
		ourRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		ourRequest.send(querystring)





		printSavedToScreen(d);
		addClickListenerToClassEach("saveddata",showSavedPainting);
		e.preventDefault();
	}

	function printSavedToScreen(date) {
		datestring = date.toDateString() + " at " + date.toTimeString().substr(0,5);
		htmlstring = "<a href='#' class='saveddata' id= "+ date.getTime() +">"+datestring+"</a>";
		container = document.getElementsByClassName("saveddata_container")[0];
		container.insertAdjacentHTML('beforeend',htmlstring);
	}

	function makeQueryString(date){
		datetime = date.getTime();
		var boxcolors = {}
		var boxes = document.getElementsByClassName("row")
		querystring = "date=" + datetime;
		for (i=0;i<boxes.length;i++){
			var rgbcolor = boxes[i].style.backgroundColor;
			color = colorhashinverted[rgbcolor]
			var box = boxes[i].getAttribute('id');
			boxcolors[box] = color;
			querystring = querystring + "&" + box + "=" + color;
		}
		return querystring
	}



	
	createSavedDataList();

	function createSavedDataList() {
		makeJSONGETRequest('/saveddata', function(data) {
			createlist(data);
			addClickListenerToClassEach("saveddata",showSavedPainting);
		});
	}

	function createlist(data) {
		for (var i=0; i<data.length; i++) {
			var d = new Date();
			d.setTime(data[i]["date"]);
			printSavedToScreen(d);
			i += 1
		}
	}



	function showSavedPainting(e){
		paintingDate = e.target.getAttribute('id');

		makeJSONGETRequest('/saveddata', function(data){
			paintingNumber = findPaintingNumber(data, paintingDate);
			showPainting(data[paintingNumber]);
		})
	}

	function showPainting(data) {
		boxes = document.getElementsByClassName("row")
		for (var i=0;i<boxes.length;i++) {
			id = boxes[i].getAttribute('id')
			rgbcolor = colorhash[data[id]]
			boxes[i].style.backgroundColor = rgbcolor
		}
	}

	function findPaintingNumber(data, paintingDate) {
		var rightone = false;
		var i =0;
		while (rightone == false) {
			rightone = paintingDate == data[i]["date"];
			i++
		}
		return i -1
	}


});