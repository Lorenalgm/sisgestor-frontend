import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import imagem from '../../assets/loginimagem.png';

export default function Login(){
    return(
        <div className="login_container">
                <img src={logo} alt="sisgestor" />
            <div className="form-login">
                <img src={imagem} alt="sisgestor" />
                <form>
                    <input className="input" type= "text" placeholder="Email" />
                    <input className="input" type= "text" placeholder="Senha" />
                    <Link to="login" className='button'>Entrar</Link>
                </form>
            </div>
        </div>
    )
}