import React, { useState } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function ExerciciosCreate(){
    const [nome, setNome ] = useState('');
    const [data_inicio, setDataInicio ] = useState('');
    const [data_fim, setDataFim ] = useState('');
    const [data_inicio_loa, setDataInicioLoa] = useState('');
    const [data_fim_loa, setDataFimLoa ] = useState('');
    const [aprovado, setAprovado ] = useState(false);
    const navigate = useNavigate();

    async function handleCreateExercicio(e){
        e.preventDefault();

        const data = {
            nome,
            data_inicio: format(new Date(data_inicio), 'dd-MM-yyyy'),
            data_fim: format(new Date(data_fim), 'dd-MM-yyyy'),
            data_inicio_loa: format(new Date(data_inicio_loa), 'dd-MM-yyyy'),
            data_fim_loa: format(new Date(data_fim_loa), 'dd-MM-yyyy'),
            aprovado,
            instituicao_id: 1
        }

        try {
            const response = await api.post('exercicios', data);
            
            if(response){
                navigate('/exercicios');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar o exercício');
        }
    }

    return(
        <div className="exercicios-create-container">
            <Menu />
            <div className="exercicio-create-container">
                <div className="exercicios-create-header">
                    <h1 className="exercicio-create-title">Novo Exercício</h1>
                </div>
                <div className="principal">
                    <form className="exercicio-create-form" onSubmit={e => handleCreateExercicio(e)}>
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
                        <label>
                        Data de início loa:
                            <input type="date" name="data_inicio_loa" value={data_inicio_loa} onChange={e => setDataInicioLoa(e.target.value)} placeholder="Ex: 01/06/2021" />
                        </label> 
                        <label>
                        Data final loa:
                            <input type="date" name="data_fim_loa" value={data_fim_loa} onChange={e => setDataFimLoa(e.target.value)} placeholder="Ex: 01/12/2022" />
                        </label>
                        <div className="check-aprovado">
                            Aprovado?&nbsp;&nbsp;
                            <input type="checkbox"  name="aprovado" value={aprovado} onChange={e => setAprovado(e.target.checked)} placeholder="Sim" /> 
                        </div>
                        <button type="submit" className="button">
                            Criar exercício
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}