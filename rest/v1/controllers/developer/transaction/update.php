<?php
$conn = null;
$conn = checkDbConnection();
$transaction = new Transaction($conn);
$error = [];
$returnData = [];
if (array_key_exists("transactionid", $_GET)) {
    checkPayload($data);

    $transaction->transaction_aid = $_GET['transactionid'];
    $transaction->transaction_cart_item = checkIndex($data, "transaction_cart_item");
    $transaction->transaction_subprice = checkIndex($data, "transaction_subprice");
    $transaction->transaction_price = checkIndex($data, "transaction_price");
    $transaction->transaction_payment = checkIndex($data, "transaction_payment");
    $transaction->transaction_change = json_encode($data["transaction_change"]);

    $transaction->transaction_is_active = 1;
    $transaction->transaction_datetime = date("Y-m-d H:i:s");
    $transaction_title_old = strtolower($data["transaction_title_old"]);

    checkId($transaction->transaction_aid);



    $query = checkUpdate($transaction);
    returnSuccess($transaction, "transaction", $query);
}

checkEndpoint();
