import './App.css';
import React, { Component }  from 'react';
import Header from "./Header";
import Card from "./Card.js";
import List from "./List.js";
import axios from "axios";
import Create from "./Create.js";
import ReactDOM from "react-dom/client";

import { Link,BrowserRouter , useRoutes, Routes ,Route} from 'react-router-dom';
const AppRoutes = ()=>{
    const Rou = useRoutes( [
        { path : "/", element : <List/>},
        {path : "/create", element : <Create/>}
    ]);
    return Rou;
}
export default function App(){
    return (
       < BrowserRouter>
           <AppRoutes/>
       </BrowserRouter>
    )
}









