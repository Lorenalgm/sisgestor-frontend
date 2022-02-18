import React, { useState } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function NaturezasDespesasCreate(){
    const [nome, setNome ] = useState('');
    const [codigo, setCodigo ] = useState('');
    const [tipo, setTipo ] = useState('');
    const navigate = useNavigate();

    async function handleCreateNaturezaDespesa(e){
        e.preventDefault();

        const data = {
            nome,
            codigo,
            tipo,
            instituicao_id: 3
        }

        try {
            const response = await api.post('naturezas_despesas', data);
            
            if(response){
                navigate('/naturezas_despesas');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar a natureza de despesa');
        }
    }

    return(
        <div className="naturezas-despesas-create-container">
            <Menu />
            <div className="natureza-despesa-create-container">
                <div className="naturezas-despesas-create-header">
                    <h1 className="natureza-despesa-create-title">Nova Natureza de Despesa</h1>
                </div>
                <div className="principal">
                    <form className="natureza-despesa-create-form" onSubmit={e => handleCreateNaturezaDespesa(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
                        </label>
                        <label>
                        Código:
                            <input type="text" name="codigo" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Código" />
                        </label>
                        <label>
                        Tipo:
                            <input type="text" name="tipo" value={tipo} onChange={e => setTipo(e.target.value)} placeholder="Tipo" />
                        </label> 
                      
                        <button type="submit" className="button">
                            Criar Natureza de Despesa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}