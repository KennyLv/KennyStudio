<?php
//����������
header("Access-Control-Allow-Origin: *");
//����URL·��
require_once('libs/Router.php');

$r = new Router;
$r->dispatch();

?>