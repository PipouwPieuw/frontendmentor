// On page load bind form submit action to onFormSubmit method
window.onload=function(){
	document.getElementById("form").addEventListener("submit", function(e) {
	    e.preventDefault();
	    onFormSubmit(e.target);
	});
}

// Process form data and display Thank you block
function onFormSubmit(form) {
    var formData = new FormData(form);
    var rating = Object.fromEntries(formData).rate;
    if (typeof rating !== "undefined") {
    	document.getElementById("result").innerHTML = rating;
    	document.getElementById("wrapper").classList.add('app-rating__wrapper--next-step');   	
    }
}