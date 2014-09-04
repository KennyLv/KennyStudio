<?php

    class Profile {
		private $id;  
		private $name;  
		private $resopnse;
		
		public function __construct(){  
			$this->id          = '';  
			$this->name   = '';  
		}  
		
        public function getProfile($id) {
			/*
			$content = array("yearFrom"=>"2001.8~2009.9", "yearTo"=>"8888.8~9999.9","companyName"=>"Infoition","jobTitle"=>"Product Marketing Manager", "description"=>"Planning and development included market research, competitor analysis, pricing strategies, messaging, prod");
			$resopnse = array($content,$content,$content);
			echo json_encode(array("code"=>$id,"content"=>$resopnse));
			*/
			switch($id) {
				case "employ" : 
					$resopnse = json_decode( '[
					{"yearFrom": "2001.8~2009.9", "yearTo":"8888.8~9999.9","companyName":"Infoition","jobTitle":"Product Marketing Manager","description":"Planning and development included market research, competitor analysis, pricing strategies, messaging, prod"},
						{"yearFrom": "", "yearTo":"","companyName":"","jobTitle":"","description":["1","2","3","4"]},
						{"yearFrom": "", "yearTo":"","companyName":"","jobTitle":"","description":["","","",""]},
						{"yearFrom": "", "yearTo":"","companyName":"","jobTitle":"","description":["","","",""]}
					]');
				break;
				case "education" :
					$resopnse = json_decode( '[	{
						"yearFrom": "2004-2008", 
						"yearTo":"2008",
						"major":"Statistics",
						"school":"School of Finance and Economics",
						"university":"University of Jiangsu"
					},
					{
						"yearFrom": "2008-2010", 
						"yearTo":"2010",
						"major":"Marketing & Advertising - B.A.",
						"school":"School of Communications",
						"university":"University of Central Florida"
					}]');
				break;
				default:
				$resopnse = "Data not found...";
			
			}
			echo json_encode(array("code"=>$id,"content"=>$resopnse));
			
        }
		
        public function add() {
            echo "add";
        }
		
        public function update() {
            echo "update";
        }
		
		
        public function delete($id) {
            echo "delete";
        }
		
		
		
    }
	
?>