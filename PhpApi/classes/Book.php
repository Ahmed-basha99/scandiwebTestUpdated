<?php

namespace JuniorDeveloper\ProductList;
use mysqli;

include_once 'Product.php';
class Book extends Product
{
    private $weight ;

    function __construct ($name,$price,$SKU,$weight)
    {
        parent::__construct($name, $price,$SKU);
        $this->weight=$weight;
        $this->description= "Weight: ".strval($this->getWeight())." KG";;

    }

    public function getWeight()
    {
        return $this->weight;
    }

    public function setWeight($weight)
    {
        $this->weight = $weight;
    }


    public function getDescription()
    {
         return $this->description;
    }

    public function pushProductToDatabase(){
        $db =new mysqli ("us-cdbr-east-05.cleardb.net","b1d57d42dd7fd7","5ca557a6","heroku_e342f8bcb04ca4d");
        mysqli_query ($db,"insert into books values('$this->SKU', '$this->name',$this->price,$this->weight)");
    }

}