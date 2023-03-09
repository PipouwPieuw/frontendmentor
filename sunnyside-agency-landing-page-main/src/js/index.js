// On page load
window.onload=function(){
	// Scroll to content
	document.getElementById('scroll_to_content').onclick = function() {
		document.getElementById("page_content").scrollIntoView({behavior: 'smooth'});
	}
	// Responsive menu
	document.getElementById('hamburger').onclick = function() {
        document.getElementById('hamburger').classList.toggle('open');
        document.getElementById('main_menu').classList.toggle('open');
    }
}

