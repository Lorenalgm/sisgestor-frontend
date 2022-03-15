import React, { useState, useEffect } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function MovimentosCreate(){
    const [loading, setLoading ] = useState(true);
    const [exercicios, setExercicios ] = useState([]);
    const [exercicioId, setExercicioId ] = useState('');
    const [valor, setValor ] = useState('');
    const [descricao, setDescricao ] = useState('');
    const [tipo, setTipo ] = useState('entrada');
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
            valor,
            descricao,
            tipo,
            exercicio_id: exercicioId
        }

        try {
            const response = await api.post('movimentos', data);
            
            if(response){
                navigate('/movimentos');
            }
        } catch (error) {
            alert(error.response.data.data);
        }
    }

    return(
        <div className="movimentos-create-container">
            <Menu />
            <div className="movimento-create-container">
                <div className="movimentos-create-header">
                    <h1 className="movimento-create-title">Novo Movimento</h1>
                </div>
                <div className="principal">
                        {!loading && (
                            
                            <form className="movimento-create-form" onSubmit={e => handleCreate(e)}>
                                <label htmlFor="exercicioId">Exercício:
                                <select name="exercicioId" id="exercicioId" onChange={e => setExercicioId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {exercicios.map(exercicio =>(
                                        <option key={exercicio.id} value={exercicio.id}>{exercicio.nome}</option>
                                    ))}
                                </select>
                                </label>

                                <label>
                                Valor:
                                    <input type="text" name="valor" onChange={e => setValor(e.target.value)} placeholder="Valor" />
                                </label>   
                                
                                <label>
                                Descrição:
                                    <input type="text" name="descricao" onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />
                                </label> 

                                <label htmlFor="tipo">Tipo:
                                <select name="tipo" id="tipo" onChange={e => setTipo(e.target.value)}>
                                    <option key='entrada' value='entrada'>Entrada</option>
                                    <option key='bloqueio' value='bloqueio'>Bloqueio</option>
                                </select>
                                </label>                              
                        
                                <button type="submit" className="button">
                                    Criar movimento
                                </button>
                            </form>
                        )}
                       
                </div>
            </div>
        </div>
    )
}