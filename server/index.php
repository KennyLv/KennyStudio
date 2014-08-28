<?php
//ÔÊÐí¿çÓò·ÃÎÊ
header("Access-Control-Allow-Origin: *");
require_once('restfulRequestRouter.php');


$r = new Router;
$r->dispatch();
/*
$response = array(); 
$response["error"] = true;
$response["message"] = "Oops! An error occurred while loading";

echo json_encode($response);
*/
?>