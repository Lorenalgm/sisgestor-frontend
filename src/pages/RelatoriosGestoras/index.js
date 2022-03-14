import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraRelatorios from '../../components/BarraRelatorios';

export default function RelatoriosGestoras(){
    const [unidadeGestoraId, setUnidadeGestoraId ] = useState('');
    const [relatorioTipo, setRelatorioTipo ] = useState('1');
    const [loading, setLoading ] = useState(true);
    const [unidadesGestoras, setUnidadesGestoras ] = useState('');
    const [exercicios, setExercicios ] = useState([]);
    const [exercicioId, setExercicioId ] = useState('');

    useEffect(() => {
        try {
            api
              .get(`exercicios`)
              .then((response) => {
                setExercicios(response.data.data.data);
              })
              .catch((err) => console.log(err));

            api
              .get(`unidades_gestoras`)
              .then((response) => {
                setUnidadesGestoras(response.data.data.data);
                setLoading(false)
              })
              .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }

    }, [])

    async function handleOpen(e){
        e.preventDefault();

        if(relatorioTipo === 2){
            window.location.href = `https://sigestorapi.herokuapp.com/relatorio_completo/unidade_gestora/1/${exercicioId}/${unidadeGestoraId}`; 
        }else{
            window.location.href = `https://sigestorapi.herokuapp.com/relatorio_simplificado/unidade_gestora/1/${exercicioId}/${unidadeGestoraId}`; 
        }

    }

    return(
        <div className="relatorios-container">
            <Menu />
            <div className="relatorio-container">
                <div className="relatorios-header">
                    <h1 className="relatorio-title">Relatórios gestora</h1>
                </div>
                <div className="principal">
                    <BarraRelatorios ativo='gestora' />
                    <div className="list">
                        <form className="fonte-instituicao-create-form" onSubmit={e => handleOpen(e)}>
                                {!loading && <>
                                
                                    <label htmlFor="exercicioId">Exercício:
                                        <select name="exercicioId" id="exercicioId" onChange={e => setExercicioId(e.target.value)}>
                                            <option key='' value=''>Selecione</option>
                                            {exercicios.map(exercicio =>(
                                                <option key={exercicio.id} value={exercicio.id}>{exercicio.nome}</option>
                                            ))}
                                        </select>
                                    </label>

                                <label htmlFor="unidade_gestora_id">Unidade Gestora:
                                    <select name="unidade_gestora_id" id="unidade_gestora_id" onChange={e => setUnidadeGestoraId(e.target.value)}>
                                        <option key='' value=''>Selecione</option>
                                        {unidadesGestoras.map(unidade_gestora =>(
                                            <option key={unidade_gestora.id} value={unidade_gestora.id}>{unidade_gestora.nome}</option>
                                        ))}
                                    </select>
                                </label>
                                </>}
                                
                                <label htmlFor="relatorioTipo">Tipo de relatório:
                                    <select name="relatorioTipo" id="relatorioTipo" onChange={e => setRelatorioTipo(e.target.value)}>
                                        <option key='1' value='1'>Simplificado</option>
                                        <option key='2' value='2'>Completo</option>
                                    </select>
                                </label>

                                <button type="submit" className="button">
                                    Abrir relatório
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}