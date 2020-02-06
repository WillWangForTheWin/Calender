<?php

header("Content-Type: application/json");
ini_set("session.cookie_httponly", 1);
require 'Connection.php';
$json_str = file_get_contents('php://input');
//$a = 0;
$json_obj = json_decode($json_str, true);
session_start();
//we need to get the users info so use sessions

$user_id = $_SESSION["userid"];
$event_name = $json_obj['name'];
$event_day = $json_obj["day"];
$event_month = $json_obj["month"];
$event_year = $json_obj["year"];
$event_time = $json_obj["time"];

$stmt = $mysqli->prepare("INSERT INTO events ( name, day, month, year, time, user_id) VALUES (?, ?, ?, ?, ?, ?)");
if (!$stmt) {
    //echo stuff here
    echo json_encode(array(
        "success" => false,
        "message" => htmlentities($year)
    ));
    exit;
}
/*for ($a = 0; $a <= 10; $a++) {
    echo "The number is: $a <br>";
}*/
//we have to bind gthe params to satisfy the syntax
$stmt->bind_param('siissi', $event_name, $event_day, $event_month, $event_year, $event_time, $user_id);
if (!$stmt->execute()) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    echo json_encode(array(
        "success" => false, // if false means we cannot achieve our aim here
        "message" => "can't' insert"
    ));
    exit;
}
$stmt->close();
echo json_encode(array(
    "success" => true  // if true, we can add stuff to the event
));
