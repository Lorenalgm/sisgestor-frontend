import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.png';
import { SidebarData } from './SidebarData';
import  SubMenu from './SubMenu';

export default function Menu(){
    return(
        <div className="menu-container">
            <div className="principal">
                <img src={logo} alt="sisgestor" />
                <div className="menu-principal">
                    <p className="menu-title">Planejamento orçamentário</p>
                    <div className="menu">
                    {SidebarData.map((item, index) => {
                        return <SubMenu item={item} key={index} />;
                    })}
                    </div>
                    <p className="menu-title">Planejamento estratégico</p>
                    <div className="menu">
                        <div className="menu-group">
                            <Link className="menu-group-title menu-group-link" to="/dimensoes">Dimensões</Link>
                            <Link className="menu-group-title menu-group-link" to="/objetivos">Objetivos</Link>
                            <Link className="menu-group-title menu-group-link" to="/metas">Metas</Link>
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