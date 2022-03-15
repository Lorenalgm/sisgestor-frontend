import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function BarraGestora(props){
    return(
        <div className="barra-instituicao-container">
            <Link className={props.ativo === 'inicial'?'ativo opcao esquerda': 'opcao esquerda'} to="/matrizes_orcamentarias_gestoras">Inicial</Link>
            <Link className={props.ativo === 'metas_orcamentarias'?'ativo opcao': 'opcao'} to="/metas_orcamentarias">Meta Orçamentária</Link>
            <Link className={props.ativo === 'acoes_gestoras'?'ativo opcao': 'opcao'} to="/acoes_gestoras">Ações</Link>
            <Link className={props.ativo === 'distribuicao'?'ativo opcao': 'opcao'} to="/fontes_acoes_gestoras">Distribuição Administrativa</Link>
            <Link className={props.ativo === 'creditos_planejados_gestoras'?'ativo opcao': 'opcao'} to="/creditos_planejados_gestoras">Créditos Planejados</Link>
            <Link className={props.ativo === 'creditos_disponiveis_gestoras'?'ativo opcao': 'opcao'} to="/creditos_disponiveis_gestoras">Créditos Disponíveis</Link>
            <Link className={props.ativo === 'limites_orcamentarios_gestoras'?'ativo opcao direita': 'opcao direita'} to="/limites_orcamentarios_gestoras">Limites Orçamentários</Link>
        </div>
    )
}