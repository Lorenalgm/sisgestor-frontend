import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default function BarraInstituicao(props){
    return(
        <div className="barra-instituicao-container">
            <Link className={props.ativo === 'inicial'?'ativo opcao esquerda': 'opcao esquerda'} to="/matrizes_orcamentarias_instituicoes">Inicial</Link>
            <Link className={props.ativo === 'fontes'?'ativo opcao': 'opcao'} to="/fontes_instituicoes">Fontes</Link>
            <Link className={props.ativo === 'acoes'?'ativo opcao': 'opcao'} to="/acoes_instituicoes">Ações</Link>
            <Link className={props.ativo === 'distribuicao'?'ativo opcao direita': 'opcao direita'} to="/fontes_acoes_instituicoes">Distribuição</Link>
        </div>
    )
}