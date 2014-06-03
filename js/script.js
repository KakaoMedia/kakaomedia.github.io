//Validaciones sobre formulario de contacto

$("#formulario_de_contacto").validate({
  rules: {
    name: "required",
    email: {
      required: true,
      email: true
    },
    subject: "required",
    message: "required"
  }
});

// Convertir parametros de formulario en objeto para envio mediante AJAX

(function($){
    $.fn.serializeObject = function(){

        var self = this,
            json = {},
            push_counters = {},
            patterns = {
                "validate": /^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,
                "key":      /[a-zA-Z0-9_]+|(?=\[\])/g,
                "push":     /^$/,
                "fixed":    /^\d+$/,
                "named":    /^[a-zA-Z0-9_]+$/
            };


        this.build = function(base, key, value){
            base[key] = value;
            return base;
        };

        this.push_counter = function(key){
            if(push_counters[key] === undefined){
                push_counters[key] = 0;
            }
            return push_counters[key]++;
        };

        $.each($(this).serializeArray(), function(){

            // skip invalid keys
            if(!patterns.validate.test(this.name)){
                return;
            }

            var k,
                keys = this.name.match(patterns.key),
                merge = this.value,
                reverse_key = this.name;

            while((k = keys.pop()) !== undefined){

                // adjust reverse_key
                reverse_key = reverse_key.replace(new RegExp("\\[" + k + "\\]$"), '');

                // push
                if(k.match(patterns.push)){
                    merge = self.build([], self.push_counter(reverse_key), merge);
                }

                // fixed
                else if(k.match(patterns.fixed)){
                    merge = self.build([], k, merge);
                }

                // named
                else if(k.match(patterns.named)){
                    merge = self.build({}, k, merge);
                }
            }

            json = $.extend(true, json, merge);
        });

        return json;
    };
})(jQuery);




//Envio de petición desde formulario por medio de AJAX

$(function() {


    // obtener el formulario.
    var form = $('#formulario_de_contacto');

    // Obtener div para mensajes.
    var formMessages = $('#form-messages');

    // Obtener boton de enviar
    var botonEnviar = $('#boton-enviar');

    // Event listener para el formulario de contacto.
	$(form).submit(function(event) {
	    // Previene envio de formulario por defecto en el navegador.
	    event.preventDefault();

	    // Serializar los datos del formulario.
		var formData = $(form).serializeObject();

		//Cambiar estado de boton enviar
		$(botonEnviar).css( "background-color", "lightseagreen" );
		$(botonEnviar).text("Sending...");

		// Envio  del formulario usando AJAX.
		$.ajax({
		    type: 'POST',
		    url: $(form).attr('action'),
		    crossDomain: true,
		    contentType: 'text/plain',
		     data: JSON.stringify({
			        uuid: formData.uuid,
			        name: formData.name,
			        subject: formData.subject,
			        email: formData.email,
			        message: formData.message
			    }),
			  headers: {
			    'Content-Type': 'application/json; charset=utf-8'
			  },
			  success: function(data) {
			  	console.log(data);
			    $(formMessages).removeClass('error');
			    $(formMessages).addClass('success');
			    $('#boton-enviar').css( "background-color", "darkorange" );
			    $(botonEnviar).text("Sent")

			    // Imprimir lenguage en el div de mensajes.
			    $(formMessages).text(data.message);

			    // limpiar el formulario.
			    $('#name').val('');
			    $('#email').val('');
			    $('#subject').val('');
			    $('#message').val('');
			  },
			  error: function(data) {
			    // Asegurarse que el formulario de mensajes tiene la clase 'error'
			    $(formMessages).removeClass('success');
			    $(formMessages).addClass('error');

			    // Imprimir mensaje de error en el div.
			    if (data.responseText !== '') {
			        $(formMessages).text(data.responseText);
			    } else {
			        $(formMessages).text('Oops! An error occured and your message could not be sent.');
			    }
			  }
		});
	});


});



/*********************************************/


$.fn.reverse = [].reverse;

$.fn.scrollView = function (val) {
  return this.each(function () {
  	if(val == null)
    	$('html, body').animate({ scrollTop: $(this).offset().top }, 100, "swing" );
    else
    	$('html, body').animate({ scrollTop: val }, 100, "swing" );
  });
}

//SpyScroll
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
  		var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// Smooth Scrool with Mouse Wheel
if (window.addEventListener) window.addEventListener('DOMMouseScroll', wheel, false);
	window.onmousewheel = document.onmousewheel = wheel;
 
function wheel(event) {
    var delta = 0;
    if (event.wheelDelta) delta = event.wheelDelta / 120;
    else if (event.detail) delta = -event.detail / 3;
 
    handle(delta);
    if (event.preventDefault) event.preventDefault();
    event.preventDefault();
}
 
function handle(delta) {
    var time = 400; // delay time
    var distance = 350; // delta point 
    // Dom where it will apply 
    $('html, body').stop().animate({
        scrollTop: $(window).scrollTop() - (distance * delta)
    }, time );
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

	$('.navbar').affix({
	    offset: { top: 625, bottom: function () {
	        	return (this.bottom = $('.footer').outerHeight(true))
      		}
		}
  	});

	$(".main h2, .main p.lead, #what_we_do .title_info").not("#front_page h2").addClass("animated fadeOut");

	$("#portfolio #portfolio-gallery li").addClass("animated-flip fadeOutUp");
	$("#front_page .container").addClass("animated fadeIn");
	$("#team .team_container").addClass("animated fadeOutUp");

	$(window).scroll(function () {
		if ($(this).scrollTop() > 150) {
			$('#front_page .container').removeClass("animated fadeIn").addClass("animated fadeOut");
		}
		
		if ($(this).scrollTop() < 150) {
			$('#front_page .container').removeClass("animated fadeOut").addClass("animated fadeIn");
		}
	}); 

	$(".main h2, .main p.lead").not("#front_page h2").waypoint(function(direction) {
		if(direction == "up")
			$(this).removeClass("animated fadeIn").addClass("animated fadeOut");
		if(direction == "down")
			$(this).removeClass("animated fadeOut").addClass("animated fadeIn");
	}, { offset: "80%" });

	$("#what_we_do .row").waypoint(function(direction) {		
		if(direction == "up") {
			$(this).find(".title_info").reverse().each(function(index) {
				var item = $(this);
				setTimeout(function(){  item.removeClass("animated fadeIn").addClass("animated fadeOut"); }, index * 100);
			});
		}

		if(direction == "down") {
			$(this).find(".title_info").each(function(index) {
				var item = $(this);
				setTimeout(function(){  item.removeClass("animated fadeOut").addClass("animated fadeIn"); }, index * 100);
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
				setTimeout(function() { item.css("opacity", 0); }, index * 15);
			});
		}

		if(direction == "down") {
			$(this).find(".points_container").each(function(index) {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 1); }, index * 15);
			});
		}
	}, { offset: "80%" });

	$("#tools .resume_tools .media-body").waypoint(function(direction) {
		var item = $(this);

		if(direction == "up") {
			setTimeout(function() { item.css("opacity", 0); }, 100);
		}

		if(direction == "down") {
			setTimeout(function() { item.css("opacity", 1); }, 100);
		}
	}, { offset: "80%" });

	$("#tools .media:nth-child(2n+2)").waypoint(function(direction) {

		if(direction == "up") {
			var length = $(this).find(".img_container .points_container").length;

			$(this).find(".media-object").each(function() {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 0); }, length * 15);
			});

			$(this).find(".img_container .points_container").reverse().each(function(index) {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 0); }, index * 15);
			});

			$(this).find(".center_points span").each(function(index) {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 0); }, (index + length) * 15);
			});
		}

		if(direction == "down") {
			var length = $(this).find(".center_points span").length;

			$(this).find(".center_points span").reverse().each(function(index) {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 1); }, index * 15);
			});

			$(this).find(".img_container .points_container").each(function(index) {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 1); }, (index + length) * 15);
			});

			$(this).find(".media-object").each(function() {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 1); }, length * 15);
			});
		}

	}, { offset: "80%" });

	$("#tools .media:nth-child(2n+3)").waypoint(function(direction) {
		if(direction == "up") {
			var length = $(this).find(".img_container .points_container").length;

			$(this).find(".media-object").each(function() {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 0); }, length * 15);
			});

			$(this).find(".img_container .points_container").each(function(index) {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 0); }, index * 15);
			});

			$(this).find(".center_points span").reverse().each(function(index) {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 0); }, (index + length) * 15);
			});
		}

		if(direction == "down") {
			var length = $(this).find(".center_points span").length;

			$(this).find(".center_points span").each(function(index) {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 1); }, index * 15);
			});

			$(this).find(".img_container .points_container").reverse().each(function(index) {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 1); }, (index + length) * 15);
			});

			$(this).find(".media-object").each(function() {
				var item = $(this);
				setTimeout(function() { item.css("opacity", 1); }, length * 15);
			});
		}

	}, { offset: "80%" });

	//PORTFOLIO
	var item, overlay, clipPropFirst, clipPropLast;

	$("#portfolio #portfolio-gallery li").waypoint(function(direction) {
		if(direction == "up")
			$(this).removeClass("animated-flip fadeInUp").addClass("animated-flip fadeOutUp");
		if(direction == "down")
			$(this).removeClass("animated-flip fadeOutUp").addClass("animated-flip fadeInUp");
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
			$(this).removeClass("animated fadeInUp").addClass("animated fadeOutUp");
		if(direction == "down")
			$(this).removeClass("animated fadeOutUp").addClass("animated fadeInUp");
	}, { offset: "80%" });

});