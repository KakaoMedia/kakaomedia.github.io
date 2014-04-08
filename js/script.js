$("document").ready(function() {

	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			$('#front_page .container').stop().animate({ opacity: 0 }, 200);
		}
		
		if ($(this).scrollTop() < 100) {
			$('#front_page .container').stop().animate({ opacity: 1 }, 200);
		}
	}); 

	$('#quote').waypoint(function(direction) {
		$('#quote h2').stop().animate({ opacity: 1 }, 200);
	}, { offset: '60%' });

});