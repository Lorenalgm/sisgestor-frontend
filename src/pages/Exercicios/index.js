import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import imagem from '../../assets/loginimagem.png';

export default function Exercicios(){
    return(
        <div className="exercicios-container">
            <img src={imagem} alt="sisgestor" />
            <div className="exercicio-container">
                <div className="exercicios-header">
                    <h1 className="exercicio-title">Exercicíos</h1>
                    <Link to="login">Criar</Link>
                </div>
            </div>
        </div>
    )
}