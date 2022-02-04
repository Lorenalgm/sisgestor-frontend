import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function Menu(){
    return(
        <div className="menu-container">
             <div className="menu-principal">
                 <p className="menu-title">Planejamento orçamentário</p>
                 <div className="menu">
                     <div className="menu-group">
                        <p className="menu-title">Configuração</p>
                        <div className="submenus">
                            <Link className="submenu" to="login">Exercícios</Link>
                            <Link className="submenu" to="login">Programas</Link>
                            <Link className="submenu" to="login">Fontes</Link>
                            <Link className="submenu" to="login">Ações</Link>
                            <Link className="submenu" to="login">Natureza de despesa</Link>
                            <Link className="submenu" to="login">Unidades gestoras</Link>
                            <Link className="submenu" to="login">Unidades administrativas</Link>
                        </div>
                     </div>
                     <div className="menu-group">
                        <p className="menu-title">Matriz orçamentária</p>
                        <div className="submenus">
                            {/* <Link className="submenu" to="login">Unidades administrativas</Link> */}
                        </div>
                     </div>
                 </div>
             </div>
        </div>
    )
}