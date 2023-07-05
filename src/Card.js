import React, { useState ,Component} from 'react'
import "./Card.css"
export default  class Card extends React.Component {
    state = {checked : false};

    render () {
        return (
            <div className="main">
               <div className="checkboxContainer">
                        <input type="checkbox" className="delete-checkbox"  checked={this.state.checked} onChange = {()=>this.setState({checked : !this.state.checked},
                        ()=> {
                            this.props.getDataFromCards(this.props.sku,this.state.checked , this.props.type);
                            console.log("changed check on cardjs line 13");
                        } )} />
                </div>

                <div className='trial'>
                        <h3>{this.props.sku}</h3>
                        <p>{this.props.name}</p>
                        <p>{this.props.price}</p>
                        <p>{this.props.description}</p>
                </div>

            </div>
        )}}