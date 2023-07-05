<?php

namespace JuniorDeveloper\ProductList;
use mysqli;

include_once 'Product.php';
class Furniture extends Product
{
    private $height;
    private $width;
    private $length;

    function __construct($name,$price,$SKU,$height,$width,$length)
    {
        parent::__construct($name, $price,$SKU);
        $this->height = $height;
        $this->width = $width;
        $this->length = $length;
        $this->description= "Dimensions: ". strval($this->height)." X ".strval($this->width)." X ".($this->length) ;
    }

    public function getHeight()
    {
        return $this->height;
    }


    public function setHeight($height)
    {
        $this->height = $height;
    }


    public function getWidth()
    {
        return $this->width;
    }


    public function setWidth($width)
    {
        $this->width = $width;
    }


    public function getLength()
    {
        return $this->length;
    }


    public function setLength($length)
    {
        $this->length = $length;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function pushProductToDatabase()
    {
        $db =new mysqli ("us-cdbr-east-05.cleardb.net","b1d57d42dd7fd7","5ca557a6","heroku_e342f8bcb04ca4d");
        mysqli_query ($db,"insert into furniture values('$this->SKU', '$this->name',$this->price,$this->height, $this->width,$this->length)");
    }

}