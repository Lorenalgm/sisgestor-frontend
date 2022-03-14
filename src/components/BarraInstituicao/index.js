import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function BarraInstituicao(props){
    return(
        <div className="barra-instituicao-container">
            <Link className={props.ativo === 'inicial'?'ativo opcao esquerda': 'opcao esquerda'} to="/matrizes_orcamentarias_instituicoes">Inicial</Link>
            <Link className={props.ativo === 'fontes'?'ativo opcao': 'opcao'} to="/fontes_instituicoes">Fontes</Link>
            <Link className={props.ativo === 'acoes'?'ativo opcao': 'opcao'} to="/acoes_instituicoes">Ações</Link>
            <Link className={props.ativo === 'distribuicao'?'ativo opcao': 'opcao'} to="/fontes_acoes_instituicoes">Distribuição Gestora</Link>
            <Link className={props.ativo === 'movimentos'?'ativo opcao': 'opcao'} to="/movimentos">Movimentos</Link>
            <Link className={props.ativo === 'limites_orcamentarios'?'ativo opcao direita': 'opcao direita'} to="/limites_orcamentarios">Limites orçamentários</Link>
        </div>
    )
}