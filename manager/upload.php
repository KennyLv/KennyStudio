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
						echo 'ͼƬ��С���ܳ���500k';
						exit;
				}
				$type = strstr($picname, '.');
				if ($type != ".gif" && $type != ".jpg") {
						echo 'ͼƬ��ʽ���ԣ�';
						exit;
				}
				$pics = 'helloweba' . $type;*/
				//�ϴ�·��
				$pic_path = "../uploadfiles/". $picname;
				move_uploaded_file($mypic["tmp_name"],$pic_path);
		}
?>
