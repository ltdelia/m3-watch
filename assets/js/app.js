$(document).ready(function(){

	$(document).keyup(function(event) {
		if(event.keyCode == 13){
			fixed();
			search();
		}
	});
  // Change placeholder text on resize

//   $('#search').each(function() {
//     $(this).data('placeholder', $(this).attr('placeholder'));
//   });

//   function changePlaceholder() {
//       if( $(window).width() <= 640){
//           $('#search').attr('placeholder','Search');
//       } else {
//           $('#search').each(function() {
//               $(this).attr('placeholder', $(this).data('placeholder'));
//           });
//       }   
//   }

//   $(window).resize( changePlaceholder ).trigger('resize');

//   // Clear input

//   document.getElementById("clearinput").onclick = function() {
//     $('#search').val("");
//   };

//   // Run initial api calls

// 	document.getElementById("searchbar").onsubmit = function() {

//     var searchterm = $('#search').val().trim();

// 		fixed();
// 		search(searchterm);
// 	};
// >>>>>>> master

	function fixed() {
		// console.log("Move search bar to top");
		$('.header').hide();
		$('.land_content').removeClass('land_content').addClass('navbar-fixed');
	}

});