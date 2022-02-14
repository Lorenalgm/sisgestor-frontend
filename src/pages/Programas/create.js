import React, { useState } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

export default function ProgramasCreate(){
    const [nome, setNome ] = useState('');
    const [codigo, setCodigo ] = useState('');
    const navigate = useNavigate();

    async function handleCreatePrograma(e){
        e.preventDefault();

        const data = {
            nome,
            codigo,
            instituicao_id: 3
        }

        try {
            const response = await api.post('programas_tipos', data);
            
            if(response){
                navigate('/programas');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar o programa');
        }
    }

    return(
        <div className="programas-create-container">
            <Menu />
            <div className="programa-create-container">
                <div className="programas-create-header">
                    <h1 className="programa-create-title">Novo Programa</h1>
                </div>
                <div className="principal">
                    <form className="programa-create-form" onSubmit={e => handleCreatePrograma(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Escreva o nome" />
                        </label> 
                        <label>
                        Código:
                            <input type="text" name="codigo" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Escreva o código" />
                        </label> 
                        <button type="submit" className="button">
                            Criar programa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}