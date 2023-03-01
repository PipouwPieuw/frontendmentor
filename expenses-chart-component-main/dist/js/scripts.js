var data = [
	{
		"day": "mon",
		"amount": 17.45
	},
	{
		"day": "tue",
		"amount": 34.91
	},
	{
		"day": "wed",
		"amount": 52.36
	},
	{
		"day": "thu",
		"amount": 31.07
	},
	{
		"day": "fri",
		"amount": 23.39
	},
	{
		"day": "sat",
		"amount": 43.28
	},
	{
		"day": "sun",
		"amount": 25.48
	}
];
var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
var currentDay = new Date().getDay();
var currentDayName = days[currentDay];

// On page load
window.onload=function(){
	var str = "";
  	var maxVal = 0;
  	
  	// Get max value
  	for(day in data)
		if(data[day].amount > maxVal)
			maxVal = data[day].amount;
	
	// Build HTML
	for(day in data) {
		// Set element height in % of max value
		var height = Math.round(data[day].amount / maxVal * 100);
		// Set today class
		var todayClass = currentDayName == data[day].day ? ' block_chart__percent--today' : '';
		// Build HTML
		str += "<li class='block_chart__day'><span class='block_chart__amount'><span class='block_chart__percent" + todayClass + "' tabindex='0' data-height='" + height + "'><span class='tooltip'><span class='tooltip__inner'>$" + data[day].amount + "</span></span></span></span><span class='block_chart__label'>" + data[day].day + "</span></li>";
	}	
	document.getElementById("chart").innerHTML = str;

	// Display sections
	document.getElementById("sec_header").classList.remove("sec_loading");
	document.getElementById("sec_content").classList.remove("sec_loading");

	// Set height to each element
  	var elements = document.getElementsByClassName("block_chart__percent");
  	heightLoop(0, elements);
}

// Loop through bar chart items 
function heightLoop(i, elements) {
	setTimeout(function() {
		var elem = elements.item(i);
		setHeight(elem);
	    i++;
	    if (i < elements.length) {
	      heightLoop(i, elements);
	    }
	}, 100);
}

// Set height to current bar chart item
function setHeight(item) {
	var height = item.getAttribute("data-height");
	item.style.height = height + "%";
}