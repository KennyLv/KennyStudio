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
			<input name="submit_button" type="button" value="Reset" onclick="resetAll()"></input>
			<input name="submit_button" type="button" value="Submit" onclick="reviewHtml()"></input>
			<input name="translate_button" type="button" value="Translate" onclick="transHtml()"></input>
			<br/><br/>
	</div>
	<div class="clear"></div>

<script type="text/javascript">
	//实例化编辑器
	var um = UM.getEditor('myEditor');
	function resetAll(){
			document.getElementById("editor_result_div").innerHTML = "";
			document.getElementById("trans_result_div").innerHTML = "";
			if(um.hasContents()){
				um.setContent('', false);
			}
			if(!um.isFocus()){
				um.focus();
			}
	}
	function reviewHtml() {
			document.getElementById("editor_result_div").innerHTML = um.getAllHtml();
	}
	
	function transHtml(){
		if(um.hasContents()){
			var queryTxt = um.getPlainTxt();
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
						var result  = JSON.parse(data);
						var translated_html="";
						$.each(result.trans_result,function(index,item){
							translated_html += item.dst + "<br/><br/>";
						});
						document.getElementById("trans_result_div").innerHTML = translated_html;
				}
			});
		}else{
			alert("请在编辑器里输入想翻译的内容！");
		}
	}
	
</script>

</body>
</html>