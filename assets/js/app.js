$(document).ready(function(){

	document.getElementById("searchbar").onsubmit = function() {
		fixed();
		search();
	};

	function fixed() {
		// console.log("Move search bar to top");
		$('.header').hide();
		$('.land_content').removeClass('land_content').addClass('navbar-fixed');
	}

});