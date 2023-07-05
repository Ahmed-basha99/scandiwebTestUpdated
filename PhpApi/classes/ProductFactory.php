<?php

namespace JuniorDeveloper\ProductList;

include_once 'Furniture.php';
include_once 'DVD.php';
include_once 'Book.php';
include_once 'Product.php';

class ProductFactory
{
    function __construct (){
    }
    public function createProduct($type, $params)
    {
        if ($type ==="DVD") return new DVD($params[0], $params[1], $params[2],$params[3]);

        else if ($type === "furniture") return new Furniture($params[0], $params[1], $params[2],$params[3],$params[4],$params[5]);

        else if ($type === "Book") return new Book($params[0], $params[1], $params[2],$params[3]);

        else return null;
    }

}