<?php
require 'Connection.php';
session_start();
header("Content-Type: application/json");


$json_str = file_get_contents('php://input');
//This will store the data into an associative array
$json_obj = json_decode($json_str, true);


$stmt = $mysqli->prepare("SELECT COUNT(*), id, hash_pass FROM users WHERE username=?");

if (!$stmt) {
    printf("Query Prep Failed: %s\n", $mysqli->error);
    exit;
}
// Bind the parameter
$safe_user = $mysqli->real_escape_string($user);
$stmt->bind_param('s', $safe_user);
$safe_user = $json_obj['username'];
$stmt->execute();

// Bind the results
$stmt->bind_result($cnt, $user_id, $pwd_hash);
$stmt->fetch();
$stmt->close();

$pwd_guess = $json_obj['password'];
// Compare the submitted password to the actual password hash

if ($cnt == 1 && password_verify($pwd_guess, $pwd_hash)) {
    // Login succeeded!
    $_SESSION['userid'] = $user_id;
    $_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(32));

    echo json_encode(array(
        "success" => true
    ));
    exit;
} else {
    echo json_encode(array(
        "success" => false,
        "message" => "Incorrect Username or Password",
        'token'   => $_SESSION['token']
    ));
    exit;
}
