function methodToFixLayout( e ) {
    var winWidth = $(window).outerWidth() + 17;

	$("#what_we_do .first_group, #what_we_do .second_group").height("160px");
	$("#what_we_do").css("padding-bottom", "30px");

	if(winWidth >= 768 && winWidth <= 991) {
    	$("#what_we_do #first_group, #what_we_do #second_group").height(0);
    	$("#what_we_do .info:visible").parent().parent().height(($("#what_we_do .info:visible").height() * 2) - 80);
    } else if(winWidth > 991) {
    	$("#what_we_do").css("padding-bottom", $("#what_we_do .info:visible").height() + 50);
    	$("#what_we_do .first_group, #what_we_do .second_group").height("0");
    }
}

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

	//WHAT WE DO - INFO
	$("#what_we_do .title_info").click(function() {
		var winWidth = $(window).outerWidth() + 17;
		var height = $(this).parent().find(".info").height();

		$("#what_we_do .active").removeClass("active");		

		if($(this).parent().find(".info").is(":visible")) {
			$(this).parent().find(".info").slideUp("medium");
			$("#what_we_do").css("padding-bottom", "30px");

			if(winWidth >= 768 && winWidth <= 991)
				$("#what_we_do .first_group, #what_we_do .second_group").animate({ height: "160px" });
		}
		else {

			$(this).addClass("active");

			if($("#what_we_do .info:visible").length == 0) {
				$(this).parent().find(".info").slideDown("medium");

				if(winWidth >= 768 && winWidth <= 991)
					$(this).parent().parent().animate({ "height": ((height * 2) - 80) + "px" });
			}
			else {
				if(winWidth <=  767) {
					$("#what_we_do .info:visible").slideUp("medium");
					$(this).parent().find(".info").slideDown("medium");
				} else if(winWidth >= 768 && winWidth <= 991) {
					if($("#what_we_do .info:visible").parent().parent().attr("class") != $(this).parent().parent().attr("class")) {
						$("#what_we_do .info:visible").parent().parent().animate({ height: "160px" });
						$("#what_we_do .info:visible").slideUp("medium");
												
						$(this).parent().parent().animate({ "height": ((height * 2) - 80) + "px" });
						$(this).parent().find(".info").slideDown("medium");
					} else {
						$("#what_we_do .info:visible").fadeOut("medium");
						$(this).parent().find(".info").fadeIn("medium");
					}
				} else if(winWidth >= 992) {
					$("#what_we_do .info:visible").fadeOut("medium");
					$(this).parent().find(".info").fadeIn("medium");
				}
			}

			if(winWidth > 991)
				$("#what_we_do").css("padding-bottom", height + 50);

		}

	});

	$(window).on("resize", methodToFixLayout);


	//Tools
	$('#tools .points_container span, #tools .media .media-object, #tools .media .media-body').waypoint(function(direction) {
		if($(this).css("opacity") == 1)
			$(this).css({ opacity: 0, visibility: "hidden" });
		else
			$(this).css({ opacity: 1, visibility: "visible" });
	}, { offset: '80%' });

});