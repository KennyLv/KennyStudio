<?php
		$mypic = $_FILES["mypic"];
		var_dump("12123=========1242332");
		if(!empty($mypic)){
				$picname = $_FILES['mypic']['name'];
		/*
		
		echo "121231242332";
				$picname = $_FILES['mypic']['name'];
				
				
		echo $picname."121231242332";
				
				$picsize = $_FILES['mypic']['size'];
				if ($picsize > 512000) {
						echo '图片大小不能超过500k';
						exit;
				}
				$type = strstr($picname, '.');
				if ($type != ".gif" && $type != ".jpg") {
						echo '图片格式不对！';
						exit;
				}
				$pics = 'helloweba' . $type;*/
				//上传路径
				$pic_path = "../uploadfiles/". $picname;
				move_uploaded_file($mypic["tmp_name"],$pic_path);
		}
?>
