<?php

	class BaiduTranslater{
		private $_appid;
		
		public function __construct(){  
			$this->_appid = "V1xgTgEXQFZ355cAYPpUeVgY";
		}
		
		public function translate()	{
			$params =func_get_args();
			echo json_encode($params);
		}
		/**
		* rom	Դ�������֣����Դ����auto	��֧���ض���������ϣ�����ᵥ������˵��
		* to	Ŀ���������֣����Դ����auto	��֧���ض���������ϣ�����ᵥ������˵��
		* client_id	�������ڰٶȿ���������ע��õ�����ȨAPI key	���Ķ���λ�ȡapi keyhttp://developer.baidu.com/console#app/project
		* q	����������	���ֶα���ΪUTF-8���룬������GET��ʽ����APIʱ����Ҫ����urlencode���롣
		*/
		private function _language($value,  $from="auto",  $to="auto")	{
			#���ȶ�Ҫ��������ֽ��� UTF-8ת��
			$value_code = iconv('GBK', 'UTF-8', $value);	
			#����urlencode ����
			$query_text =urlencode($value_code);
			
			#���ɷ���API��URL GET��ַ
			$languageurl = "http://openapi.baidu.com/public/2.0/bmt/translate?client_id=".$this->_appid."&q=".$query_text."&from=".$from."&to=".$to;
			//echo $languageurl;
			//echo "<br/>";
			$result_text= _language_text($languageurl);
			$returnObj = json_decode($result_text);
			var_dump($returnObj) ; 
			echo "<br/>";
		}
		
		/*
		*	 #��ȡĿ��URL����ӡ������
		*/
		private function _language_text($url) 
		{
			if(!function_exists('file_get_contents')) {
				$file_contents = file_get_contents($url);
			} else {
				$ch = curl_init();
				$timeout = 5;
				curl_setopt ($ch, CURLOPT_URL, $url);
				curl_setopt ($ch, CURLOPT_RETURNTRANSFER, 1);
				curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
				$file_contents = curl_exec($ch);
				curl_close($ch);
			}
			return $file_contents;
		}
		
	}
	
		/*
	function language($value,  $from="auto",  $to="auto")
	{
		#���ȶ�Ҫ��������ֽ��� UTF-8ת��
		$value_code = iconv('GBK', 'UTF-8', $value);	
		#����urlencode ����
		$query_text =urlencode($value_code);
		#��ע���API Key
		$appid="V1xgTgEXQFZ355cAYPpUeVgY";
		#���ɷ���API��URL GET��ַ
		$languageurl = "http://openapi.baidu.com/public/2.0/bmt/translate?client_id=V1xgTgEXQFZ355cAYPpUeVgY&q=".$query_text."&from=".$from."&to=".$to;
		//echo $languageurl;
		//echo "<br/>";
		$result_text=language_text($languageurl);
		$returnObj = json_decode($result_text);
		var_dump($returnObj) ; 
		echo "<br/>";




		$trans_result = $returnObj->trans_result;
		var_dump($trans_result[0]->dst) ; 
		echo "<br/>";
		
		$finall_txt = $trans_result[0]->dst;
		$finall_u =json_encode($finall_txt);
		echo $finall_u."<br/>";
		
		
		//������ת����ԭ�����ģ�
		$jsons = preg_replace("#\\\u([0-9a-f]{4}+)#ie", "iconv('UCS-2', 'UTF-8', pack('H4', '\\1'))", "\u4eca\u5929");
		echo $jsons."<br/>===";
		

		$text_unicode = '\u4eca\u5929';
		$text_utf8 = '����';
		
		echo iconv('GB2312', 'GBK', "����");
		echo "<br/>===<br/>";
		echo iconv('UCS-2BE', 'GBK', '\u4eca\u5929');
		echo "<br/>===<br/><br/>";
		
		
		echo mb_convert_encoding("����", "UTF-8", "GBK");
		echo "<br/>===<br/><br/>";
		
		echo preg_replace("#\\\u([0-9a-f]{4}+)#ie", "iconv('UCS-2BE', 'GB2312', pack('H4', '\\1'))", $text_unicode);
		 
		
		echo "<br/><br/>===<br/>";

		
		echo "<br/><br/>===<br/>";
		echo iconv('UCS-2BE', 'UTF-8', $finall_u);
		echo "<br/>===<br/>";
		echo iconv('UCS-2BE', 'GBK', '����');
		echo "<br/>===<br/><br/>";
		
		
		echo unicode_decode($finall_u,'GBK', "\\u", '');
		echo "<br/>";
		
		
		$returnObj = json_decode($result_text);
		var_dump($returnObj) ; 
		echo "<br/>";
		
		$text = $returnObj->trans_result;
		
		var_dump( urldecode(json_encode(urlencode($text)))) ; 
		
		
		//return urldecode($text[0]->dst);
		
	}*/
	

	
	//echo language('���������','zh','en');
	//echo language('today');

?>