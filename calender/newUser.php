<?php
require 'Connection.php';
session_start();
header("Content-Type: application/json");


$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);

if (!hash_equals($_SESSION['token'], $json_obj['token'])) {
    die("Request forgery detected");
}

$username = $json_obj['username'];
$password = password_hash($json_obj['password'], PASSWORD_DEFAULT);

$stmt = $mysqli->prepare("insert into users (username, hash_pass) values (?,?)");
if (!$stmt) {
    $error = printf("Query Prep Failed: %s\n", $mysqli->error);
    echo json_encode(array(
        "success" => false
    ));
    exit;
}
$safe_username = $mysqli->real_escape_string($username);
$safe_password = $mysqli->real_escape_string($password);

$stmt->bind_param('ss', $safe_username, $safe_password);
$stmt->execute();
$stmt->close();

echo json_encode(array(
    "success" => true
));
exit;
