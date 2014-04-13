$.fn.scrollView = function (val) {
  return this.each(function () {
  	if(val == null)
    	$('html, body').animate({ scrollTop: $(this).offset().top }, 100, "swing" );
    else
    	$('html, body').animate({ scrollTop: val }, 100, "swing" );
  });
}

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
			$('#front_page .container').stop().animate({ opacity: 0 }, "slow");
		}
		
		if ($(this).scrollTop() < 100) {
			$('#front_page .container').stop().animate({ opacity: 1 }, "slow");
		}
	}); 

	$('.main h2').waypoint(function(direction) {
		if(direction == "up")
			$(this).stop().animate({ opacity: 0 }, "slow");
		else
			$(this).stop().animate({ opacity: 1 }, "slow");
	}, { offset: '80%' });

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
		if(direction == "up")
			$(this).css({
				opacity: 0,
				transform: "matrix(0.5, 0, 0, 0.5, 0, 0)" ,
				"-o-transform": "matrix(0.5, 0, 0, 0.5, 0, 0)" ,
				"-ms-transform": "matrix(0.5, 0, 0, 0.5, 0, 0)" ,
				"-mz-transform": "matrix(0.5, 0, 0, 0.5, 0, 0)" ,
				"-webkit-transform": "matrix(0.5, 0, 0, 0.5, 0, 0)" ,
			});
		else
			$(this).css({ 
				opacity: 1, 
				transform: "matrix(1, 0, 0, 1, 0, 0)" ,
				"-o-transform": "matrix(1, 0, 0, 1, 0, 0)" ,
				"-ms-transform": "matrix(1, 0, 0, 1, 0, 0)" ,
				"-mz-transform": "matrix(1, 0, 0, 1, 0, 0)" ,
				"-webkit-transform": "matrix(1, 0, 0, 1, 0, 0)" ,
			});
	}, { offset: '80%' });

	//PORTFOLIO
	var item, overlay, clipPropFirst, clipPropLast;

	$("#portfolio-gallery li").on("click", function() {

		item = $(this);
		overlay = $("#portfolio-info");

		clipPropFirst = "rect(" + (item.offset().top - overlay.offset().top) + "px, " + (item.offset().left + item.outerWidth()) + "px, " + ((item.offset().top - overlay.offset().top) + item.outerHeight()) + "px ," + item.offset().left + "px)";
		clipPropLast = "rect(0px " + $("#portfolio").outerWidth() + "px " + $("#portfolio").outerHeight() + "px 0px)";
		
		overlay.css({ clip: clipPropFirst });

		var img = item.find(".item-img").css("background-image").replace("url(", "").replace(")", "");
		overlay.find("img").attr("src", img);

		setTimeout(function() {
			overlay.css({ opacity: 1, "z-index": 10000 }).removeClass("hide-info");
			overlay.animate({ "clip": clipPropLast }, "fast", "swing", function() {
				$("#portfolio").scrollView().css("padding-bottom", 0);
			});			
		}, 500);

	});

	$("#portfolio-info .close").on("click", function() {
		if(typeof item !== "undefined") {
			overlay.animate({ "clip": clipPropFirst }, "fast", "swing");
			item.scrollView(item.offset().top - 100);
			$("#portfolio").css("padding-bottom", "150px");

			setTimeout(function() {
				overlay.animate({ "opacity": 0, "z-index": -10000 }, "fast", "swing", function() { 
					overlay.addClass("hide-info"); 
				});
			}, 500)
		}
	});

});