import React from 'react';
import {Link} from "react-router-dom";
import AuthOptions from '../auth/AuthOptions'

export default function Header() {
    return (
        <header id="sbheader">
            <Link to="/"><h1 className="sbtitle">Stocks</h1></Link>
            <AuthOptions />
        </header>
        
    )
}
