// On page load
window.onload=function(){
	document.getElementById('scroll_to_content').onclick = function() {
		document.getElementById("page_content").scrollIntoView({behavior: 'smooth'});
	}
}

