import React, { Component }  from 'react';
import {Button} from '@mui/material';
import { Link,BrowserRouter , useRoutes, Routes ,Route} from 'react-router-dom';
import axios from "axios";
import './Create.css';
import Typed from "./Typed";


export default class Create extends React.Component {
    state = {selector : "DVD", name : "", sku:"", price : 0,size:0, weight:0, height:0,width:0,length:0};
    handleChangeOnTypedComponent = (data)=>{
        if (this.state.selector==="DVD") {
            this.setState({size : parseFloat(data)});
        }
        else if (this.state.selector==="Book"){
            this.setState({weight:parseFloat(data)});
        }
        else if (this.state.selector==="Furniture"){
            this.setState({height : parseFloat(data.height), width : parseFloat(data.width), length : parseFloat(data.length)})
        }
    }
    render() {
        return (
            <div className= "Main ">
                <div className= "head2">
                    <div className="insideHeader">
                      <div className="headerTitle"> <h1 className="h1Header">Product Add</h1></div>

                   <div className="buttons"> <Link to = "/">
                        <Button className = "button" variant="contained"  onClick={ ()=> {
                            let json = JSON.stringify(this.state);
                            console.log( "json inserted : ", json)
                            axios.post(`https://scandiweb-php-server-2981dc143e3b.herokuapp.com`, {product :json }).then( res=>console.log(" post response : " , res.data)  );
                            // TODO make page direction wait for element to be inserted , to avoid not adding element
                        }}> Save </Button>
                    </Link>
                    <Link to= "/" >
                        <Button className = "button" variant="contained"  > Cancel</Button>
                    </Link>
                   </div>
                </div>
                </div>


                <div  className="AddBody">
                    <form id  ="product_form">
                    <div className='container'>
                        <div className='form-group'>
                            <label>
                                Enter SKU
                                <input id  ="sku"  className = "myInput" type = "text" value={this.state.sku} onChange={ (event)=>{
                                    this.setState({sku: event.target.value})
                                }} />
                            </label>
                        </div>
                        <div className='form-group'>
                        <label>
                            Enter the name
                                <input id  ="name" className = "myInput" type = "text" value={this.state.name} onChange={ (event)=>this.setState({name: event.target.value})} />
                        </label>
                    </div>
                        <div className='form-group'>
                        <label>
                            Enter Price
                                <input id  ="price" type = "number" value={this.state.price} onChange={ (event)=>{
                                    this.setState({price: event.target.value})
                                }} />
                        </label>
                        </div>
                            <div className='form-group'>

                                <label>Type switcher  </label>
                                <select id  ="productType" className = "myInputswitch"  value={this.state.selector} onChange={(event)=> this.setState({selector:event.target.value},()=>console.log("current state : ", this.state.selector))}>
                                    <option value="DVD">DVD</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Book">Book</option>
                                </select>
                                <br/>
                            </div>
                        <Typed handle = {this.handleChangeOnTypedComponent} type={this.state.selector} />
                   
                        </div>
                    </form>
                </div>
            </div>
           
        );
    }
}


