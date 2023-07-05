<?php

namespace JuniorDeveloper\ProductList;
use mysqli;

include_once 'Product.php';
class DVD extends Product
{


    private $size;
    function __construct ($name,$price,$SKU,$size)
    {
        parent::__construct($name, $price,$SKU);

        $this->size = $size;
        $this->description =  "Size ".strval($this->getSize())." MP";
    }

    public function getSize()
    {
        return $this->size;
    }

    public function setSize($size)
    {
        $this->size = $size;
    }


    public function getDescription()
    {
        return $this->description;
    }

    public function pushProductToDatabase(){
        $conn =  new mysqli ("us-cdbr-east-05.cleardb.net","b1d57d42dd7fd7","5ca557a6","heroku_e342f8bcb04ca4d");
        mysqli_query ($conn,"insert into dvd VALUES('$this->SKU', '$this->name',$this->price,$this->size)");

    }

}