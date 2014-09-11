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
		* rom	Դ�������֣����Դ����auto	��֧���ض���������ϣ�����ᵥ������˵��
		* to	Ŀ���������֣����Դ����auto	��֧���ض���������ϣ�����ᵥ������˵��
		* client_id	�������ڰٶȿ���������ע��õ�����ȨAPI key	���Ķ���λ�ȡapi keyhttp://developer.baidu.com/console#app/project
		* q	����������	���ֶα���ΪUTF-8���룬������GET��ʽ����APIʱ����Ҫ����urlencode���롣
		*/
		private function _language($value,  $from="auto",  $to="auto")	{
			#���ȶ�Ҫ��������ֽ��� UTF-8ת�����ٽ���urlencode ����
			$value_encode = mb_detect_encoding($value);
			if($value_encode == "UTF-8"){
				$query_text =urlencode($value);
			}else{
				$value_code = iconv('GBK', 'UTF-8', $value);	
				$query_text =urlencode($value_code);
			}
			#���ɷ���API��URL GET��ַ
			$languageurl = "http://openapi.baidu.com/public/2.0/bmt/translate?client_id=".$this->_appid."&q=".$query_text."&from=".$from."&to=".$to;
			//echo $languageurl;
			//echo "<br/>";
			$result_text= $this->_language_text($languageurl);
			return $result_text;
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
?>