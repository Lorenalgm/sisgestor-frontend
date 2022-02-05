import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/loginimagem.png';

export default function Menu(){
    return(
        <div className="menu-container">
            <div className="principal">
                <img src={logo} alt="sisgestor" />
                <div className="menu-principal">
                    <p className="menu-title">Planejamento orçamentário</p>
                    <div className="menu">
                        <div className="menu-group">
                            <p className="menu-group-title">Configuração</p>
                            <div className="submenus">
                                <Link className="submenu" to="/exercicios">Exercícios</Link>
                                <Link className="submenu" to="/programas">Programas</Link>
                                <Link className="submenu" to="/fontes">Fontes</Link>
                                <Link className="submenu" to="/acoes">Ações</Link>
                                <Link className="submenu" to="/naturezas_despesas">Natureza de despesa</Link>
                                <Link className="submenu" to="/instituicoes">Instituições</Link>
                                <Link className="submenu" to="/unidades_gestoras">Unidades gestoras</Link>
                                <Link className="submenu" to="/unidades_administrativas">Unidades administrativas</Link>
                            </div>
                        </div>
                        <div className="menu-group">
                            <Link className="menu-group-title menu-group-link" to="/login">Matriz orçamentária</Link>
                            <Link className="menu-group-title menu-group-link" to="/login">Matriz orçamentária gestora</Link>
                            <Link className="menu-group-title menu-group-link" to="/login">Matriz orçamentária administrativa</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="external">
                <Link className="submenu" to="/login">Sair</Link>
            </div>
        </div>
    )
}