import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Home(){
    return(
        <div className="home-container">
            <div className="home-header">
                <img src={logo} alt="sisgestor" />
                <Link className="button" to="login">Login</Link>
            </div>
            <main>

            </main>
        </div>
    )
}