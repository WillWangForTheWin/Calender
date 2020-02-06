<?php
ini_set("session.cookie_httponly", 1);
session_start();
header("Content-Type: application/json");
// to make sure we can bridge our code to the databse and get the necessary data
require 'Connection.php';
$json_str = file_get_contents('php://input');
$a = 0;
//We have to decode 
$json_obj = json_decode($json_str, true);
$b = 1;
//Since we are editing our events, we have to change the name from oldevent name to the newevent name
$newTime = $json_obj["newTime"];
$ID = $json_obj["ID"];
$nameOfTheNewEvent = $json_obj["newName"];
$year = $json_obj["year"];
$month = $json_obj["month"];
$day = $json_obj["day"];
$stmt2 = $mysqli->prepare("UPDATE events SET name=?, day=?, month = ?, year = ?, time=? where id = ?");
If(!$stmt2) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
//make sure we can bind parameters and get the data form our sql database
$stmt2->bind_param('siiisi', $nameOfTheNewEvent, $day, $month, $year , $newTime, $ID);
$stmt2->execute();
$stmt2->close();

echo json_encode(array(
    "success" => true
));
exit;
?>