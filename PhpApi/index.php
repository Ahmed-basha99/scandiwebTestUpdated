<?php

include_once 'classes/ProductFactory.php';


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
$method =$_SERVER['REQUEST_METHOD'];
$restJson = file_get_contents("php://input");
$_POST = json_decode($restJson, true);

$conn =  new mysqli ("us-cdbr-east-05.cleardb.net",
    "b1d57d42dd7fd7","5ca557a6","heroku_e342f8bcb04ca4d");
function takeDataFromProduct ($product, $type){
    $object=new stdClass;
    $object->name= $product->getName();
    $object->description= $product->getDescription();
    $object->SKU= $product->getSKU();
    $object->price= $product->getPriceAsString();
    $object->type=$type;
    return $object;

}


if ($method==="GET") {
    error_log("get request ");
    $productFactory = new JuniorDeveloper\ProductList\ProductFactory();
    $myArray = [];

    if ($result = mysqli_query($conn, 'select * from books') )
    {
        while ($row=mysqli_fetch_row($result)) {
            $params = array ($row[1],$row[2],$row[0],$row[3]);
            $product= $productFactory->createProduct("Book",$params);
            $myArray []= takeDataFromProduct($product,"Book");
        }
    }

    if ($result = mysqli_query($conn, 'select * from DVD') )
    {
        while ($row=mysqli_fetch_row($result)) {
            $params = array ($row[1],$row[2],$row[0],$row[3]);
            $product= $productFactory->createProduct("DVD",$params);
            $myArray []= takeDataFromProduct($product,"DVD");
        }
    }

    if ($result = mysqli_query($conn, 'select * from furniture '))
    {
        while ($row=mysqli_fetch_row($result)) {
            $params = array ($row[1],$row[2],$row[0],$row[3],$row[4],$row[5]);

            $product= $productFactory->createProduct("furniture",$params);
            $myArray []= takeDataFromProduct($product,"furniture");
        }
    }
    error_log("get request served ");

    echo (json_encode($myArray));
}

if (isset($_POST['data']))
{
    http_response_code(200);
    $arr= json_decode($_POST['data'],true);
    $bookIds = [];
    $furnitureIds = [];
    $DVDIds= [];
    for ($i=0;$i<sizeof($arr);$i++)
    {
        if ($arr[$i]['type']=='Book')$bookIds[]="'" . strval($arr[$i]['id']) . "'";
        else if ($arr[$i]['type']=='DVD') $DVDIds[]= "'" .strval($arr[$i]['id']) . "'";
        else if ($arr[$i]['type']=='furniture')$furnitureIds[]="'" .strval($arr[$i]['id']). "'";
    }
    $bookIdsAsString = join(",",$bookIds);
    $furnitureIdsAsString = join(",",$furnitureIds);
    $DVDIdsAsString = join(",",$DVDIds);
    error_log("started deleting" . $bookIdsAsString.$furnitureIdsAsString.$DVDIdsAsString);
    if (sizeof($bookIds))
    {
        $result = mysqli_query($conn, "delete from books where SKU in ({$bookIdsAsString})");
    }
    if (sizeof($furnitureIds))
    {
        mysqli_query($conn, "delete from furniture where SKU in ({$furnitureIdsAsString})");
    }
    if (sizeof($DVDIds))
    {
        mysqli_query($conn, "delete from DVD where SKU in ({$DVDIdsAsString})");
    }
    error_log("finished deleting");

}



if (isset($_POST['product'])){
    http_response_code(200);
    $val =( $_POST['product']);
    $product= json_decode($val,true);
    error_log(json_encode($product));
    $productFactory = new JuniorDeveloper\ProductList\ProductFactory();
    if ($product['selector']==='DVD') {
        $params = array ($product['name'],$product['price'],$product['sku'],$product['size']);
        if ($product['price']!=0 &&$product['size']!=0) $product = $productFactory->createProduct("DVD", $params);
    }
    else if ($product['selector']==='Book') {
        $params = array ($product['name'],$product['price'],$product['sku'],$product['weight']);
        if ($product['price']!=0 &&$product['weight']!=0) $product = $productFactory->createProduct("Book", $params);
    }
    else if ($product['selector']==='Furniture') {
        $params = array ($product['name'],$product['price'],$product['sku'],$product['height'],$product['width'],$product['length']);
        if ($product['price']!=0 &&$product['height']!=0 && $product['width']!=0  &&
            $product['length']!=0)$product = $productFactory->createProduct("furniture", $params);
    }
    else error_log("selector is wrong");


    $product->pushProductToDatabase();

}





