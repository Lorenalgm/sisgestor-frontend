import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.png';
// import { SidebarData } from './SidebarData';
// import  SubMenu from './SubMenu';

export default function Menu(){
    return(
        <div className="menu-container">
            <div className="principal">
                <img src={logo} alt="sisgestor" />
                <div className="menu-principal">
                    <p className="menu-title">Configuração de dados</p>
                    <div className="menu">
                    {/* {SidebarData.map((item, index) => {
                        return <SubMenu item={item} key={index} />;
                    })} */}
                        <div className="menu-group">
                            <p className="menu-group-title">Matriz orçamentária</p>
                            <div className="submenus">
                                <Link className="submenu" to="/exercicios">Exercícios</Link>
                                <Link className="submenu" to="/programas_tipos">Programas</Link>
                                <Link className="submenu" to="/fontes_tipos">Tipos de Fontes</Link>
                                <Link className="submenu" to="/acoes_tipos">Tipos de Ações</Link>
                                <Link className="submenu" to="/naturezas_despesas">Naturezas de despesas</Link>
                                <Link className="submenu" to="/instituicoes">Instituições</Link>
                                <Link className="submenu" to="/unidades_gestoras">Unidades gestoras</Link>
                                <Link className="submenu" to="/unidades_administrativas">Unidades administrativas</Link>
                                <Link className="submenu" to="/centros_custos">Centro de Custo</Link>
                                <Link className="submenu" to="/usuarios">Usuários</Link>
                            </div>
                        </div>
                        <div className="menu-group">
                            <p className="menu-group-title">Metas estratégicas</p>
                            <div className="submenus">
                                <Link className="submenu" to="/exercicios">Planos Estratégicos</Link>
                                <Link className="submenu" to="/programas_tipos">Exercícios Plano de ação</Link>
                                <Link className="submenu" to="/fontes_tipos">Eixos</Link>
                                <Link className="submenu" to="/fontes_tipos">Dimensões</Link>
                                <Link className="submenu" to="/fontes_tipos">Objetivos</Link>
                            </div>
                        </div>
                        {/* <div className="menu-group">
                            <p className="menu-group-title">Matriz orçamentária</p>
                            <div className="submenus">
                            <Link className="submenu" to="/matrizes_orcamentarias_instituicoes">Matriz instituição</Link>
                            <Link className="submenu menu-group-link" to="/matrizes_orcamentarias_gestoras">Matriz gestora</Link>
                            <Link className="submenu menu-group-link" to="/matrizes_orcamentarias_administrativas">Matriz administrativa</Link>
                            </div>
                        </div> */}
                        {/* <div className="menu-group">
                            <Link className="menu-group-title menu-group-link" to="/relatorios">Relatórios</Link>
                        </div> */}
                    </div>

                    {/* <p className="menu-title">Planejamento estratégico</p>
                    <div className="menu">
                        <div className="menu-group">
                            <Link className="menu-group-title menu-group-link" to="/dimensoes">Dimensões</Link>
                            <Link className="menu-group-title menu-group-link" to="/objetivos">Objetivos</Link>
                            <Link className="menu-group-title menu-group-link" to="/metas">Metas</Link>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="external">
                {/* <Link className="submenu" to="/login">Sair</Link> */}
            </div>
        </div>
    )
}