import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import imagem from '../../assets/loginimagem.png';

export default function Login(){
    return(
        <div className="login-container">
            <img src={imagem} alt="sisgestor" />
            <div className="form-login">
                <img src={logo} alt="sisgestor" />
                <input type= "text" placeholder="Email" />
                <input type= "text" placeholder="Senha" />
                <Link to="login">Login</Link>
            </div>
        </div>
    )
}