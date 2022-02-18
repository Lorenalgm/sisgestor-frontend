import React, { useState, useEffect } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function FontesAcoesInstituicoesCreate(){
    const [fontesTipos, setFontesTipos ] = useState([]);
    const [exercicios, setExercicios ] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [fonteTipoId, setFonteTipoId ] = useState('');
    const [exercicioId, setExercicioId ] = useState('');
    const [valor, setValor ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            api
              .get(`fontes_tipos`)
              .then((response) => {
                setFontesTipos(response.data.data.data);
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

    async function handleCreateFonteInstituicao(e){
        e.preventDefault();

        const data = {
            fonte_tipo_id: fonteTipoId,
            exercicio_id: exercicioId,
            valor,
            instituicao_id: 1
        }

        try {
            const response = await api.post('fontes', data);
            
            if(response){
                navigate('/fontes_instituicoes');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar a fonte');
        }
    }

    return(
        <div className="fontes-acoes-instituicoes-create-container">
            <Menu />
            <div className="fonte-acao-instituicao-create-container">
                <div className="fontes-acoes-instituicoes-create-header">
                    <h1 className="fonte-acao-instituicao-create-title">Nova Fonte</h1>
                </div>
                <div className="principal">
                        {!loading && (
                            
                            <form className="fonte-acao-instituicao-create-form" onSubmit={e => handleCreateFonteInstituicao(e)}>
                                
                                <label htmlFor="fonteTipoId">Fonte tipo:
                                    <select name="fonteTipoId" id="fonteTipoId" onChange={e => setFonteTipoId(e.target.value)}>
                                        <option key='' value=''>Selecione</option>
                                        {fontesTipos.map(fonte =>(
                                            <option key={fonte.id} value={fonte.id}>{fonte.nome}</option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                Valor:
                                    <input type="text" name="valor" onChange={e => setValor(e.target.value)} placeholder="Valor da fonte" />
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