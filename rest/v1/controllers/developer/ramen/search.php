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
$body = file_get_contents("php://input");
$data = json_decode($body, true);

if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
    checkApiKey();
    checkPayload($data);
    $ramen->ramen_search = $data["searchValue"];    // get data
    if ($data["isFilter"] == true) {

        if ($ramen->ramen_search != "") {

            checkKeyword($ramen->ramen_search);
            $ramen->ramen_is_active = checkIndex($data, "ramen_is_active");
            $query = checkFilterByStatusAndSearch($ramen);
            http_response_code(200);
            getQueriedData($query);
        }


        $ramen->ramen_is_active = checkIndex($data, "ramen_is_active");
        $query = checkFilterByStatus($ramen);
        http_response_code(200);
        getQueriedData($query);
    }

    checkKeyword($ramen->ramen_search);
    $query = checkSearch($ramen);
    http_response_code(200);
    getQueriedData($query);

    checkEndpoint();
}

http_response_code(200);
checkAccess();
