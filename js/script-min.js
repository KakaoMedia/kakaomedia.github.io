$("#formulario_de_contacto").validate({rules:{name:"required",email:{required:!0,email:!0},subject:"required",message:"required"},submitHandler:function(b,d){d.preventDefault()}}); (function(b){b.fn.serializeObject=function(){var d=this,n={},c={},p=/^[a-zA-Z][a-zA-Z0-9_]*(?:\[(?:\d*|[a-zA-Z0-9_]+)\])*$/,r=/[a-zA-Z0-9_]+|(?=\[\])/g,s=/^$/,q=/^\d+$/,l=/^[a-zA-Z0-9_]+$/;this.build=function(b,h,d){b[h]=d;return b};this.push_counter=function(b){void 0===c[b]&&(c[b]=0);return c[b]++};b.each(b(this).serializeArray(),function(){if(p.test(this.name)){for(var c,h=this.name.match(r),k=this.value,e=this.name;void 0!==(c=h.pop());)e=e.replace(new RegExp("\\["+c+"\\]$"),""),c.match(s)?k= d.build([],d.push_counter(e),k):c.match(q)?k=d.build([],c,k):c.match(l)&&(k=d.build({},c,k));n=b.extend(!0,n,k)}});return n}})(jQuery); $(function(){var b=$("#formulario_de_contacto"),d=$("#form-messages"),n=$("#boton-enviar");$(b).submit(function(c){c.preventDefault();c=$(b).serializeObject();""!==c.uuid&&""!==c.name&&""!==c.subject&&""!==c.menssage?($(n).css("background-color","lightseagreen"),$(n).text(form_messages.sending_button_text),$.ajax({type:"POST",url:$(b).attr("action"),crossDomain:!0,contentType:"text/plain",data:JSON.stringify({uuid:c.uuid,name:c.name,subject:c.subject,email:c.email,message:c.message}),headers:{"Content-Type":"application/json; charset=utf-8"}, success:function(b){$(d).removeClass("alert alert-danger");$(d).addClass("success");$("#boton-enviar").css("background-color","darkorange");$(n).text(form_messages.sent_button_text);$(d).text(form_messages.success_message);$("#name").val("");$("#email").val("");$("#subject").val("");$("#message").val("")},error:function(b){$(d).removeClass("alert alert-success");$(d).addClass("alert alert-error");""!==b.responseText?$(d).text(form_messages.error_message):$(d).text(form_messages.error_message_complete)}})): ($(d).removeClass("alert alert-info"),$(d).text(form_messages.require_error_message))})});$.fn.reverse=[].reverse;$.fn.scrollView=function(b){return this.each(function(){null==b?$("html, body").animate({scrollTop:$(this).offset().top},100,"swing"):$("html, body").animate({scrollTop:b},100,"swing")})}; $(function(){$("a[href*=#]:not([href=#])").click(function(){if(location.pathname.replace(/^\//,"")==this.pathname.replace(/^\//,"")&&location.hostname==this.hostname){var b=$(this.hash),b=b.length?b:$("[name="+this.hash.slice(1)+"]");if(b.length)return $("html,body").animate({scrollTop:b.offset().top},1E3),!1}})});window.addEventListener&&window.addEventListener("DOMMouseScroll",wheel,!1);window.onmousewheel=document.onmousewheel=wheel; function wheel(b){var d=0;b.wheelDelta?d=b.wheelDelta/120:b.detail&&(d=-b.detail/3);handle(d);b.preventDefault&&b.preventDefault();b.preventDefault()}function handle(b){$("html, body").stop().animate({scrollTop:$(window).scrollTop()-50*b},20)} $("document").ready(function(){function b(){var a,g,f,b,c,e;e=Math.min(h.length,k+m);$("#portfolio-gallery").empty();for(var d=k;d<e;d++)a=$("<li></li>"),g=$("<span class='item-name'>"+h[d].name+"</span>"),f=$("<div class='darker'></div>"),b=$("<div class='item-img'></div>"),c=$("<p><span></span>"+h[d].footer+"</p>"),b.css("background-image","url('/img/"+h[d].image+"')"),a.append(g,f,b,c),$("#portfolio-gallery").append(a),a.attr("data-index",d);0>k-m?$(".ptf_page_prev a").css("display","none"):$(".ptf_page_prev a").css("display", "inline-block");k+m>=h.length?$(".ptf_page_next a").css("display","none"):$(".ptf_page_next a").css("display","inline-block")}function d(){var a,g,f;$("#ptf_brand").text(h[e].name);$("#ptf_year").text(h[e].year);$("#ptf_work").empty();for(g=0;g<h[e].works.length;g++)a=$("<li>"+h[e].works[g].work+"</li>"),$("#ptf_work").append(a);$("#ptf_website").attr("href",h[e].website);g=h[e].website.indexOf("://");-1<g&&$("#ptf_website").text(h[e].website.substring(g+3,h[e].website.length));$.ajax({url:h[e].rel_url, dataType:"html",type:"GET",success:function(a){$("#ptf_desc").html(a)}});$("#ptf_proj_gal").carousel("pause").removeData();$("#ptf_proj_gal").carousel({interval:1250});$ptf_car_ind=$("#ptf_proj_gal .carousel-indicators");$ptf_car_ind.empty();a=$("<li data-target='#ptf_proj_gal' data-slide-to='0' class='active' ></li>");$ptf_car_ind.append(a);$ptf_car_inner=$("#ptf_proj_gal .carousel-inner");$ptf_car_inner.empty();a=$("<div class='item active'></div>");f=$("<img alt ='photo' src='/img/"+h[e].gallery[0].img+ "'>");a.append(f);$ptf_car_inner.append(a);for(g=1;g<h[e].gallery.length;g++)a=$("<li data-target='#ptf_proj_gal' data-slide-to='"+g.toString()+"' ></li>"),$ptf_car_ind.append(a),a=$("<div class='item'></div>"),f=$("<img alt ='photo' src='/img/"+h[e].gallery[g].img+"'>"),a.append(f),$ptf_car_inner.append(a);k=e-e%m}function n(a,g){r="rect("+(a.offset().top-g.offset().top)+"px, "+(a.offset().left+a.outerWidth())+"px, "+(a.offset().top-g.offset().top+a.outerHeight())+"px ,"+a.offset().left+"px)";s= "rect(0px "+$("#portfolio").outerWidth()+"px "+$("#portfolio").outerHeight()+"px 0px)";g.css({clip:r})}var c,p,r,s,q,l=$(window).outerWidth()+17,t="-1",h=[],k=0,e=0,u=0,m=7;$(window).on("resize",function(a){l=$(window).outerWidth()+17;$("#portfolio-info .close").triggerHandler("click");$("#descr-row").empty();$("#what_we_do .first_group, #what_we_do .second_group").height("160px");$("#what_we_do").css("padding-bottom","30px");768<=l&&991>=l?($("#what_we_do #first_group, #what_we_do #second_group").height(0), $("#what_we_do .info:visible").parent().parent().height(2*$("#what_we_do .info:visible").height()-80)):991<l&&($("#what_we_do").css("padding-bottom",$("#what_we_do .info:visible").height()+50),$("#what_we_do .first_group, #what_we_do .second_group").height("0"));m=991>=l?6:7;k=Math.floor(e/m)*m;b()});$(".navbar").affix({offset:{top:625,bottom:function(){return this.bottom=$(".footer").outerHeight(!0)}}});$(".rotate").textrotator({animation:"dissolve",separator:";;;",speed:2E3});$(".main h2, .main p.lead, #what_we_do .title_info").not("#front_page h2").addClass("animated fadeOut"); $("#portfolio #portfolio-gallery li").addClass("animated-flip fadeOutUp");$("#front_page .container").addClass("animated fadeIn");$("#team .team_container").addClass("animated fadeOutUp");$(window).scroll(function(){150<$(this).scrollTop()&&$("#front_page .container").removeClass("animated fadeIn").addClass("animated fadeOut");150>$(this).scrollTop()&&$("#front_page .container").removeClass("animated fadeOut").addClass("animated fadeIn")});$(".main h2, .main p.lead").not("#front_page h2").waypoint(function(a){"up"== a&&$(this).removeClass("animated fadeIn").addClass("animated fadeOut");"down"==a&&$(this).removeClass("animated fadeOut").addClass("animated fadeIn")},{offset:"80%"});$("#what_we_do .row").waypoint(function(a){"up"==a&&$(this).find(".title_info").reverse().each(function(a){var f=$(this);setTimeout(function(){f.removeClass("animated fadeIn").addClass("animated fadeOut")},100*a)});"down"==a&&$(this).find(".title_info").each(function(a){var f=$(this);setTimeout(function(){f.removeClass("animated fadeOut").addClass("animated fadeIn")}, 100*a)})},{offset:"80%"});$("#what_we_do .title_info").on("click",function(){var a,g,f;g=$("#descr-row");g.empty();a=$('<div id="descr" class="info"></div>');a.appendTo(g);f=$('<span class="icon-up-dir fontello"></span>');f.appendTo(a);g=$('<p id="yyye"></p>');g.text($(this).parent().find(".info").find("p").text());g.appendTo(a);parseInt(g.height(),10);switch(!0){case "1"===$(this).attr("data-nth"):768<l?f.css("left","5%"):f.css("left","49%");break;case "2"===$(this).attr("data-nth"):1E3<l?f.css("left", "33%"):768<l?f.css("right","5%"):f.css("left","49%");break;case "3"===$(this).attr("data-nth"):1E3<l?f.css("right","33%"):768<l?f.css("left","10%"):f.css("left","49%");break;case "4"===$(this).attr("data-nth"):1E3<l?f.css("right","4%"):768<l?f.css("right","10%"):f.css("left","49%");break;default:f.css("left","49%")}t===$(this).attr("data-nth")?($("#descr").slideUp("slow"),t="-1"):($("#descr").slideUp("slow"),$("#descr").slideDown("medium"),$("#what_we_do").css("padding-bottom","30px"),t=$(this).attr("data-nth"))}); $("#tools .first_img .point_guide").waypoint(function(a){"up"==a&&$(this).find(".points_container").reverse().each(function(a){var f=$(this);setTimeout(function(){f.css("opacity",0)},15*a)});"down"==a&&$(this).find(".points_container").each(function(a){var f=$(this);setTimeout(function(){f.css("opacity",1)},15*a)})},{offset:"80%"});$("#tools .resume_tools .media-body").waypoint(function(a){var b=$(this);"up"==a&&setTimeout(function(){b.css("opacity",0)},100);"down"==a&&setTimeout(function(){b.css("opacity", 1)},100)},{offset:"80%"});$("#tools .media:nth-child(2n+2)").waypoint(function(a){if("up"==a){var b=$(this).find(".img_container .points_container").length;$(this).find(".media-object").each(function(){var a=$(this);setTimeout(function(){a.css("opacity",0)},15*b)});$(this).find(".img_container .points_container").reverse().each(function(a){var b=$(this);setTimeout(function(){b.css("opacity",0)},15*a)});$(this).find(".center_points span").each(function(a){var c=$(this);setTimeout(function(){c.css("opacity", 0)},15*(a+b))})}"down"==a&&(b=$(this).find(".center_points span").length,$(this).find(".center_points span").reverse().each(function(a){var b=$(this);setTimeout(function(){b.css("opacity",1)},15*a)}),$(this).find(".img_container .points_container").each(function(a){var c=$(this);setTimeout(function(){c.css("opacity",1)},15*(a+b))}),$(this).find(".media-object").each(function(){var a=$(this);setTimeout(function(){a.css("opacity",1)},15*b)}))},{offset:"80%"});$("#tools .media:nth-child(2n+3)").waypoint(function(a){if("up"== a){var b=$(this).find(".img_container .points_container").length;$(this).find(".media-object").each(function(){var a=$(this);setTimeout(function(){a.css("opacity",0)},15*b)});$(this).find(".img_container .points_container").each(function(a){var b=$(this);setTimeout(function(){b.css("opacity",0)},15*a)});$(this).find(".center_points span").reverse().each(function(a){var c=$(this);setTimeout(function(){c.css("opacity",0)},15*(a+b))})}"down"==a&&(b=$(this).find(".center_points span").length,$(this).find(".center_points span").each(function(a){var b= $(this);setTimeout(function(){b.css("opacity",1)},15*a)}),$(this).find(".img_container .points_container").reverse().each(function(a){var c=$(this);setTimeout(function(){c.css("opacity",1)},15*(a+b))}),$(this).find(".media-object").each(function(){var a=$(this);setTimeout(function(){a.css("opacity",1)},15*b)}))},{offset:"80%"});switch(!0){case -1<document.documentElement.lang.indexOf("en"):q="en";break;case -1<document.documentElement.lang.indexOf("es"):q="es";break;default:q="es"}$.getJSON("/json/portfolio-"+ q+".json",function(a){for(var c=0;c<a.portfolio.length-1;c++)h.push(a.portfolio[c]);m=991>=l?6:7;k=Math.floor(e/m)*m;b()});$("#portfolio #portfolio-gallery li").waypoint(function(a){"up"==a&&$(this).removeClass("animated-flip fadeInUp").addClass("animated-flip fadeOutUp");"down"==a&&$(this).removeClass("animated-flip fadeOutUp").addClass("animated-flip fadeInUp")},{offset:"80%"});$("#portfolio-gallery").on("click","li",function(){e=u=parseInt($(this).attr("data-index"));p=$("#portfolio-info");d(); c=$(this);n(c,p);setTimeout(function(){p.css({opacity:1,"z-index":1E4}).removeClass("hide-info");p.animate({clip:s},"fast","swing",function(){$("#portfolio").scrollView().css("padding-bottom",0)})},500)});$(".ptf_page_next a").on("click",function(){k+m<h.length&&(k+=m,b())});$(".ptf_page_prev a").on("click",function(){0<=k-m&&(k-=m,b())});$("#portfolio-nav-proj-prev").on("click",function(){e=1<e?e-1:h.length-1;d()});$("#portfolio-nav-proj-next").on("click",function(){e=e<h.length-1?e+1:0;d()});$(".carousel-control.left").on("click", function(){$("#ptf_proj_gal").carousel("prev")});$(".carousel-control.right").on("click",function(){$("#ptf_proj_gal").carousel("next")});$("#portfolio-info .close").on("click",function(){"undefined"!==typeof c&&(b(),c=$("#portfolio-gallery li:nth-child("+(e%m+1).toString()+")"),n(c,p),p.animate({clip:r},"fast","swing"),c.scrollView(c.offset().top-100),$("#portfolio").css("padding-bottom","150px"),setTimeout(function(){p.animate({opacity:0,"z-index":-1E4},"fast","swing",function(){p.addClass("hide-info")})}, 500))});$("#team .team_container").waypoint(function(a){"up"==a&&$(this).removeClass("animated fadeInUp").addClass("animated fadeOutUp");"down"==a&&$(this).removeClass("animated fadeOutUp").addClass("animated fadeInUp")},{offset:"80%"})});