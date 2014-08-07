 $(".close_project").click(function () {
    {
    $("div.focus_project").slideUp("slow");
    $("#select_project a").removeClass("active");
    }
  });



$("#project1").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#longines").slideDown("slow", function() {
		 		$("#longines").addClass("current");
		 		$("#select_project a#app_longines").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#longines").slideDown("slow", function() {
			$("#longines").addClass("current");
			$("#select_project a#app_longines").addClass("active");
		});
	}
});

$("#project2").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#as_bleu").slideDown("slow", function() {
		 		$("#as_bleu").addClass("current");
		 		$("#select_project a#c_bleu").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#as_bleu").slideDown("slow", function() {
			$("#as_bleu").addClass("current");
			$("#select_project a#c_bleu").addClass("active");
		});
	}
});

$("#project3").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#escom").slideDown("slow", function() {
		 		$("#escom").addClass("current");
		 		$("#select_project a#escomAS").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#escom").slideDown("slow", function() {
			$("#escom").addClass("current");
			$("#select_project a#escomAS").addClass("active");
		});
	}
});

$("#project4").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#rapportAS").slideDown("slow", function() {
		 		$("#rapportAS").addClass("current");
		 		$("#select_project a#stageAS").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#rapportAS").slideDown("slow", function() {
			$("#rapportAS").addClass("current");
			$("#select_project a#stageAS").addClass("active");
		});
	}
});

$("#project5").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#flyers_cugy").slideDown("slow", function() {
		 		$("#flyers_cugy").addClass("current");
		 		$("#select_project a#flyers").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#flyers_cugy").slideDown("slow", function() {
			$("#flyers_cugy").addClass("current");
			$("#select_project a#flyers").addClass("active");
		});
	}
});

$("#project6").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#black_s").slideDown("slow", function() {
		 		$("#black_s").addClass("current");
		 		$("#select_project a#blackswan").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#black_s").slideDown("slow", function() {
			$("#black_s").addClass("current");
			$("#select_project a#blackswan").addClass("active");
		});
	}
});

$("#project7").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#nolimit").slideDown("slow", function() {
		 		$("#nolimit").addClass("current");
		 		$("#select_project a#nolimitbike").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#nolimit").slideDown("slow", function() {
			$("#nolimit").addClass("current");
			$("#select_project a#nolimitbike").addClass("active");
		});
	}
});

$("#project8").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#avc").slideDown("slow", function() {
		 		$("#avc").addClass("current");
		 		$("#select_project a#workshop_avc").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#avc").slideDown("slow", function() {
			$("#avc").addClass("current");
			$("#select_project a#workshop_avc").addClass("active");
		});
	}
});

$("#project9").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#budapest").slideDown("slow", function() {
		 		$("#budapest").addClass("current");
		 		$("#select_project a#tpi_buda").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#budapest").slideDown("slow", function() {
			$("#budapest").addClass("current");
			$("#select_project a#tpi_buda").addClass("active");
		});
	}
});

$("#project10").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#maja").slideDown("slow", function() {
		 		$("#maja").addClass("current");
		 		$("#select_project a#tpi_maja").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#maja").slideDown("slow", function() {
			$("#maja").addClass("current");
			$("#select_project a#tpi_maja").addClass("active");
		});
	}
});

$("#project11").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#nwar").slideDown("slow", function() {
		 		$("#nwar").addClass("current");
		 		$("#select_project a#tpi_nwar").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#nwar").slideDown("slow", function() {
			$("#nwar").addClass("current");
			$("#select_project a#tpi_nwar").addClass("active");
		});
	}
});

$("#project12").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#beware").slideDown("slow", function() {
		 		$("#beware").addClass("current");
		 		$("#select_project a#beware_link").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#beware").slideDown("slow", function() {
			$("#beware").addClass("current");
			$("#select_project a#beware_link").addClass("active");
		});
	}
});

$("#project13").click(function () {
	if ($("div.current").is(":visible")) {
		 $("div.current").slideUp("slow", function() {
		 	$("div.current").removeClass("current");
		 	$("#select_project a").removeClass("active");
		 	$("#3petitspointsmagazine").slideDown("slow", function() {
		 		$("#3petitspointsmagazine").addClass("current");
		 		$("#select_project a#3petitspointsmagazine_link").addClass("active");
		 		});
		 });
   		} 
	else {
		$("#3petitspointsmagazine").slideDown("slow", function() {
			$("#3petitspointsmagazine").addClass("current");
			$("#select_project a#3petitspointsmagazine_link").addClass("active");
		});
	}
});

