<?php
	
?>
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <title>UMEDITOR 完整demo</title>
	<script src="./umeditor1_2_2_utf8_php/third-party/jquery.min.js"></script>
</head>
<body>
	<div id="editor_result_div">
	</div>
	<div id="trans_result_div">
	</div>
	<div>
			<span>Title:</span>
			<input type="txt"></input><br/><br/>
	</div>
	<div>
	
	
	<?php 
	include_once("myEditor.php");
	?>
	
	
	</div>
	<div>
			<input name="submit_button" type="button" value="Submit" onclick="reviewHtml()"></input>
			<input name="translate_button" type="button" value="Translate" onclick="transHtml()"></input>
			<br/><br/>
	</div>
	<div class="clear"></div>

<script type="text/javascript">
	//实例化编辑器
	var um = UM.getEditor('myEditor');

	function reviewHtml() {
			document.getElementById("editor_result_div").innerHTML = UM.getEditor('myEditor').getAllHtml();
	}
	
	function transHtml(){
		var queryTxt = UM.getEditor('myEditor').getPlainTxt();
		console.log(queryTxt);
		$.ajax({
			url: "http://localhost:8056/KennyStudio/server/baidutranslate",
			type: "POST",
			data: {"from":"zh","to":"en","q":queryTxt},
			dataType: "json",
			error:function(e){
					console.log("ERROR");
					console.log(e);
			},
			success: function(data){
					console.log("SUCCEED");
					console.log(data);
					document.getElementById("trans_result_div").innerHTML = "-=";
			}
		});
		
	}
	
</script>

</body>
</html>