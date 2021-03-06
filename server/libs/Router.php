<?php
    class Router {
        // 路由表
        private $routers = array(
            array("name"=>"userinfo", "pattern"=>"get /profile/:s", "action"=>"Profile#getProfile"),
            array("name"=>"useradd", "pattern"=>"get /works/:num", "action"=>"Works#getWorks"),
            array("name"=>"useradd", "pattern"=>"get /work/:id", "action"=>"Works#getWorkDetail"),
            array("name"=>"translate", "pattern"=>"post /baidutranslate/", "action"=>"BaiduTranslater#translate")/*,
            array("name"=>"userupdate", "pattern"=>"update /user", "action"=>"User#update"),
            array("name"=>"userdel", "pattern"=>"delete /user/:id", "action"=>"User#delete")*/
        );
        // 入口
        public function dispatch() {
            $url = $_SERVER["REQUEST_URI"];
            $method = $_SERVER["REQUEST_METHOD"];
			
            foreach ($this->routers as $router) {
                $pattern = $router["pattern"];
                $pats = explode(" ", $pattern);		//echo $pats[0]."==<br/>";
				
				// 是否与当前路由匹配
                if (strcasecmp($pats[0], $method) == 0) {
					if( $method == "POST"){
						$params = $_POST;						
						if ($params != null) {
							$action = $router["action"];
							return $this->invoke($action, $params);
						}
					}else{
						$params = $this->checkUrl($method, strtolower($url), strtolower($pats[1]));					
						if ($params != null) {
							array_shift($params);
							$action = $router["action"];
							// 寻找到第一个匹配的路由即执行，然后返回
							return $this->invoke($action, $params);
						}
					}
                }
            }
			echo "404 : Actions not Found!";
            // error 404
        }
        private function invoke($action, $params) {
            $acts = explode("#", $action);
            $className = $acts[0];
            $methodName = $acts[1];
            $actionDir = dirname(dirname(__FILE__)).DIRECTORY_SEPARATOR."models";
            // 载入action文件
            $classFile = $actionDir.DIRECTORY_SEPARATOR.$className.".php";
			
			//echo $actionDir;
			//echo $classFile;
			
            if (! file_exists($classFile)) {
                // 404 error
                echo "404 error, no action found";
                return;
            } else {
                require "$classFile";
                // 使用反射执行方法
                $rc = new ReflectionClass($className);
                if (! $rc->hasMethod($methodName)) {
                    // 404 error
                    echo "404 error, no method found";
                    return;
                } else {
                    $instance = $rc->newInstance();
                    $method = $rc->getMethod($methodName);
					$method->invokeArgs($instance, $params);
                }
            }
        }
        // 正则匹配检查，并提取出参数
        private function checkUrl($method, $url, $pattern) {
            //echo "check url [ $url  ]with pattern [ $pattern ]<br/><br/><br/>";
            $ma = array();
            $pattern = ltrim(rtrim($pattern, "/"));
            $pattern = "/".str_replace("/", "\/", $pattern)."\/?$/";
            $pattern = str_replace(":s", "([^\/]+)", $pattern);
            //echo "pattern $pattern<br>";
            //$url = "/\".$url."$/";
            if (preg_match($pattern, $url, $ma) > 0) {
                return $ma;
            }
            return null;
        }
    }
	
?>