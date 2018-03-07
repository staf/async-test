<?php

$state = (int) @$_GET['state'];

if ($state == 200) {
    $code = 200;
    $message = 'This is a good request';
} elseif ($state == 422) {
    $code = 422;
    $message = 'Validation errors!';
} else {
    $code = 500;
    $message = 'This is a server error';
}

sleep(1);

header('Content-Type: application/json', true, $code);
echo json_encode([
    'code' => $code,
    'status' => $code === 200 ? 'success' : 'error',
    'message' => $message,
    'data' => ['foo' => 'bar'],
]);
