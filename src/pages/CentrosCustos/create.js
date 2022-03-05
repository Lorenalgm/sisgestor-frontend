import React, { useState } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function CentrosCustosCreate(){
    const [nome, setNome ] = useState('');
    const navigate = useNavigate();

    async function handleCreate(e){
        e.preventDefault();

        const data = {
            nome,
            instituicao_id: 1
        }

        try {
            const response = await api.post('centros_custos', data);
            
            if(response){
                navigate('/centros_custos');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar o centro de custo');
        }
    }

    return(
        <div className="centros-custos-create-container">
            <Menu />
            <div className="centro-custo-create-container">
                <div className="centros-custos-create-header">
                    <h1 className="centro-custo-create-title">Novo Centro de Custo</h1>
                </div>
                <div className="principal">
                    <form className="centro-custo-create-form" onSubmit={e => handleCreate(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Escreva o nome" />
                        </label> 

                        <button type="submit" className="button">
                            Criar centro de custo
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}