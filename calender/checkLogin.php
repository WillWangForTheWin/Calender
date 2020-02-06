<?php
session_start();
header("Content-Type: application/json");
if(isset($_SESSION['userid'])){
    echo json_encode(array(
        "success" => true
    ));
    exit;
}else{
    echo json_encode(array(
        "success" => false
    ));
    exit;
}
