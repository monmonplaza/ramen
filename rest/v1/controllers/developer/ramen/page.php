<?php
// set http header
require '../../../core/header.php';
// use needed functions
require '../../../core/functions.php';
// use needed classes
require '../../../models/developer/Ramen.php';
$conn = null;
$conn = checkDbConnection();
$ramen = new Ramen($conn);
$response = new Response();
if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();

    if (array_key_exists("start", $_GET)) {
        $ramen->ramen_start = $_GET['start'];
        $ramen->ramen_total = 50;
        checkLimitId($ramen->ramen_start, $ramen->ramen_total);
        $query = checkReadLimit($ramen);
        $total_result = checkReadAll($ramen);
        http_response_code(200);
        checkReadQuery(
            $query,
            $total_result,
            $ramen->ramen_total,
            $ramen->ramen_start
        );
    }

    checkEndpoint();
}

http_response_code(200);
checkAccess();
