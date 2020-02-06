<?php
// this enables people to insert an public event such as national day or columbus day which might be useful for everyone
ini_set("session.cookie_httponly", 1);
//cookie is the web security issue
header("Content-Type: application/json");
require 'Connection.php';
$json_str = file_get_contents('php://input');
$y = 0;
$json_obj = json_decode($json_str, true);
session_start();
$userid = $_SESSION["userid"];
$time = $json_obj['time'];
$name = $json_obj['name'];
$xyz = 1;
//we still need year, month and day here to make sure all file match
$year = $json_obj["year"];
$month = $json_obj["month"];
$day = $json_obj["day"];
$stmt = $mysqli->prepare("INSERT INTO events (name, day,month, year,time,user_id, public) VALUES (?, ?, ?, ?, ?, ?, '1')");
if (!$stmt) {
    echo json_encode(array(
        "success" => false,
        "message" => htmlentities($year)
    ));
    exit;
}
//we need to bind paramerter here again to make sure the parameters match the sql line above
$stmt->bind_param('siissi', $name, $day, $month, $year, $time, $userid);
if (!$stmt->execute()) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    echo json_encode(array(
        "success" => false,
        "message" => "cannot insert"
    ));
    exit;
}

$stmt->close();
echo json_encode(array(
    "success" => true
));
