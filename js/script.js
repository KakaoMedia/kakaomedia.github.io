$.fn.reverse = [].reverse;

$.fn.scrollView = function (val) {
  return this.each(function () {
  	if(val == null)
    	$('html, body').animate({ scrollTop: $(this).offset().top }, 100, "swing" );
    else
    	$('html, body').animate({ scrollTop: val }, 100, "swing" );
  });
}

function methodToFixLayout(e) {
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

	$(window).on("resize", methodToFixLayout);

	$(".main h2, .main p.lead, #what_we_do .title_info, #tools .point_guide .points_container, " + 
		"#tools .media .media-object, #tools .media .media-body, #tools .media .center_points span, " +
		"#tools .media .img_container .points_container").not("#front_page h2").addClass("animated bounceOut");

	$("#portfolio #portfolio-gallery li").addClass("animated flipOutY");
	$("#front_page .container").addClass("animated bounceIn");
	$("#team .team_container").addClass("animated rotateOut");

	$(window).scroll(function () {
		if ($(this).scrollTop() > 150) {
			$('#front_page .container').removeClass("animated bounceIn").addClass("animated bounceOut");
		}
		
		if ($(this).scrollTop() < 150) {
			$('#front_page .container').removeClass("animated bounceOut").addClass("animated bounceIn");
		}
	}); 

	$(".main h2, .main p.lead, #tools .media .media-body").not("#front_page h2").waypoint(function(direction) {
		if(direction == "up")
			$(this).removeClass("animated bounceIn").addClass("animated bounceOut");
		if(direction == "down")
			$(this).removeClass("animated bounceOut").addClass("animated bounceIn");
	}, { offset: "80%" });

	$("#what_we_do .row").waypoint(function(direction) {		
		if(direction == "up") {
			$(this).find(".title_info").reverse().each(function(index) {
				var item = $(this);
				setTimeout(function(){  item.removeClass("animated bounceIn").addClass("animated bounceOut"); }, index * 300);
			});
		}

		if(direction == "down") {
			$(this).find(".title_info").each(function(index) {
				var item = $(this);
				setTimeout(function(){  item.removeClass("animated bounceOut").addClass("animated bounceIn"); }, index * 300);
			});
		}
	}, { offset: "80%" });

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

	//Tools
	$("#tools .first_img .point_guide").waypoint(function(direction) {
		if(direction == "up") {
			$(this).find(".points_container").reverse().each(function(index) {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceIn").addClass("animated bounceOut"); }, index * 50);
			});
		}

		if(direction == "down") {
			$(this).find(".points_container").each(function(index) {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceOut").addClass("animated bounceIn"); }, index * 50);
			});
		}
	}, { offset: "80%" });

	$("#tools .media:nth-child(2n+2)").waypoint(function(direction) {

		if(direction == "up") {
			var length = $(this).find(".img_container .points_container").length;

			$(this).find(".media-object").each(function() {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceIn").addClass("animated bounceOut"); }, length * 50);				
			});

			$(this).find(".img_container .points_container").reverse().each(function(index) {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceIn").addClass("animated bounceOut"); }, index * 50);
			});

			$(this).find(".center_points span").each(function(index) {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceIn").addClass("animated bounceOut"); }, (index + length) * 50);
			});
		}

		if(direction == "down") {
			var length = $(this).find(".center_points span").length;

			$(this).find(".center_points span").reverse().each(function(index) {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceOut").addClass("animated bounceIn"); }, index * 50);
			});

			$(this).find(".img_container .points_container").each(function(index) {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceOut").addClass("animated bounceIn"); }, (index + length) * 50);
			});

			$(this).find(".media-object").each(function() {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceOut").addClass("animated bounceIn"); }, length * 50);				
			});
		}

	}, { offset: "80%" });

	$("#tools .media:nth-child(2n+3)").waypoint(function(direction) {
		if(direction == "up") {
			var length = $(this).find(".img_container .points_container").length;

			$(this).find(".media-object").each(function() {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceIn").addClass("animated bounceOut"); }, length * 50);				
			});

			$(this).find(".img_container .points_container").each(function(index) {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceIn").addClass("animated bounceOut"); }, index * 50);
			});

			$(this).find(".center_points span").reverse().each(function(index) {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceIn").addClass("animated bounceOut"); }, (index + length) * 50);
			});
		}

		if(direction == "down") {
			var length = $(this).find(".center_points span").length;

			$(this).find(".center_points span").each(function(index) {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceOut").addClass("animated bounceIn"); }, index * 50);
			});

			$(this).find(".img_container .points_container").reverse().each(function(index) {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceOut").addClass("animated bounceIn"); }, (index + length) * 50);
			});

			$(this).find(".media-object").each(function() {
				var item = $(this);
				setTimeout(function() { item.removeClass("animated bounceOut").addClass("animated bounceIn"); }, length * 50);				
			});
		}

	}, { offset: "80%" });

	//PORTFOLIO
	var item, overlay, clipPropFirst, clipPropLast;

	$("#portfolio #portfolio-gallery li").waypoint(function(direction) {
		if(direction == "up")
			$(this).removeClass("animated flipInY").addClass("animated flipOutY");
		if(direction == "down")
			$(this).removeClass("animated flipOutY").addClass("animated flipInY");
	}, { offset: "80%" });

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

	//Team
	$("#team .team_container").waypoint(function(direction) {
		if(direction == "up")
			$(this).removeClass("animated rotateIn").addClass("animated rotateOut");
		if(direction == "down")
			$(this).removeClass("animated rotateOut").addClass("animated rotateIn");
	}, { offset: "80%" });

});