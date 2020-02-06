<?php
session_start();
header("Content-Type: application/json");
if (session_destroy()) {
    echo json_encode(array(
        "success" => true
    ));
} else {
    echo json_encode(array(
        "success" => false
    ));
}
exit;
