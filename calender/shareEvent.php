<?php
//we need to connect to our database here
require 'Connection.php';
ini_set("session.cookie_httponly", 1);
// the cookie is for web security issue
header("Content-Type: application/json");
//we have to get the content and then decode it 
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);
session_start();

$newUsername = $json_obj['newUsername'];
$eventId = $json_obj['eventId'];
// $event_name = '';
// $event_day = '';
// $event_month = '';
// $event_year = '';
// $userid = '';

$stmt = $mysqli->prepare("SELECT name, time, day, month, year FROM events WHERE id=?");
$stmt->bind_param('s', $eventId);
$stmt->execute();
if (!$stmt) {
    echo json_encode(array(
        "success" => false,
        'message' => "checkpoint"
    ));
    exit;
}

$stmt->bind_result($event_name, $event_time, $event_day, $event_month, $event_year);
$stmt->fetch();
$stmt->close();



$stmt2 = $mysqli->prepare("SELECT id FROM users WHERE username=?");
if (!$stmt2) {
    echo json_encode(array(
        "success" => false,
        'message' => '2nd query'
    ));
    exit;
}
$stmt2->bind_param('s', $newUsername);
if(!$stmt2->execute()){
    echo json_encode(array(
        "success" => false,
        'message' => $newUsername
    ));
    exit;
}
$stmt2->bind_result($userid);
$stmt2->fetch();
$stmt2->close();

$stmt3 = $mysqli->prepare("INSERT INTO events ( name, day, month, year, time, user_id) VALUES (?, ?, ?, ?, ?, ?)");
if (!$stmt3) {
    //echo stuff here
    echo json_encode(array(
        "success" => false,
        'message' => ''
    ));
    exit;
}
$stmt3->bind_param('siissi', $event_name, $event_day, $event_month, $event_year, $event_time, $userid);
if (!$stmt3->execute()) {
    echo json_encode(array(
        "success" => false, // if false means we cannot achieve our aim here
        'message' => $event_name.$event_day.$event_time.$event_month.$event_year.$userid
    ));
    exit;
}
$stmt3->close();
echo json_encode(array(
    "success" => true,  // if true, we can add stuff to the event
));
exit;
