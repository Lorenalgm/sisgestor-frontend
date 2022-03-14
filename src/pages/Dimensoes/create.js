import React, { useState, useEffect } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function DimensoesCreate(){
    const [nome, setNome ] = useState('');
    const [descricao, setDescricao ] = useState('');
    const [loading, setLoading ] = useState(true);
    const [exercicios, setExercicios ] = useState([]);
    const [exercicioId, setExercicioId ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
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

    async function handleCreate(e){
        e.preventDefault();

        const data = {
            nome,
            descricao,
            exercicio_id: exercicioId,
            instituicao_id: 1
        }

        try {
            const response = await api.post('dimensoes', data);
            
            if(response){
                navigate('/dimensoes');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar a dimensão');
        }
    }

    return(
        <div className="dimensoes-create-container">
            <Menu />
            <div className="dimensao-create-container">
                <div className="dimensoes-create-header">
                    <h1 className="dimensao-create-title">Nova Dimensão</h1>
                </div>
                <div className="principal">
                    {!loading && (<form className="dimensao-create-form" onSubmit={e => handleCreate(e)}>
                        <label htmlFor="exercicioId">Exercício:
                            <select name="exercicioId" id="exercicioId" onChange={e => setExercicioId(e.target.value)}>
                                <option key='' value=''>Selecione</option>
                                {exercicios.map(exercicio =>(
                                    <option key={exercicio.id} value={exercicio.id}>{exercicio.nome}</option>
                                ))}
                            </select>
                        </label>

                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Escreva o nome" />
                        </label> 

                        <label>
                        Dimensão:
                            <input type="text" name="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Escreva uma descrição" />
                        </label> 
                       
                        <button type="submit" className="button">
                            Criar Dimensão
                        </button>
                    </form>)}
                </div>
            </div>
        </div>
    )
}