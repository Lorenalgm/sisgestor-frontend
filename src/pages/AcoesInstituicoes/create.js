import React, { useState, useEffect } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function AcoesInstituicoesCreate(){
    const [acoesTipos, setAcoesTipos ] = useState([]);
    const [exercicios, setExercicios ] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [acaoTipoId, setAcaoTipoId ] = useState('');
    const [exercicioId, setExercicioId ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            api
              .get(`acoes_tipos`)
              .then((response) => {
                setAcoesTipos(response.data.data.data);
              })
              .catch((err) => console.log(err));

              api
              .get(`exercicios`)
              .then((response) => {
                setExercicios(response.data.data.data);
                setLoading(false)
              })
              .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }

    }, [])

    async function handleCreateAcaoInstituicao(e){
        e.preventDefault();

        const data = {
            acao_tipo_id: acaoTipoId,
            exercicio_id: exercicioId,
            instituicao_id: 1
        }

        try {
            const response = await api.post('acoes', data);
            
            if(response){
                navigate('/acoes_instituicoes');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar a ação');
        }
    }

    return(
        <div className="acoes-instituicoes-create-container">
            <Menu />
            <div className="acao-instituicao-create-container">
                <div className="acoes-instituicoes-create-header">
                    <h1 className="acao-instituicao-create-title">Nova Ação</h1>
                </div>
                <div className="principal">
                        {!loading && (
                            
                            <form className="acao-instituicao-create-form" onSubmit={e => handleCreateAcaoInstituicao(e)}>
                                <label htmlFor="acaoTipoId">Ação tipo:
                                    <select name="acaoTipoId" id="acaoTipoId" onChange={e => setAcaoTipoId(e.target.value)}>
                                        <option key='' value=''>Selecione</option>
                                        {acoesTipos.map(acao =>(
                                            <option key={acao.id} value={acao.id}>{acao.nome}</option>
                                        ))}
                                    </select>
                                </label>

                                <label htmlFor="exercicioId">Exercício:
                                <select name="exercicioId" id="exercicioId" onChange={e => setExercicioId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {exercicios.map(exercicio =>(
                                        <option key={exercicio.id} value={exercicio.id}>{exercicio.nome}</option>
                                    ))}
                                </select>
                                </label>
                        
                                <button type="submit" className="button">
                                    Criar ação
                                </button>
                            </form>
                        )}
                       
                </div>
            </div>
        </div>
    )
}