<?php
$conn = null;
$conn = checkDbConnection();

$transaction = new Transaction($conn);

if (array_key_exists("transactionid", $_GET)) {
    checkEndpoint();
}

checkPayload($data);

$transaction->transaction_cart_item = json_encode($data["transaction_cart_item"]);
$transaction->transaction_subprice = checkIndex($data, "transaction_subprice");
$transaction->transaction_price = checkIndex($data, "transaction_price");
$transaction->transaction_payment = checkIndex($data, "transaction_payment");
$transaction->transaction_change = json_encode($data["transaction_change"]);


$transaction->transaction_is_active = 1;
$transaction->transaction_created = date("Y-m-d H:i:s");
$transaction->transaction_datetime = date("Y-m-d H:i:s");


$query = checkCreate($transaction);
returnSuccess($transaction, "transaction", $query);
