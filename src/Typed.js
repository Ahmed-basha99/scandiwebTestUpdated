import React, {Component, useState} from 'react';
import {Button} from '@mui/material';
import { Link,BrowserRouter , useRoutes, Routes ,Route} from 'react-router-dom';
import axios from "axios";
import './Create.css';


export default class Typed extends React.Component {
    state = {size : "0", weight : "0", height :"0", width: "0", length:"0" }
    render() {
        if (this.props.type === "DVD") {
            return (
              <div className='form-group'>

                <label>
                    Enter the size
                    <input id = "size" type="number" className="myInput" value={this.state.size} onChange={
                        (event) => {
                            this.setState({size : event.target.value});
                            this.props.handle(event.target.value);
                        }}/>
                </label>
              </div>

            )
        }
        else if (this.props.type === "Furniture")
        {
            return  (
                <div className="furniture" >
                <div className='form-group'>
                    <label>
                        Enter the height
                        <input id = "height" type="number" className="myInput" value={this.state.height} onChange={
                            (event) => {
                                this.setState({height : event.target.value});
                                this.props.handle({height : event.target.value, width:this.state.width, length:this.state.length})
                            }}/>
                    </label>
                </div>
                <div className='form-group'>

                    <label>
                        Enter the width
                        <input id = "width" type="number" className="myInput" value={this.state.width} onChange={
                            (event) => {
                                this.setState({width : event.target.value});
                                this.props.handle ({height : this.state.height , width : event.target.value, length : this.state.length})
                            }}/>
                    </label>
                </div>
                <div className='form-group'>
                    <label>
                        Enter the length
                        <input id = "length" type="number" className="myInput" value={this.state.length} onChange={
                            (event) => {
                                this.setState({length : event.target.value})
                                this.props.handle ({height:this.state.height, length : event.target.value, width: this.state.width})

                            }}/>
                    </label>
                </div>
            </div>

        )
        }
        else if (this.props.type === "Book")
        {
            return (
              <div className='form-group'>

                <label>
                    Enter the weight
                    <input id = "weight" type="number" className="myInput" value={this.state.weight} onChange={
                        (event) => {
                            this.setState({weight : event.target.value});
                            this.props.handle(event.target.value)
                        }}/>
                </label>
              </div>

            )
        }
    }
}
