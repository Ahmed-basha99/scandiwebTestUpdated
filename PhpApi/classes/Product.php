<?php

namespace JuniorDeveloper\ProductList;
use mysqli;

abstract class Product
{
    protected $name;
    protected $price;
    protected $SKU;
    protected $description;
    public function __construct($name, $price, $sku){
        $this->name = $name;
        $this->price = $price;
        $this->SKU = $sku;
    }
    function getName()
    {
        return $this->name;
    }

    function setName($name)
    {
        $this->name = $name;
    }

    function getPrice()
    {
        return $this->price;
    }

    function getPriceAsString ()
    {
        return strval($this->getPrice())." $" ;
    }

    function setPrice($price)
    {
        $this->price = $price;
    }

    function getSKU()
    {
        return $this->SKU;
    }

    function setSKU($SKU)
    {
        $this->SKU = $SKU;
    }

    // the return value of this function is different from object to another
    abstract public function getDescription() ;
    abstract public function pushProductToDatabase();

}