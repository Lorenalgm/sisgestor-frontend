import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default function Home(){
    return(
        <div className="home-container">
            <Link to="login">Login</Link>
            <p>Adicionar aqui informações</p>
        </div>
    )
}