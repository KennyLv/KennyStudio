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
		* rom	源语言语种：语言代码或auto	仅支持特定的语言组合，下面会单独进行说明
		* to	目标语言语种：语言代码或auto	仅支持特定的语言组合，下面会单独进行说明
		* client_id	开发者在百度开发者中心注册得到的授权API key	请阅读如何获取api keyhttp://developer.baidu.com/console#app/project
		* q	待翻译内容	该字段必须为UTF-8编码，并且以GET方式调用API时，需要进行urlencode编码。
		*/
		private function _language($value,  $from="auto",  $to="auto")	{
			#首先对要翻译的文字进行 UTF-8转化
			$value_code = iconv('GBK', 'UTF-8', $value);	
			#进行urlencode 处理
			$query_text =urlencode($value_code);
			
			#生成翻译API的URL GET地址
			$languageurl = "http://openapi.baidu.com/public/2.0/bmt/translate?client_id=".$this->_appid."&q=".$query_text."&from=".$from."&to=".$to;
			//echo $languageurl;
			//echo "<br/>";
			$result_text= _language_text($languageurl);
			$returnObj = json_decode($result_text);
			var_dump($returnObj) ; 
			echo "<br/>";
		}
		
		/*
		*	 #获取目标URL所打印的内容
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
		#首先对要翻译的文字进行 UTF-8转化
		$value_code = iconv('GBK', 'UTF-8', $value);	
		#进行urlencode 处理
		$query_text =urlencode($value_code);
		#您注册的API Key
		$appid="V1xgTgEXQFZ355cAYPpUeVgY";
		#生成翻译API的URL GET地址
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
		
		
		//用正则转换还原成中文，
		$jsons = preg_replace("#\\\u([0-9a-f]{4}+)#ie", "iconv('UCS-2', 'UTF-8', pack('H4', '\\1'))", "\u4eca\u5929");
		echo $jsons."<br/>===";
		

		$text_unicode = '\u4eca\u5929';
		$text_utf8 = '今天';
		
		echo iconv('GB2312', 'GBK', "中文");
		echo "<br/>===<br/>";
		echo iconv('UCS-2BE', 'GBK', '\u4eca\u5929');
		echo "<br/>===<br/><br/>";
		
		
		echo mb_convert_encoding("中文", "UTF-8", "GBK");
		echo "<br/>===<br/><br/>";
		
		echo preg_replace("#\\\u([0-9a-f]{4}+)#ie", "iconv('UCS-2BE', 'GB2312', pack('H4', '\\1'))", $text_unicode);
		 
		
		echo "<br/><br/>===<br/>";

		
		echo "<br/><br/>===<br/>";
		echo iconv('UCS-2BE', 'UTF-8', $finall_u);
		echo "<br/>===<br/>";
		echo iconv('UCS-2BE', 'GBK', '中文');
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
	

	
	//echo language('今天你好吗？','zh','en');
	//echo language('today');

?>