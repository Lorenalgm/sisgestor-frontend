import React, { useState, useEffect } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FontesTiposEdit(){
    const dimensao = useLocation().state.dimensao;
    const [nome, setNome ] = useState(dimensao.nome);
    const [descricao, setDescricao ] = useState(dimensao.descricao);
    const [exercicioId, setExercicioId ] = useState(dimensao.exercicio_id);
    const [exercicios, setExercicios ] = useState([]);
    const [loading, setLoading ] = useState(true);
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
    
    async function handleEdit(e){
        e.preventDefault();

        const data = {
            nome,
            descricao,
            exercicio_id: exercicioId,
            instituicao_id: 1
        }

        try {
            const response = await api.put(`dimensoes/${dimensao.id}`, data);
            
            if(response){
                navigate('/dimensoes');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar a dimensão');
        }
    }

    return(
        <div className="dimensoes-edit-container">
            <Menu />
            <div className="dimensao-edit-container">
                <div className="dimensoes-edit-header">
                    <h1 className="dimensao-edit-title">Editar Dimensão</h1>
                </div>
                <div className="principal">
                    {!loading && (<form className="dimensao-edit-form" onSubmit={e => handleEdit(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Escreva o nome" />
                        </label> 

                        <label>
                        Descrição:
                            <input type="text" name="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Escreva a descrição" />
                        </label> 

                        <label htmlFor="exercicio_id">Exercício:
                            <select name="exercicio_id" id="exercicio_id" onChange={e => setExercicioId(e.target.value)}>
                                <option key='' value=''>Selecione</option>
                                {exercicios.map(exercicio =>(
                                    <option key={exercicio.id} value={exercicio.id} selected={exercicioId === exercicio.id? 'selected': ''}>{exercicio.nome}</option>
                                ))}
                            </select>
                        </label>
                        <button type="submit" className="button">
                            Atualizar dimensão
                        </button>
                    </form>)}
                </div>
            </div>
        </div>
    )
}