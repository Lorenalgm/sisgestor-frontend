import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraInstituicao from '../../components/BarraInstituicao';
import { Link } from 'react-router-dom';

export default function AcoesInstituicoes(){
    const [acoes, setAcoes] = useState([]);
    const [loading, setLoading] = useState(true);
    // TODO: Adicionar filtro de exercício
    // const [exercicioId, setExercicioId] = useState(0);

    useEffect(() => {
      try {
        api
        .get(`acoes?instituicao_id=1&exercicio_id=1`)
        .then((response) => {
        setAcoes(response.data.data.data);
        setLoading(false);
        })
        .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="acoes-instituicoes-container">
            <Menu />
            <div className="acoes-instituicao-container">
                <div className="acoes-instituicoes-header">
                    <h1 className="acoes-instituicao-title">Ações da instituição</h1>
                    <Link className="button" to="/acoes_instituicoes/criar">Criar</Link>
                </div>
                <div className="principal">
                    <BarraInstituicao ativo='acoes' />
                    <div className="list-header">
                        <p>Ação</p>
                        <p>Exercício</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        acoes.map((acao, index) => (
                            <div className="acoes-instituicao-card" key={acao.id}>
                                <div className="info-acoes">
                                    <p>{acao.acao_tipo.nome}</p>
                                    <p>{acao.valor_total}</p>
                                </div>
                                <div className="info-fontes">
                                    {acao.fontes.map(fonte => (
                                        <div className="card-acao">
                                            <p>{fonte.fonte_tipo.nome}</p>
                                            <p>{fonte.valor}</p>
                                            <p>{fonte.valor_distribuido}</p>
                                            <p>{fonte.valor_utilizado}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}