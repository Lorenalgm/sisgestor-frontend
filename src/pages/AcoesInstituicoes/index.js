import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraInstituicao from '../../components/BarraInstituicao';

export default function AcoesInstituicoes(){
    const [exercicios, setExercicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [exercicioId, setExercicioId] = useState(0);

    useEffect(() => {
      try {
        setExercicioId(0)
        if(exercicioId > 0){
            api
              .get(`exercicios/${exercicioId}`)
              .then((response) => {
                setExercicios(response.data.data.data);
                setLoading(false);
              })
              .catch((err) => console.log(err));
        }
      } catch (error) {
        alert(error);
      }
    }, [exercicioId]);

    return(
        <div className="matrizes-orcamentarias-instituicoes-container">
            <Menu />
            <div className="matriz-orcamentaria-instituicao-container">
                <div className="matrizes-orcamentarias-instituicoes-header">
                    <h1 className="matriz-orcamentaria-instituicao-title">Matriz orçamentária</h1>
                </div>
                <div className="principal">
                    <BarraInstituicao ativo='acoes' />
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
                                <p>{exercicio.data_inicio}</p>
                                <p>{exercicio.data_fim}</p>
                                <p>{exercicio.aprovado?'Sim':'Não'}</p>
                            </div>
                        ))
                    )}
                    
                    {/* TODO: excluir mock depois */}
                    <div className="matriz-orcamentaria-instituicao-card" key="2022">
                        <p>2022</p>
                        <p>02/02/2022</p>
                        <p>02/12/2022</p>
                        <p>Sim</p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}