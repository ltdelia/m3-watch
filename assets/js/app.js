$(document).ready(function(){

	$(document).keyup(function(event) {
		if(event.keyCode == 13){
			var term = $('#search').val().trim();
			fixed();
			search(term);
		}
	});

	function fixed() {
		$('.header').hide();
		$('.land_content').removeClass('land_content').addClass('navbar-fixed');
	}

});