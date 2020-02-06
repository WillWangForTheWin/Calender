<?php
ini_set("session.cookie_httponly", 1);
header("Content-Type: application/json");
require 'Connection.php';
session_start();
$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);
//Variables can be accessed as such:
$user_id = $_SESSION["userid"];
$year = $json_obj['year'];
$month = $json_obj['month'];
$stmt = $mysqli->prepare("select id, name, time, day, public from events where (user_id = ? OR public = 1) AND year = ? AND month = ?");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username"
    ));
    exit;
}
$stmt->bind_param('sii',$user_id, $year, $month);
$stmt->execute();
$stmt->bind_result($event_id, $event_name, $event_time, $event_day, $event_public);
$result = array();
while($stmt->fetch()){
    $event_id = htmlentities($event_id);
    $event_date = htmlentities($event_day);
    $event_time = htmlentities($event_time);
    $event_name = htmlentities($event_name);
    $event_public = htmlentities($event_public);
    $object =array( "id" => $event_id,
        "day" => $event_day,
        "time" => $event_time,
        "name" => $event_name,
        "public" => $event_public
    );
    array_push($result,$object);
}
echo json_encode($result);