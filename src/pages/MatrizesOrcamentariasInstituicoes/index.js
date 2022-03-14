import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraInstituicao from '../../components/BarraInstituicao';

export default function MatrizesOrcamentariasInstituicoes(){
    const [exercicios, setExercicios] = useState([]);
    const [loading, setLoading] = useState(true);
    // TODO: Adicionar filtro de exercício
    // const [exercicioId, setExercicioId] = useState(0);

    useEffect(() => {
      try {
        api.get(`exercicios`).then((response) => {
            console.log(response.data)
            setExercicios(response.data.data.data);
            setLoading(false);
        })
        .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="matrizes-orcamentarias-instituicoes-container">
            <Menu />
            <div className="matriz-orcamentaria-instituicao-container">
                <div className="matrizes-orcamentarias-instituicoes-header">
                    <h1 className="matriz-orcamentaria-instituicao-title">Matriz orçamentária instituição</h1>
                </div>
                <div className="principal">
                    <BarraInstituicao ativo='inicial' />
                    <div className="list-header">
                        <p>Exercício</p>
                        <p>Data início</p>
                        <p>Data fim</p>
                        <p>Aprovado</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        exercicios.map((exercicio, index) => (
                            <div className="matriz-orcamentaria-instituicao-card" key={exercicio.nome}>
                                <p>{exercicio.nome}</p>
                                <p>{exercicio.data_inicio}</p>
                                <p>{exercicio.data_fim}</p>
                                <p>{exercicio.aprovado?'Sim':'Não'}</p>
                            </div>
                        ))
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}