<?php
require 'Controller.php';


$url = $_SERVER["REQUEST_URI"];
$url = trim($url, '/');
$routes = explode("/", $url);
if($routes[0] != '' AND !isset($routes[1])){
    $action = new Controller;
    if (method_exists($action, $routes[0])){
        $action->$routes[0]();
    }else {
        $action->notfaund();
    }
}elseif (isset($routes[1])){
    $action = new Controller;
    $action->$routes[0]($routes[1]);
}



?>