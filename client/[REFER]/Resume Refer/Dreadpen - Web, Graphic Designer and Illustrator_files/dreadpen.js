/*! Dreadpen v1.0 | (c) 2014 
*/$(document).ready(function(){var b=$(window).height();var a=$(window).width();$(".navigation li").click(function(h){var f=$(this).attr("data-type");if(f==="in"){var d=$(this).attr("data-url");var g=$("section."+d);var i=g.position().top;if($("header .menu").is(":hidden")){}else{$(".navigation ul").slideUp("slow","easeOutQuart")}$("html,body").animate({scrollTop:i},"slow");return false}else{var c=$(this).attr("data-url");window.location=c}});$("footer .arrow").click(function(c){$("html,body").animate({scrollTop:0},"slow");return false});$("header .logo").click(function(c){$("html,body").animate({scrollTop:0},"slow");return false});$(".home .arrow").click(function(c){var d=$("section.about").position().top;$("html,body").animate({scrollTop:d},"slow");return false});$(".about button").click(function(c){var d=$("section.work").position().top;$("html,body").animate({scrollTop:d},"slow");return false});$(".work button").click(function(c){var d=$("section.contact").position().top;$("html,body").animate({scrollTop:d},"slow");return false});$("section").each(function(){$(this).waypoint({handler:function(d,e){var c=$(this).attr("id");if(e==="up"){c=$(this).prev().attr("id")}$('.navigation li[data-url="'+c+'"]').stop().addClass("active",{duration:300});$('.navigation li[data-url="'+c+'"]').siblings().stop().removeClass("active",{duration:300});return false}})});$("header .menu").click(function(c){if($(".navigation ul").is(":hidden")){$(".navigation ul").slideDown("slow","easeInQuart")}else{$(".navigation ul").slideUp("slow","easeOutQuart")}});$(".work .item").hover(function(c){$(this).children(".details").stop().animate({opacity:1},"fast")},function(){$(this).children(".details").stop().animate({opacity:0},"fast")});$(".work .item").click(function(c){$.magnificPopup.open({items:{src:$(this).attr("data-url"),type:"ajax"},closeOnContentClick:false,closeOnBgClick:false})});$(".blog .item h3").click(function(c){$.magnificPopup.open({items:{src:$(this).attr("data-url"),type:"ajax"},closeOnContentClick:false,closeOnBgClick:false})});$(".blog .item").hover(function(c){$(this).children(".date").stop().animate({opacity:0.5},"fast");$(this).children(".title").stop().animate({opacity:0.5},"fast");$(this).children(".subtitle").stop().animate({opacity:0.5},"fast")},function(){$(this).children(".date").stop().animate({opacity:1},"fast");$(this).children(".title").stop().animate({opacity:1},"fast");$(this).children(".subtitle").stop().animate({opacity:1},"fast")});$("#submit").click(function(){$("input#name").removeClass("input-error");$("input#subject").removeClass("input-error");$("textarea#message").removeClass("input-error");$("input#email").removeClass("input-error");var e=false;var d=$("input#name").val();if(d==""||d==" "){e=true;$("input#name").addClass("input-error")}var g=$("input#subject").val();if(g==""||g==" "){e=true;$("input#subject").addClass("input-error")}var i=$("textarea#message").val();if(i==""||i==" "){e=true;$("textarea#message").addClass("input-error")}var f=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;var c=$("input#email").val();if(c==""||c==" "){$("input#email").addClass("input-error");e=true}else{if(!f.test(c)){$("input#email").addClass("input-error");e=true}}if(e==true){return false}var h=$(".contact form").serialize();$.ajax({type:"POST",url:$(".contact form").attr("action"),data:h,success:function(j){if(j==="ok"){$(".msg-success").fadeIn("slow");$("input#name").val("");$("input#email").val("");$("input#subject").val("");$("textarea#message").val("")}else{$(".msg-error").fadeIn("slow")}}});return false});$(".social li").click(function(){var c=$(this).attr("data-url");window.open(c,"_blank")});$(".notfound button").click(function(){var c=$(this).attr("data-url");window.open(c,"_self")})});$(window).load(function(){fixSizes();$(".loader").delay(1000).fadeOut("slow");$("body").css("overflow","auto")});$(window).resize(function(){fixSizes()});function fixSizes(){var b=$(window).height();var a=$(window).width();$(".home, .notfound").css("height",b);$(".home .arrow, notfound .back").css("left",(a-50)/2);$(".center").each(function(){$(this).css("margin-top",($(this).parent().height()-$(this).height())/2)})};