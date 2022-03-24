import React, { useState } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';

export default function ExerciciosEdit(){
    const exercicio = useLocation().state.exercicio;
    const [nome, setNome ] = useState(exercicio.nome);
    const [data_inicio, setDataInicio ] = useState(exercicio.data_inicio);
    const [data_fim, setDataFim ] = useState(exercicio.data_fim);
    const [aprovado, setAprovado ] = useState(exercicio.aprovado);
    const navigate = useNavigate();
    async function handleEditExercicio(e){
        e.preventDefault();

        const data = {
            nome,
            data_inicio: format(new Date(data_inicio), 'dd-MM-yyyy'),
            data_fim: format(new Date(data_fim), 'dd-MM-yyyy'),
            aprovado,
            instituicao_id: 1
        }

        try {
            const response = await api.put(`exercicios/${exercicio.id}`, data);
            
            if(response){
                navigate('/exercicios');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar o exercício');
        }
    }

    return(
        <div className="exercicios-edit-container">
            <Menu />
            <div className="exercicio-edit-container">
                <div className="exercicios-edit-header">
                    <h1 className="exercicio-edit-title">Editar Exercício</h1>
                </div>
                <div className="principal">
                    <form className="exercicio-edit-form" onSubmit={e => handleEditExercicio(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: 2022" />
                        </label> 
                        <label>
                        Data de início:
                            <input type="date" name="data_inicio" value={data_inicio} onChange={e => setDataInicio(e.target.value)} placeholder="Ex: 01/06/2021" />
                        </label> 
                        <label>
                        Data final:
                            <input type="date" name="data_fim" value={data_fim} onChange={e => setDataFim(e.target.value)} placeholder="Ex: 01/12/2022" />
                        </label> 
                        <div className="check-aprovado">
                            Aprovado?&nbsp;&nbsp;
                            <input type="checkbox"  name="aprovado" value={aprovado} onChange={e => setAprovado(e.target.checked)} placeholder="Sim" checked={aprovado?'checked':''} /> 
                        </div>
                        <button type="submit" className="button">
                            Atualizar exercício
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}