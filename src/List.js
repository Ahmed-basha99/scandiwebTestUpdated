import './App.css';
import React, { Component }  from 'react';
import Header from "./Header";
import Card from "./Card.js";
import axios from "axios";

export default class List extends React.Component {
    state = {checkedElements : new Set (),data: []} ;
    getDataFromCards = (id,value,type)=>{
        if (value === false) {
            this.state.checkedElements.delete({id,type});
            this.setState({checkedElements :  this.state.checkedElements}, ()=>console.log(this.state.checkedElements))
        }
        else {
            this.state.checkedElements.add({id,type})
            this.setState({checkedElements : this.state.checkedElements}, ()=> console.log("after adding " ,this.state.checkedElements))
        }
    }

    getEventFromHeader = ()=>{
        const Json = JSON.stringify(Array.from(this.state.checkedElements));
        axios.post(`https://scandiweb-php-server-2981dc143e3b.herokuapp.com`, {data : Json}).then( ()=>{this.setState({checkedElements : new Set()}); console.log("state is clear"); window.location.reload()   });
    }
    getAllCards = ()=>{
        console.log("list requested");
        axios.get(`https://scandiweb-php-server-2981dc143e3b.herokuapp.com` )
            .then(res=> {this.setState({data:res.data} )})}

    componentDidMount() {

        this.getAllCards();
    }

    render() {
        return (
            <div className="App">
                <Header  getEventFromHeader={ this.getEventFromHeader}/>
                <div className="body">
                    {
                        this.state.data.map((val)=>{
                            return (
                                <Card getDataFromCards={this.getDataFromCards} type = {val.type } sku = {val.SKU} price = {val.price} name= {val.name} description = {val.description}/>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}