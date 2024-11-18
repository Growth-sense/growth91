;(function($) {
    "use strict";    
        
    //* counter--up.js
    function counterUp() {
        if ($('.counterup-section').length) { 
            $('.counter').counterUp({
                delay: 10,
                time: 3000, 
            });
        };
    };

    
    
    // magnificPopup 
    function magnifiPopup (){
        if ($('.popup-youtube').length){
            $('.popup-youtube').magnificPopup({
                disableOn: 700,
                type: 'iframe',
                mainClass: 'mfp-fade',
                removalDelay: 160,
                preloader: false,
                fixedContentPos: false
            });
        }
    }


    
    

    // search modal js 
    $('.search_btn').click( function (){
                  
		$('body').addClass('search-activee');  
	});

	$('.search_close, .search_overlay').click( function (){
		  
		$('body').removeClass('search-activee'); 
    });

    var swiper = new Swiper(".mySwiper", {
        direction: "vertical",
        slidesPerView: 3,
        autoplay:true,
        loop:true,
        speed: 2000,
        spaceBetween: 10,
        mousewheel: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
    });


    /*Function Calls*/ 
    counterUp();  
    
    magnifiPopup ();
    new WOW().init();
})(jQuery); 
