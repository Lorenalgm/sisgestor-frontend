import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function BarraRelatorios(props){
    return(
        <div className="barra-relatorios-container">
            <Link className={props.ativo === 'instituicao'?'ativo opcao esquerda': 'opcao esquerda'} to="/relatorios">Instituição</Link>
            <Link className={props.ativo === 'gestora'?'ativo opcao': 'opcao'} to="/relatorios_gestoras">Unidade Gestora</Link>
            <Link className={props.ativo === 'administrativa'?'ativo opcao direita': 'opcao direita'} to="/relatorios_administrativas">Unidade Administrativa</Link>
        </div>
    )
}