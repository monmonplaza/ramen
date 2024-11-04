<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/Transaction.php';
$conn = null;
$conn = checkDbConnection();
$transaction = new Transaction($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $transaction->transaction_start = $_GET['start'];
        $transaction->transaction_total = 50;
        checkLimitId($transaction->transaction_start, $transaction->transaction_total);
        $query = checkReadLimit($transaction);
        $total_result = checkReadAll($transaction);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $transaction->transaction_total,
            $transaction->transaction_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
