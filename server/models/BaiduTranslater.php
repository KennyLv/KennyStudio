<?php

	class BaiduTranslater{
		private $_appid;
		
		public function __construct(){  
			$this->_appid = "V1xgTgEXQFZ355cAYPpUeVgY";
		}
		
		public function translate()	{
			$params =func_get_args();
			$translated_result = $this->_language(trim($params[2]),$params[0],$params[1]);
			echo json_encode($translated_result);
		}
		/**
		* rom	源语言语种：语言代码或auto	仅支持特定的语言组合，下面会单独进行说明
		* to	目标语言语种：语言代码或auto	仅支持特定的语言组合，下面会单独进行说明
		* client_id	开发者在百度开发者中心注册得到的授权API key	请阅读如何获取api keyhttp://developer.baidu.com/console#app/project
		* q	待翻译内容	该字段必须为UTF-8编码，并且以GET方式调用API时，需要进行urlencode编码。
		*/
		private function _language($value,  $from="auto",  $to="auto")	{
			#首先对要翻译的文字进行 UTF-8转化，再进行urlencode 处理
			$value_encode = mb_detect_encoding($value);
			if($value_encode == "UTF-8"){
				$query_text =urlencode($value);
			}else{
				$value_code = iconv('GBK', 'UTF-8', $value);	
				$query_text =urlencode($value_code);
			}
			#生成翻译API的URL GET地址
			$languageurl = "http://openapi.baidu.com/public/2.0/bmt/translate?client_id=".$this->_appid."&q=".$query_text."&from=".$from."&to=".$to;
			//echo $languageurl;
			//echo "<br/>";
			$result_text= $this->_language_text($languageurl);
			return $result_text;
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
?>