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
  },
   submitHandler: function(form, event) { 
      event.preventDefault();
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
    var botonEnviar_text = botonEnviar.text();

    // Event listener para el formulario de contacto.
	form.submit(function(event) {
	    // Previene envio de formulario por defecto en el navegador.
	    event.preventDefault();

	    formMessages.text('');

	    // Serializar los datos del formulario.
		var formData = form.serializeObject();

		if(formData.uuid !== "" && formData.name !== "" && formData.subject !== "" && formData.menssage !== "") {

			//Cambiar estado de boton enviar

			botonEnviar.css( "background-color", "lightseagreen" );
			botonEnviar.text(form_messages.sending_button_text);

					// Envio  del formulario usando AJAX.
			$.ajax({
			    type: 'POST',
			    url: form.attr('action'),
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
				    formMessages.removeClass('alert alert-danger');
				    formMessages.addClass('success');
				    botonEnviar.css( "background-color", "darkorange" );
				    botonEnviar.text(form_messages.sent_button_text);
				    // Imprimir lenguage en el div de mensajes.
				    formMessages.text(form_messages.success_message);

            // tracking del evento a Google Analytics
            ga('send','event','Contact','Formlulario de contacto');

				    // limpiar el formulario.
				    $('#name').val('');
				    $('#email').val('');
				    $('#subject').val('');
				    $('#message').val('');
				  },
				  error: function(data) {
				    // Asegurarse que el formulario de mensajes tiene la clase 'error'
				    formMessages.removeClass('alert alert-success');
				    formMessages.addClass('alert alert-error');

				    // Imprimir mensaje de error en el div.
				    if (data.responseText !== '') {
				        formMessages.text(form_messages.error_message);
				    } else {
				        formMessages.text(form_messages.error_message_complete);
				    }

				    botonEnviar.text(botonEnviar_text);
				    botonEnviar.css( "background", "none" );
				  }
			});

		} else {
			$(formMessages).removeClass('alert alert-info');
			$(formMessages).text(form_messages.require_error_message);
		}




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
    var time = 20; // delay time
    var distance = 50; // delta point was 350 
    // Dom where it will apply 
    $('html, body').stop().animate({
        scrollTop: $(window).scrollTop() - (distance * delta)
    }, time );
}



//$("document").on("ready page:change", function() {
$("document").ready(function() {
	// Variable declaration
	var item, overlay, clipPropFirst, clipPropLast, lang, desc_url;
	var winWidth = $(window).outerWidth() + 17;
	var carousel_interval = 2750;
	var what_we_do_curr_item_with_focus = "-1";
	var portfolio_prods = [];
	var itemOnDisplay = false;
	var pagination_index = 0;
	var portfolio_item_index = 0;
	var page_limit = 7;

	//Change the elements to act as expected with javascript enabled
	$('.noscript').css('display', 'none');
	$('.navbar').css('display', 'block');
	$('#tools').css('display', 'block');
	$('#portfolio').css('display', 'block');
	$('#contact .form_container').css('display', 'block');
	$('#quote .rotate').css('display', 'block');
	$('#portfolio #ptf_showcase .left').css('display', 'none');

  $('#front_page > .container').css( 'top', (parseInt(($('body > header').height() - $('#front_page > .container').height()) / 2) - 150).toString() + "px");  // "-150" is cause of padding to every section in the webpage

	function methodToFixLayout(e) {
		var res;
    winWidth = $(window).outerWidth() + 17;

    $('#front_page > .container').css( 'top', (parseInt(($('body > header').height() - $('#front_page > .container').height()) / 2) - 150).toString() + "px");  // "-150" is cause of padding to every section in the webpage

    $('#descr-row').empty();

		$("#what_we_do #second-lead .info").hide();
		$("#what_we_do #second-lead .title_info").css("color", "#FFF");
		what_we_do_curr_item_with_focus = "-1";
		$("#what_we_do .first_group, #what_we_do .second_group").height("160px");
		$("#what_we_do").css("padding-bottom", "30px");

		if(winWidth >= 768 && winWidth <= 991) {
	    	$("#what_we_do #first_group, #what_we_do #second_group").height(0);
	    	$("#what_we_do .info:visible").parent().parent().height(($("#what_we_do .info:visible").height() * 2) - 80);
	    } else if(winWidth > 991) {
	    	$("#what_we_do").css("padding-bottom", $("#what_we_do .info:visible").height() + 50);
	    	$("#what_we_do .first_group, #what_we_do .second_group").height("0");
	    }

	    if(winWidth <= 991)
	    {
	    	page_limit = 6;
	    }
	    else {
	    	page_limit = 7;
	    }

	    if(itemOnDisplay) {
	    	pagination_index = page_limit * Math.floor(portfolio_item_index / page_limit);
	    }
	    else {
	    	pagination_index = page_limit * Math.floor(pagination_index / page_limit);
	    }
	    
		$("#portfolio-info .close").triggerHandler("click");

		$('#portfolio #ptf_showcase .right').css('display', 'none');
		$('#portfolio #ptf_showcase .left').css('display', 'none');
		if(pagination_index + page_limit < portfolio_prods.length) {
			if(winWidth > 603) {
				$('#portfolio #ptf_showcase .right').css('display', 'block');	
			}
		}
		if(pagination_index - page_limit >= 0) {
			if(winWidth > 603) {
				$('#portfolio #ptf_showcase .left').css('display', 'block');
			}
		}
	}

	$(window).on("resize", methodToFixLayout);

	$('.navbar').affix({
	    offset: { top: 625, bottom: function () {
	        	return (this.bottom = $('.footer').outerHeight(true));
      		}
		}
  	});

  	$(".rotate").textrotator({
  		animation: "dissolve",
  		separator: ";;;",
  		speed: 2000
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
	$("#what_we_do .title_info").on('click', function() {
		var $desc, $row, $cell, $info_desc, $glyph;
		//$("#what_we_do #second-lead .info").hide();
		if(winWidth < 768) {
			$cell = $(this).parent().find(".info");
			$glyph = $('<span class="icon-up-dir fontello"></span>');
			switch(true){
				case winWidth > 560:
					$glyph.css("left", "45.5%");
					break;
				case winWidth > 450:
					$glyph.css("left", "45%");
					break;
				case winWidth > 400:
					$glyph.css("left", "44%");
					break;
				default:
					$glyph.css("left", "42%");
			}
			$glyph.appendTo($cell);
			$cell.toggle("slow");
			return;
		}
		else if(winWidth < 992)
		{
			$("#what_we_do #second-lead .title_info").css("color", "#FFF");
			$(this).css("color", "#30BAA4");
		} 
		
		$row = $('#descr-row');
		$row.empty();

		$desc = $('<div id="descr" class="info"></div>');
		$desc.appendTo($row);
		
		$glyph = $('<span class="icon-up-dir fontello"></span>');
		$glyph.appendTo($desc);

		$info_desc = $('<p id="info_desc"></p>');
		$info_desc.text($(this).parent().find(".info").find("p").text());
		$info_desc.appendTo($desc);

		switch(true) { // the else (default) is winWidth > 768
			case $(this).attr("data-nth") === "1":
				switch(true) {
					case winWidth > 1200:
						$glyph.css("left", "4.4%");
						break;
					default:
						$glyph.css("left", "4.4%");
				}
				break;
			case $(this).attr("data-nth") === "2":
				switch(true) {
					case winWidth > 1200:
						$glyph.css("left", "32.6%");
						break;
					case winWidth > 991:
						$glyph.css("left", "31.5%");
						break;
					default:
						$glyph.css("right", "10%");
				}
				break;
			case $(this).attr("data-nth") === "3":
				switch(true) {
					case winWidth > 1200:
						$glyph.css("right", "33.5%");
						break;
					case winWidth > 991:
						$glyph.css("right", "32.25%");
						break;
					default:
						$glyph.css("left", "5.5%");
				}
				break;
			case $(this).attr("data-nth") === "4":
				switch(true) {
					case winWidth > 1200:
						$glyph.css("right", "5%");
						break;
					case winWidth > 991:
						$glyph.css("right", "3.5%");
						break;
					default:
						$glyph.css("right", "10%");
				}
				break;
			default:
				$glyph.css("display", "none");
		}
		if(what_we_do_curr_item_with_focus === $(this).attr("data-nth")){
			$('#descr').slideUp("slow");
			what_we_do_curr_item_with_focus = "-1";
		} else {
			$('#descr').slideUp("slow");
			$('#descr').slideDown("medium");
			$("#what_we_do").css("padding-bottom", "30px");
			what_we_do_curr_item_with_focus = $(this).attr("data-nth");
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
	switch(true) {
		case document.documentElement.lang.indexOf('en') > -1:
			lang = 'en'
			break;
		case document.documentElement.lang.indexOf('es') > -1:
			lang = 'es'
			break;
		default:
			lang = 'es'
	}
	desc_url = '/json/portfolio-' + lang + '.json' 
	$.getJSON(desc_url,
		function( data ) {
			for(var index = 0; index < data.portfolio.length - 1; index++) {
				portfolio_prods.push(data.portfolio[index]);
			}
			if(winWidth <= 991)
		    {
		    	page_limit = 6;
		    }
		    else {
		    	page_limit = 7;
		    }
		    pagination_index = Math.floor(portfolio_item_index / page_limit) * page_limit;
			fillPortfolio();
		}
	);

	function fillPortfolio(){
		var $ptf_li, $ptf_name, $ptf_div, $ptf_img, $ptf_foot, last_index;

		last_index = Math.min(portfolio_prods.length, pagination_index + page_limit);
		$("#portfolio-gallery").empty();

		for(var index = pagination_index; index < last_index; index++) {
			$ptf_li = $("<li></li>");
			$ptf_name = $("<span class='item-name'>" + portfolio_prods[index].name + "</span>");
			$ptf_div = $("<div class='darker'></div>");
			$ptf_img = $("<div class='item-img'></div>");
			$ptf_foot = $("<p><span></span>" + portfolio_prods[index].footer + "</p>");
			$ptf_img.css("background-image", "url('/img/"+portfolio_prods[index].image+"')");
			$ptf_li.append($ptf_name, $ptf_div, $ptf_img, $ptf_foot);
			$("#portfolio-gallery").append($ptf_li);
			$ptf_li.attr("data-index", index );
		}
		if(pagination_index - page_limit < 0){
			$(".ptf_page_prev a").css('display', 'none');
		}
		else {
			$(".ptf_page_prev a").css('display', 'inline-block');
		}
		if(pagination_index + page_limit >= portfolio_prods.length) {
			$(".ptf_page_next a").css('display', 'none');	
		}
		else {
			$(".ptf_page_next a").css('display', 'inline-block');
		}
	};

	function fillPortfolioShowCase(){
		$('#ptf_showcase').carousel('pause').removeData();
		$('#ptf_showcase').carousel({interval:false});
		$ptf_car_ind = $('#ptf_showcase .carousel-indicators');
		$ptf_car_ind.empty();
	}

	function fillProjectData(){
		var $ptf_li, index, $ptf_li_ind, $ptf_li_inner, $ptf_li_inner_img;
		$('#ptf_brand').text(portfolio_prods[portfolio_item_index].name);
		$('#ptf_year').text(portfolio_prods[portfolio_item_index].year);

		$('#ptf_work').empty();
		for(var i = 0; i < portfolio_prods[portfolio_item_index].works.length; i++) {
			$ptf_li = $("<li>" + portfolio_prods[portfolio_item_index].works[i].work  + "</li>");
			$('#ptf_work').append($ptf_li);
		}

		$('#ptf_website').attr('href', portfolio_prods[portfolio_item_index].website );
		index = portfolio_prods[portfolio_item_index].website.indexOf("://");
		if(index > -1) {
			$('#ptf_website').text(portfolio_prods[portfolio_item_index].website.substring(index+3, portfolio_prods[portfolio_item_index].website.length));
		}
		$.ajax({
			url: portfolio_prods[portfolio_item_index].rel_url,
			dataType: "html",
			type: 'GET',
			success: function(data){$('#ptf_desc').html(data)}
		});
		$('#ptf_proj_gal').carousel('pause').removeData();
		$('#ptf_proj_gal').carousel({interval:carousel_interval});
		$ptf_car_ind = $('#ptf_proj_gal .carousel-indicators');
		$ptf_car_ind.empty();
		$ptf_li_ind = $("<li data-target='#ptf_proj_gal' data-slide-to='0' class='active' ></li>");
		$ptf_car_ind.append($ptf_li_ind);
		$ptf_car_inner = $('#ptf_proj_gal .carousel-inner');
		$ptf_car_inner.empty();
		$ptf_li_inner = $("<div class='item active'></div>");
		$ptf_li_inner_img = $("<img alt ='photo' src='" + "/img/" + portfolio_prods[portfolio_item_index].gallery[0].img + "'>");
		$ptf_li_inner.append( $ptf_li_inner_img );
		$ptf_car_inner.append($ptf_li_inner);
		for(var i = 1; i < portfolio_prods[portfolio_item_index].gallery.length; i++) {
			$ptf_li_ind = $("<li data-target='#ptf_proj_gal' data-slide-to='" + i.toString() + "' ></li>");
			$ptf_car_ind.append($ptf_li_ind);
			$ptf_li_inner = $("<div class='item'></div>");
			$ptf_li_inner_img = $("<img alt ='photo' src='" + "/img/" + portfolio_prods[portfolio_item_index].gallery[i].img + "'>");
			$ptf_li_inner.append($ptf_li_inner_img);
			$ptf_car_inner.append($ptf_li_inner);
		}
		pagination_index = portfolio_item_index - (portfolio_item_index % page_limit);
		itemOnDisplay = true;
	}

	function setClipDimensions(item, overlay) {
		clipPropFirst = "rect(" + (item.offset().top - overlay.offset().top) + "px, " + (item.offset().left + item.outerWidth()) + "px, " + ((item.offset().top - overlay.offset().top) + item.outerHeight()) + "px ," + item.offset().left + "px)";
		clipPropLast = "rect(0px " + $("#portfolio").outerWidth() + "px " + $("#portfolio").outerHeight() + "px 0px)";
		overlay.css({ clip: clipPropFirst });
	}

	$("#portfolio #portfolio-gallery li").waypoint(function(direction) {
		if(direction == "up")
			$(this).removeClass("animated-flip fadeInUp").addClass("animated-flip fadeOutUp");
		if(direction == "down")
			$(this).removeClass("animated-flip fadeOutUp").addClass("animated-flip fadeInUp");
	}, { offset: "80%" });

	$("#portfolio-gallery").on('click', 'li', function() {
		var img_load = $("#ptf_footer_load_graph");
		img_load.css("position", "relative");
		img_load.css("right", "-10%");
		img_load.css("display", "inline-block");
		img_load.appendTo($(this).find("p"));

		portfolio_item_index = parseInt( $(this).attr('data-index') );

		overlay = $("#portfolio-info");
		fillProjectData();

		item = $(this);
		setClipDimensions(item, overlay);

		setTimeout(function() {
			overlay.css({ opacity: 1, "z-index": 10000 }).removeClass("hide-info");
			overlay.animate({ "clip": clipPropLast }, "fast", "swing", function() {
				$("#portfolio").scrollView().css("padding-bottom", 0);
			img_load.css("display", "none");
			img_load.appendTo($("#portfolio-gallery").parent());
			});			
		}, 500);

	});

	var ptf_page_next_on_click = function(){ //it does not cycle
			if(pagination_index + page_limit < portfolio_prods.length) {
				pagination_index += page_limit
				if(pagination_index + page_limit < portfolio_prods.length) {
					if(winWidth > 603) {
						$('#portfolio #ptf_showcase .left').css('display', 'block');
					}
				}
				else {
					$('#portfolio #ptf_showcase .right').css('display', 'none');
				}
				fillPortfolio();
			}
		};

	var ptf_page_prev_on_click = function(){ //it does not cycle
			if(pagination_index - page_limit >= 0) {
				pagination_index -= page_limit;
				if(pagination_index - page_limit >= 0) {
					if(winWidth > 603) {
						$('#portfolio #ptf_showcase .right').css('display', 'block');
					}
				}
				else {
					$('#portfolio #ptf_showcase .left').css('display', 'none');
				}
				fillPortfolio();
			}
		};

	$('#portfolio #ptf_showcase .left').on('click', ptf_page_prev_on_click);
	$('#portfolio #ptf_showcase .right').on('click', ptf_page_next_on_click);
	
	$(".ptf_page_prev a").on("click", ptf_page_prev_on_click);
	$(".ptf_page_next a").on("click", ptf_page_next_on_click);
	

	$('#portfolio-nav-proj-prev').on('click', //it does cycle
		function(){
			if(portfolio_item_index > 1) {
				portfolio_item_index -= 1;
			}
			else {
				portfolio_item_index = portfolio_prods.length - 1;
			}
			fillProjectData();
		});

	$('#portfolio-nav-proj-next').on('click', //it does cycle
		function(){
			if(portfolio_item_index < portfolio_prods.length - 1) {
				portfolio_item_index += 1;
			}
			else {
				portfolio_item_index = 0;
			}
			fillProjectData();
		});

	//Carousel - Portfolio
	$('.carousel-control.left').on('click', 
		function(){
			$('#ptf_proj_gal').carousel('prev');
		});
	$('.carousel-control.right').on('click', 
		function(){
			$('#ptf_proj_gal').carousel('next');
		});

	$("#portfolio-info .close").on("click", function() {
		fillPortfolio(); //Llena el portfolio en la pagina correcta y si hay algun proyecto abierto lo cierra.
		itemOnDisplay = false;
		if(typeof item !== "undefined") {
			var curr_index = (portfolio_item_index % page_limit) + 1; //nth-child is based 1
			item = $('#portfolio-gallery li:nth-child(' + curr_index.toString() + ')');

			setClipDimensions(item, overlay);

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