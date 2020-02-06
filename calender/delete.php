<?php
//web security cookies is required
ini_set("session.cookie_httponly", 1);
session_start();
header("Content-Type: application/json");
require 'Connection.php';
//we need to get the content first
$a = 0;
$b = 1;
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);
$id= $json_obj["delete_events"];
/*for ($a = 0; $a <= 10; $a++) {
    echo "The number is: $a <br>";
    $b =+ 1;
} */
$stmt2 = $mysqli->prepare("DELETE FROM events WHERE id = ?");
if(!$stmt2){
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
//we need to bind these params to make sure the database part is working
$stmt2->bind_param('s', $id);
$stmt2->execute();
$stmt2->close();
//echo ghe encode is the message is success
echo json_encode(array(
    "success" => true
));
exit;
?>