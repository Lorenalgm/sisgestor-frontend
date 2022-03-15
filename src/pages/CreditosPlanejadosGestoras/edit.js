import React, { useState } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MovimentosEdit(){
    const credito_planejado_administrativa = useLocation().state.credito_planejado_administrativa;
    const [descricao, setDescricao ] = useState(credito_planejado_administrativa.descricao);
    const [valor_solicitado, setValorSolicitado ] = useState(credito_planejado_administrativa.valor_solicitado);
    const navigate = useNavigate();

    async function handleEdit(e){
        e.preventDefault();

        const data = {
            descricao,
            valor_solicitado,
            unidade_administrativa_id: credito_planejado_administrativa.unidade_administrativa_id,
            despesa_id: credito_planejado_administrativa.despesa_id
        }

        try {
            const response = await api.put(`creditos_planejados/${credito_planejado_administrativa.id}`, data);
            
            if(response){
                navigate('/creditos_planejados_administrativas');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar o crédito');
        }
    }

    return(
        <div className="creditos-planejados-administrativas-edit-container">
            <Menu />
            <div className="credito-planejado-administrativa-edit-container">
                <div className="creditos-planejados-administrativas-edit-header">
                    <h1 className="credito-planejado-administrativa-edit-title">Editar Crédito Planejado</h1>
                </div>
                <div className="principal">
                    <form className="credito-planejado-administrativa-edit-form" onSubmit={e => handleEdit(e)}>

                        <label>
                        Descrição:
                            <input type="text" name="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />
                        </label>   

                        <label>
                        Valor Solicitado:
                            <input type="text" name="valor_solicitado" value={valor_solicitado} onChange={e => setValorSolicitado(e.target.value)} placeholder="Valor solicitado" />
                        </label>   
                        
                        <button type="submit" className="button">
                            Atualizar crédito planejado
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}