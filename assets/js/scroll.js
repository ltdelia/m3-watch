$(window).scroll( function() {

  var scrollPos = $(window).scrollTop();

  console.log(scrollPos);

  if (scrollPos < $('nav').height()) {

    // Top of scroll

    // console.log("Top");

    $('header').show();

    // For large screen size ONLY
    if ( $( window ).width() >= 981 ) {
      $('.sidebar').css( {
        'top':'90px'
      });
    } else {
      $('.sidebar').css( {
        'top':'0px'
      });
    }

  } else {

    // Once window starts scrolling, the fixed child goes to top

    $('header').hide();

    // For large screen size ONLY
    if ( $( window ).width() >= 981 ) {
      $('.sidebar').css( {
        'top':'30px'
      });
    } else {
      $('.sidebar').css( {
        'top':'0px'
      });
    }

  }
});



// var contentHeight = $('.main-content').position().top + $('.main-content').outerHeight(true);
// var contentPos = Math.abs($(window).height() - contentHeight);

// var sidebarHeight = $('.sidebar').outerHeight(true);
// var sidebarPos = $(window).height() - sidebarHeight;

// else if (scrollPos > contentPos ) {

//       // Once window reaches bottom

//       console.log("Bottom");

//       $('header').hide();

//       $('.sidebar').css( {
//         // 'position':'relative',
//         // 'bottom':'0px'
//       });

//     }