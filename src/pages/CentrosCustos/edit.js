import React, { useState } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function CentrosCustosEdit(){
    const centro_custo = useLocation().state.centro_custo;
    const [nome, setNome ] = useState(centro_custo.nome);
    const navigate = useNavigate();
    
    async function handleEdit(e){
        e.preventDefault();

        const data = {
            nome,
            instituicao_id: 1
        }

        try {
            const response = await api.put(`centros_custos/${centro_custo.id}`, data);
            
            if(response){
                navigate('/centros_custos');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar o centro de custo');
        }
    }

    return(
        <div className="centros-custos-edit-container">
            <Menu />
            <div className="centro-custo-edit-container">
                <div className="centros-custos-edit-header">
                    <h1 className="centro-custo-edit-title">Editar Centro de Custo</h1>
                </div>
                <div className="principal">
                    <form className="centro-custo-edit-form" onSubmit={e => handleEdit(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Escreva o nome" />
                        </label> 

                        <button type="submit" className="button">
                            Atualizar centro de custo
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}