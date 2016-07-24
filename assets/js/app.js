$(document).ready(function(){

	$(document).keyup(function(event) {
		if(event.keyCode == 13){
			fixed();
			search();
		}
	});

	function fixed() {
		// console.log("Move search bar to top");
		$('.header').hide();
		$('.land_content').removeClass('land_content').addClass('navbar-fixed');
	}

});