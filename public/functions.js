function addClickListenerToClassEach(classname,functionname) {
	var trigger = document.getElementsByClassName(classname);
	for (i=0;i<trigger.length;i++){
		trigger[i].addEventListener("click",functionname);
	}
}

function addClickListenerToID(idname,functionname) {
	var trigger = document.getElementById(idname);
	trigger.addEventListener("click",functionname);
}

function makeRequest(GETPOST,locationQuerystring,onloadfunction) {
	var ourRequest = new XMLHttpRequest();
	ourRequest.open(GETPOST, locationQuerystring, true);
	if (onloadfunction != undefined) {
		ourRequest.onload = function() {
			var result = ourRequest.responseText
			onloadfunction(result);
		}
	}
	ourRequest.send();
}

// function makeQueryPOSTRequest(location,querystring) {
// 	var ourRequest = new XMLHttpRequest();
// 	ourRequest.open('POST', location, true);
// 	ourRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 	ourRequest.send(querystring);
// }

// function makeJSONGETRequest(location, onloadfunction) {
// 	var ourRequest = new XMLHttpRequest();
// 	ourRequest.open('GET', location)
// 	ourRequest.onload = function(){
// 		var ourdata = JSON.parse(ourRequest.responseText)
// 		onloadfunction(ourdata);
// 	}
// 	ourRequest.send()
// }