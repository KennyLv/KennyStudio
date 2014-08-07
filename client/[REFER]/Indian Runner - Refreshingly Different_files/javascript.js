if ( !$('html').hasClass('ie8') ) {

	window.addEventListener('DOMContentLoaded', function() {
	
		var winHeight = $(window).height();
		var loadOffset = winHeight/10 * 7.5;
		
	    $('body').queryLoader2({
	    	percentage:true,
	    	backgroundColor:'#00182e',
	    	barColor:'#8FCDF1',
	    	onComplete: function() {
	    		if ($(window).width() > 699) {
					$('#panel1 .logo-wrap .duck, #panel1 .logo-wrap .logo').hide();
					$('#panel1 .logo-wrap .duck').delay(500).fadeIn(500).delay(1500).fadeOut(500);
					$('#panel1 .logo-wrap .logo').delay(2500).fadeIn(500);
				}
				$('html, body').animate({scrollTop: $('#panel2').offset().top -loadOffset}, 1000, "swing");
	    	}
	    });
	    
	});

}


$(document).ready(function() {

	//Nasty IE10/11 hacks, because MS like to build crap browsers that need special treatment...
	if (!!navigator.userAgent.match(/Trident\/7\./) || navigator.userAgent.toString().toLowerCase().indexOf("trident/6")>-1) {
		$('#panel2 .bg').attr('data-stellar-background-ratio', '1').css({'background-position':'top center'});
	}

	//Resize
	$(window).on("resize", function () {
		resizeEvents();
	}).resize();

	$('#header .toggle').click(function(){
		$('#header .main-nav ul').slideToggle();
		return false;
	});

	//Placeholder fallback
	Placeholders.init({live:true,hideOnFocus:true});

	//Parallax BGs
	$(window).stellar({horizontalScrolling:false});

	//Scrolling
	$('#header .main-nav a, .panel .more').bind('click', function(){
		var linkTo = $(this).attr('href');
		var ScrollTo = $(linkTo).offset().top;
		$('html, body').animate({scrollTop: ScrollTo}, 1000, "swing");
		if ($(window).width() < 699) {
			$('#header .main-nav ul').hide();
		} 
		return false;
	});

	$('.main-nav li:first a').addClass('selected');
	$('.panel').waypoint(function(direction) {
		var panelID = $(this).attr('id');
		$('.main-nav a.selected').removeClass('selected');
		$('.main-nav a[href="#' + panelID + '"]').addClass('selected');
	}, {offset:0});

	//Tabbed Content
	$('.tabbed-content section').hide();
	$('.tabbed-content section:first').show();
	$('.tabbed-content .tab-list li:first a').addClass('selected');
	$('.tabbed-content .tab-list li a').click(function(){
		var currentTab = $(this).attr('href');
		$('.tabbed-content .tab-list li a').removeClass('selected');
		$(this).addClass('selected');
		$('.tabbed-content section').hide();
		$(currentTab).fadeIn(1000);
		return false;
	});
		
	//Form Validation
	$('#contact-form').validate({
		rules:{
			CFemail: {
				required:true, 
				email:true 
			}
		}
	});
	$('#contact-form .controls input').click(function(){
		if ($('#contact-form').valid() === true && $('.honeypot input').val() === '' ) {
			$('#contact-form .info').css({'color':'#FFF'});
			
			var dataString = $('#contact-form').serialize();
			
			$.ajax({
				type: "POST",
				url: "/assets/php/mailer.php",
				data: dataString,
				cache: false,
				success: function(html){
					$('#contact-form fieldset').fadeOut(500,function(){
						$('#contact-form').append("<h1>Thank you<br/ >We'll be in touch soon</h1>");
		
					});
				}
			});
			
		}
		else {
			$('#contact-form .info').css({'color':'#e06262'});
		}
		return false;
	});

});

function resizeEvents() {

	if ($(window).width() > 699) {
		var panelHeight = $(window).height();
	}		
	else {
		var panelHeight = "auto";
	}

	//Carousel
	$("#panel4 .slides").carouFredSel({
		responsive: true,
		height: panelHeight,
		delay: 2000,
		items: {
			width: '100%',
			height: panelHeight,
			visible: 1,
			minimum: 2
		},
		scroll: {
			pauseOnHover: false,
			items: 1,
			duration: 1000,
			fx: "crossfade"
		},
		auto: 5000,
		pagination: { 
			container: "#panel4 .nav"
		},
		prev: {
			button: "#panel4 .controls .prev",
			key: "left"
		},
		next: {
			button: "#panel4 .controls .next",
			key: "right"
		}
	});

	if ($(window).width() > 699) {

		//Panels
		$('.panel').height(panelHeight);
		$('.panel .clear').each(function(i, obj) {
			var panelInner = $(this).siblings('.inner').outerHeight();
			var panelDiff =  panelHeight - panelInner;
			var panelPadding =  panelDiff/2;
			var headerHeight = $('#header-wrap').outerHeight();
			var headerOffset =  headerHeight/2;
			$(this).height(panelPadding + headerOffset);
		});
		$('#panel4 .outer, #panel4 .caroufredsel_wrapper, #panel4 .slides, #panel4 .slides li').height(panelHeight);
		
		//Mobile Nav
		$('#header .main-nav ul').show();
		
		//Logo
		var logoHeight = $('#panel1 .logo-wrap').height();
		var logoMarginTop = panelHeight - logoHeight;
		$('#panel1 .logo-wrap').css({'top':logoMarginTop/2});
		
	}
	else {
		$('.panel').removeAttr('style');
		$('#header .main-nav ul').hide();
	}
	
	if ($(window).width() < 699) {
		$('#panel2 .bg').attr('data-stellar-background-ratio', '1');
	}
	
}