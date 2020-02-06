<?php
$mysqli = new mysqli('localhost', 'test', 'password', 'calendar');

if ($mysqli->connect_errorno) {
    printf("Connection Failed: %s\n", $mysqli->connect_error);
    exit;
}
