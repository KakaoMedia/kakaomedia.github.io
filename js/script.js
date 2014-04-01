$("document").ready(function() {

	$('header').affix({ offset: { top: function() { return (this.top = $(window).outerHeight() - ($("nav").height())) } } });

});