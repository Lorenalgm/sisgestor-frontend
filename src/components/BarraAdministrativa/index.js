import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function BarraAdministrativa(props){
    return(
        <div className="barra-administrativa-container">
            <Link className={props.ativo === 'inicial'?'ativo opcao esquerda': 'opcao esquerda'} to="/matrizes_orcamentarias_administrativas">Inicial</Link>
            <Link className={props.ativo === 'acoes'?'ativo opcao': 'opcao'} to="/acoes_administrativas">Ações</Link>
            <Link className={props.ativo === 'despesas'?'ativo opcao': 'opcao'} to="/despesas">Despesas</Link>
            <Link className={props.ativo === 'creditos_planejados_administrativas'?'ativo opcao': 'opcao'} to="/creditos_planejados_administrativas">Créditos Planejados</Link>
            <Link className={props.ativo === 'creditos_disponíveis_administrativas'?'ativo opcao': 'opcao'} to="/creditos_disponíveis_administrativas">Créditos Disponíveis</Link>
            <Link className={props.ativo === 'empenhar'?'ativo opcao direita': 'opcao direita'} to="/empenhar">Empenhar</Link>
        </div>
    )
}