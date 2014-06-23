$("#formulario_de_contacto").validate({rules:{name:"required",email:{required:!0,email:!0},subject:"required",message:"required"},submitHandler:function(c,f){f.preventDefault()}}); (function(c){c.fn.serializeObject=function(){var f=this,m={},d={},n=/^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,r=/[a-zA-Z0-9_]+|(?=\[\])/g,s=/^$/,p=/^\d+$/,g=/^[a-zA-Z0-9_]+$/;this.build=function(c,f,e){c[f]=e;return c};this.push_counter=function(c){void 0===d[c]&&(d[c]=0);return d[c]++};c.each(c(this).serializeArray(),function(){if(n.test(this.name)){for(var d,q=this.name.match(r),e=this.value,k=this.name;void 0!==(d=q.pop());)k=k.replace(new RegExp("\\["+d+"\\]$"),""),d.match(s)?e= f.build([],f.push_counter(k),e):d.match(p)?e=f.build([],d,e):d.match(g)&&(e=f.build({},d,e));m=c.extend(!0,m,e)}});return m}})(jQuery); $(function(){var c=$("#formulario_de_contacto"),f=$("#form-messages"),m=$("#boton-enviar");$(c).submit(function(d){d.preventDefault();d=$(c).serializeObject();""!==d.uuid&&""!==d.name&&""!==d.subject&&""!==d.menssage?($(m).css("background-color","lightseagreen"),$(m).text(form_messages.sending_button_text),$.ajax({type:"POST",url:$(c).attr("action"),crossDomain:!0,contentType:"text/plain",data:JSON.stringify({uuid:d.uuid,name:d.name,subject:d.subject,email:d.email,message:d.message}),headers:{"Content-Type":"application/json; charset=utf-8"}, success:function(c){$(f).removeClass("alert alert-danger");$(f).addClass("success");$("#boton-enviar").css("background-color","darkorange");$(m).text(form_messages.sent_button_text);$(f).text(form_messages.success_message);$("#name").val("");$("#email").val("");$("#subject").val("");$("#message").val("")},error:function(c){$(f).removeClass("alert alert-success");$(f).addClass("alert alert-error");""!==c.responseText?$(f).text(form_messages.error_message):$(f).text(form_messages.error_message_complete)}})): ($(f).removeClass("alert alert-info"),$(f).text(form_messages.require_error_message))})});$.fn.reverse=[].reverse;$.fn.scrollView=function(c){return this.each(function(){null==c?$("html, body").animate({scrollTop:$(this).offset().top},100,"swing"):$("html, body").animate({scrollTop:c},100,"swing")})}; $(function(){$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var c=$(this.hash),c=c.length?c:$("[name="+this.hash.slice(1)+"]");if(c.length)return $("html,body").animate({scrollTop:c.offset().top},1E3),!1}})});window.addEventListener&&window.addEventListener("DOMMouseScroll",wheel,!1);window.onmousewheel=document.onmousewheel=wheel; function wheel(c){var f=0;c.wheelDelta?f=c.wheelDelta/120:c.detail&&(f=-c.detail/3);handle(f);c.preventDefault&&c.preventDefault();c.preventDefault()}function handle(c){$("html, body").stop().animate({scrollTop:$(window).scrollTop()-50*c},20)} $("document").ready(function(){function c(){var a,b,c,d,f,h;h=Math.min(e.length,k+l);$("#portfolio-gallery").empty();for(var g=k;g<h;g++)a=$("<li></li>"),b=$("<span class='item-name'>"+e[g].name+"</span>"),c=$("<div class='darker'></div>"),d=$("<div class='item-img'></div>"),f=$("<p><span></span>"+e[g].footer+"</p>"),d.css("background-image","url('/img/"+e[g].image+"')"),a.append(b,c,d,f),$("#portfolio-gallery").append(a),a.attr("data-index",g);0>k-l?$(".ptf_page_prev a").css("display","none"):$(".ptf_page_prev a").css("display", "inline-block");k+l>=e.length?$(".ptf_page_next a").css("display","none"):$(".ptf_page_next a").css("display","inline-block")}function f(){var a,b,c;$("#ptf_brand").text(e[h].name);$("#ptf_year").text(e[h].year);$("#ptf_work").empty();for(b=0;b<e[h].works.length;b++)a=$("<li>"+e[h].works[b].work+"</li>"),$("#ptf_work").append(a);$("#ptf_website").attr("href",e[h].website);b=e[h].website.indexOf("://");-1<b&&$("#ptf_website").text(e[h].website.substring(b+3,e[h].website.length));$.ajax({url:e[h].rel_url, dataType:"html",type:"GET",success:function(b){$("#ptf_desc").html(b)}});$("#ptf_proj_gal").carousel("pause").removeData();$("#ptf_proj_gal").carousel({interval:t});$ptf_car_ind=$("#ptf_proj_gal .carousel-indicators");$ptf_car_ind.empty();a=$("<li data-target='#ptf_proj_gal' data-slide-to='0' class='active' ></li>");$ptf_car_ind.append(a);$ptf_car_inner=$("#ptf_proj_gal .carousel-inner");$ptf_car_inner.empty();a=$("<div class='item active'></div>");c=$("<img alt ='photo' src='/img/"+e[h].gallery[0].img+ "'>");a.append(c);$ptf_car_inner.append(a);for(b=1;b<e[h].gallery.length;b++)a=$("<li data-target='#ptf_proj_gal' data-slide-to='"+b.toString()+"' ></li>"),$ptf_car_ind.append(a),a=$("<div class='item'></div>"),c=$("<img alt ='photo' src='/img/"+e[h].gallery[b].img+"'>"),a.append(c),$ptf_car_inner.append(a);k=h-h%l}function m(a,b){r="rect("+(a.offset().top-b.offset().top)+"px, "+(a.offset().left+a.outerWidth())+"px, "+(a.offset().top-b.offset().top+a.outerHeight())+"px ,"+a.offset().left+"px)";s= "rect(0px "+$("#portfolio").outerWidth()+"px "+$("#portfolio").outerHeight()+"px 0px)";b.css({clip:r})}var d,n,r,s,p,g=$(window).outerWidth()+17,t=2750,q="-1",e=[],k=0,h=0,u=0,l=7;$(window).on("resize",function(a){g=$(window).outerWidth()+17;$("#descr-row").empty();$("#what_we_do #second-lead .info").hide();$("#what_we_do #second-lead .title_info").css("color","#FFF");q="-1";$("#what_we_do .first_group, #what_we_do .second_group").height("160px");$("#what_we_do").css("padding-bottom","30px");768<= g&&991>=g?($("#what_we_do #first_group, #what_we_do #second_group").height(0),$("#what_we_do .info:visible").parent().parent().height(2*$("#what_we_do .info:visible").height()-80)):991<g&&($("#what_we_do").css("padding-bottom",$("#what_we_do .info:visible").height()+50),$("#what_we_do .first_group, #what_we_do .second_group").height("0"));l=991>=g?6:7;k=Math.floor(h/l)*l;$("#portfolio-info .close").triggerHandler("click")});$(".navbar").affix({offset:{top:625,bottom:function(){return this.bottom= $(".footer").outerHeight(!0)}}});$(".rotate").textrotator({animation:"dissolve",separator:";;;",speed:2E3});$(".main h2, .main p.lead, #what_we_do .title_info").not("#front_page h2").addClass("animated fadeOut");$("#portfolio #portfolio-gallery li").addClass("animated-flip fadeOutUp");$("#front_page .container").addClass("animated fadeIn");$("#team .team_container").addClass("animated fadeOutUp");$(window).scroll(function(){150<$(this).scrollTop()&&$("#front_page .container").removeClass("animated fadeIn").addClass("animated fadeOut"); 150>$(this).scrollTop()&&$("#front_page .container").removeClass("animated fadeOut").addClass("animated fadeIn")});$(".main h2, .main p.lead").not("#front_page h2").waypoint(function(a){"up"==a&&$(this).removeClass("animated fadeIn").addClass("animated fadeOut");"down"==a&&$(this).removeClass("animated fadeOut").addClass("animated fadeIn")},{offset:"80%"});$("#what_we_do .row").waypoint(function(a){"up"==a&&$(this).find(".title_info").reverse().each(function(b){var a=$(this);setTimeout(function(){a.removeClass("animated fadeIn").addClass("animated fadeOut")}, 100*b)});"down"==a&&$(this).find(".title_info").each(function(b){var a=$(this);setTimeout(function(){a.removeClass("animated fadeOut").addClass("animated fadeIn")},100*b)})},{offset:"80%"});$("#what_we_do .title_info").on("click",function(){var a,b,c;if(768>g){a=$(this).parent().find(".info");b=$('<span class="icon-up-dir fontello"></span>');switch(!0){case 560<g:b.css("left","45.5%");break;case 450<g:b.css("left","45%");break;case 400<g:b.css("left","44%");break;default:b.css("left","42%")}b.appendTo(a); a.toggle("slow")}else{992>g&&($("#what_we_do #second-lead .title_info").css("color","#FFF"),$(this).css("color","#30BAA4"));b=$("#descr-row");b.empty();a=$('<div id="descr" class="info"></div>');a.appendTo(b);b=$('<span class="icon-up-dir fontello"></span>');b.appendTo(a);c=$('<p id="info_desc"></p>');c.text($(this).parent().find(".info").find("p").text());c.appendTo(a);switch(!0){case "1"===$(this).attr("data-nth"):switch(!0){case 1200<g:b.css("left","4.4%");break;default:b.css("left","4.4%")}break; case "2"===$(this).attr("data-nth"):switch(!0){case 1200<g:b.css("left","32.6%");break;case 991<g:b.css("left","31.5%");break;default:b.css("right","10%")}break;case "3"===$(this).attr("data-nth"):switch(!0){case 1200<g:b.css("right","33.5%");break;case 991<g:b.css("right","32.25%");break;default:b.css("left","5.5%")}break;case "4"===$(this).attr("data-nth"):switch(!0){case 1200<g:b.css("right","5%");break;case 991<g:b.css("right","3.5%");break;default:b.css("right","10%")}break;default:b.css("display", "none")}q===$(this).attr("data-nth")?($("#descr").slideUp("slow"),q="-1"):($("#descr").slideUp("slow"),$("#descr").slideDown("medium"),$("#what_we_do").css("padding-bottom","30px"),q=$(this).attr("data-nth"))}});$("#tools .first_img .point_guide").waypoint(function(a){"up"==a&&$(this).find(".points_container").reverse().each(function(b){var a=$(this);setTimeout(function(){a.css("opacity",0)},15*b)});"down"==a&&$(this).find(".points_container").each(function(a){var c=$(this);setTimeout(function(){c.css("opacity", 1)},15*a)})},{offset:"80%"});$("#tools .resume_tools .media-body").waypoint(function(a){var b=$(this);"up"==a&&setTimeout(function(){b.css("opacity",0)},100);"down"==a&&setTimeout(function(){b.css("opacity",1)},100)},{offset:"80%"});$("#tools .media:nth-child(2n+2)").waypoint(function(a){if("up"==a){var b=$(this).find(".img_container .points_container").length;$(this).find(".media-object").each(function(){var a=$(this);setTimeout(function(){a.css("opacity",0)},15*b)});$(this).find(".img_container .points_container").reverse().each(function(a){var b= $(this);setTimeout(function(){b.css("opacity",0)},15*a)});$(this).find(".center_points span").each(function(a){var c=$(this);setTimeout(function(){c.css("opacity",0)},15*(a+b))})}"down"==a&&(b=$(this).find(".center_points span").length,$(this).find(".center_points span").reverse().each(function(a){var b=$(this);setTimeout(function(){b.css("opacity",1)},15*a)}),$(this).find(".img_container .points_container").each(function(a){var c=$(this);setTimeout(function(){c.css("opacity",1)},15*(a+b))}),$(this).find(".media-object").each(function(){var a= $(this);setTimeout(function(){a.css("opacity",1)},15*b)}))},{offset:"80%"});$("#tools .media:nth-child(2n+3)").waypoint(function(a){if("up"==a){var b=$(this).find(".img_container .points_container").length;$(this).find(".media-object").each(function(){var a=$(this);setTimeout(function(){a.css("opacity",0)},15*b)});$(this).find(".img_container .points_container").each(function(a){var b=$(this);setTimeout(function(){b.css("opacity",0)},15*a)});$(this).find(".center_points span").reverse().each(function(a){var c= $(this);setTimeout(function(){c.css("opacity",0)},15*(a+b))})}"down"==a&&(b=$(this).find(".center_points span").length,$(this).find(".center_points span").each(function(a){var b=$(this);setTimeout(function(){b.css("opacity",1)},15*a)}),$(this).find(".img_container .points_container").reverse().each(function(a){var c=$(this);setTimeout(function(){c.css("opacity",1)},15*(a+b))}),$(this).find(".media-object").each(function(){var a=$(this);setTimeout(function(){a.css("opacity",1)},15*b)}))},{offset:"80%"}); switch(!0){case -1<document.documentElement.lang.indexOf("en"):p="en";break;case -1<document.documentElement.lang.indexOf("es"):p="es";break;default:p="es"}$.getJSON("/json/portfolio-"+p+".json",function(a){for(var b=0;b<a.portfolio.length-1;b++)e.push(a.portfolio[b]);l=991>=g?6:7;k=Math.floor(h/l)*l;c()});$("#portfolio #portfolio-gallery li").waypoint(function(a){"up"==a&&$(this).removeClass("animated-flip fadeInUp").addClass("animated-flip fadeOutUp");"down"==a&&$(this).removeClass("animated-flip fadeOutUp").addClass("animated-flip fadeInUp")}, {offset:"80%"});$("#portfolio-gallery").on("click","li",function(){var a=$("#ptf_footer_load_graph");a.css("position","relative");a.css("right","-10%");a.css("display","inline-block");a.appendTo($(this).find("p"));h=u=parseInt($(this).attr("data-index"));n=$("#portfolio-info");f();d=$(this);m(d,n);setTimeout(function(){n.css({opacity:1,"z-index":1E4}).removeClass("hide-info");n.animate({clip:s},"fast","swing",function(){$("#portfolio").scrollView().css("padding-bottom",0);a.css("display","none"); a.appendTo($("#portfolio-gallery").parent())})},500)});$(".ptf_page_next a").on("click",function(){k+l<e.length&&(k+=l,c())});$(".ptf_page_prev a").on("click",function(){0<=k-l&&(k-=l,c())});$("#portfolio-nav-proj-prev").on("click",function(){h=1<h?h-1:e.length-1;f()});$("#portfolio-nav-proj-next").on("click",function(){h=h<e.length-1?h+1:0;f()});$(".carousel-control.left").on("click",function(){$("#ptf_proj_gal").carousel("prev")});$(".carousel-control.right").on("click",function(){$("#ptf_proj_gal").carousel("next")}); $("#portfolio-info .close").on("click",function(){c();"undefined"!==typeof d&&(d=$("#portfolio-gallery li:nth-child("+(h%l+1).toString()+")"),m(d,n),n.animate({clip:r},"fast","swing"),d.scrollView(d.offset().top-100),$("#portfolio").css("padding-bottom","150px"),setTimeout(function(){n.animate({opacity:0,"z-index":-1E4},"fast","swing",function(){n.addClass("hide-info")})},500))});$("#team .team_container").waypoint(function(a){"up"==a&&$(this).removeClass("animated fadeInUp").addClass("animated fadeOutUp"); "down"==a&&$(this).removeClass("animated fadeOutUp").addClass("animated fadeInUp")},{offset:"80%"})});