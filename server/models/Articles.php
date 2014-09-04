<?php

    class Articles {
		private $id;  
		private $content;  
		
		public function __construct(){  
			$this->id          = '';  
			$this->content   = '';  
		}  
		
        public function get() {
            echo "get";
        }
		
        public function getById($id) {
            echo "{action:getById}";
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