<?php
$conn = null;
$conn = checkDbConnection();
$ramen = new Ramen($conn);
$error = [];
$returnData = [];
if (array_key_exists("ramenid", $_GET)) {
    checkPayload($data);

    $ramen->ramen_aid = $_GET['ramenid'];
    $ramen->ramen_title = checkIndex($data, "ramen_title");
    $ramen->ramen_price = checkIndex($data, "ramen_price");
    $ramen->ramen_image = checkIndex($data, "ramen_image");
    $ramen->ramen_category = checkIndex($data, "ramen_category");
    $ramen->ramen_ingredients = json_encode($data["ramen_ingredients"]);

    $ramen->ramen_is_active = 1;
    $ramen->ramen_datetime = date("Y-m-d H:i:s");
    $ramen_title_old = strtolower($data["ramen_title_old"]);

    checkId($ramen->ramen_aid);

    compareName($ramen, $ramen_title_old, $ramen->ramen_title);


    $query = checkUpdate($ramen);
    returnSuccess($ramen, "ramen", $query);
}

checkEndpoint();
