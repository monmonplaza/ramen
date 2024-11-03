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
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $transaction->transaction_search = $data["searchValue"];    // get data
    if ($data["isFilter"] == true) {

        if ($transaction->transaction_search != "") {

            checkKeyword($transaction->transaction_search);
            $transaction->transaction_is_active = checkIndex($data, "transaction_is_active");
            $query = checkFilterByStatusAndSearch($transaction);
            http_response_code(200);
            getQueriedData($query);
        }


        $transaction->transaction_is_active = checkIndex($data, "transaction_is_active");
        $query = checkFilterByStatus($transaction);
        http_response_code(200);
        getQueriedData($query);
    }

    checkKeyword($transaction->transaction_search);
    $query = checkSearch($transaction);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
