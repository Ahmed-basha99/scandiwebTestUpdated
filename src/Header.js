import React, { useState } from 'react'
import {Button} from '@mui/material';
import { Link,BrowserRouter as Router} from 'react-router-dom';

import './Header.css';



export default function Header (props) {
    // I will have a usestate here that has the ids of element to be delelted
    return <div className="head2" >
        <div className="insideHeader">
        <div className="headerTitle"><h1 className="h1Header">Product List</h1></div>
        <div className="buttons">

                <Link  to = "/create">
                    <Button className = "add" variant="contained" style={{ margin:10 }}> ADD </ Button>
                </Link>

            <Button style={{maxWidth: '120px', maxHeight: '30px', minWidth: '120px', minHeight: '30px',  }} className = "delete" variant="contained" onClick={()=> props.getEventFromHeader() } >
                MASS DELETE
            </Button>


        </div>
        </div>

    </div>
}
