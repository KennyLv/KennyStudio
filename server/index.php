<?php
//允许跨域访问
header("Access-Control-Allow-Origin: *");
//导向URL路由
require_once('libs/Router.php');

$r = new Router;
$r->dispatch();

?>