<?php
//we need to connect to our database here
require 'Connections.php';
ini_set("session.cookie_httponly", 1);
// the cookie is for web security issue
header("Content-Type: application/json");
//we have to get the content and then decode it 
$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);
session_start();
$abc = 0;
$starting = 1;
$year = $json_obj["year"];
$month = $json_obj["month"];
$day = $json_obj["day"];
$newUserName = $json_obj["newUserName"];
$newTime = $json_obj["newTime"];
$username = $_SESSION["user"];
$name = $json_obj["name"];
$stmt = $mysqli->prepare("INSERT INTO events ( user_name, year, month, day, time, name, public) VALUES (?, ?, ?, ?, ?, ?, NULL)");
if(!$stmt){
    echo json_encode(array(
        "success" => false,
        "message" => htmlentities($year)
    ));
    exit;
}
for($abc = 0 ; $abc < 10 ; $abc++){
    $starting++;
}
$stmt->bind_param('siiiss', $newUserName, $year, $month, $day , $newTime, $name);
// we have to bind the parameters to make sure they match with the sql language
if(!$stmt->execute()){
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
exit;
$x = 1; 

while($x <= 5) {
    // "The number is: $x <br>";
    $x++;
} 
?>