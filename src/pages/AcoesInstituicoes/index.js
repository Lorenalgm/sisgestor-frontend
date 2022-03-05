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
        console.log(response)
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
                    <h1 className="acoes-instituicao-title">Matriz orçamentária</h1>
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
                                <p>{acao.acao_tipo_id}</p>
                                <p>{acao.exercicio_id}</p>
                            </div>
                        ))
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}