import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import '../styles/index.css';
import {Link} from 'react-router-dom';

class Header extends Component{
    render(){
        return(
            <Fragment>
                <header>
                    <nav className="container menu-list py-1">
                        <div className="logo-name">
                            <div className="logo">
                                <span className="e">F!</span>
                            </div>
                            <div className="app-name">
                                <Link to={"/"} className="text-decoration-none"><span>Foodie</span></Link>
                            </div>
                        </div>
                        <div className="nav-items">
                            <ul>
                                <li>Sign in</li>
                                <li>Sign up</li>
                            </ul>
                        </div>
                    </nav>
                </header>
		
            </Fragment>
        )
    }
}

export default Header;