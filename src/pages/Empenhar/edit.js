import React, { useState } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function EmpenharEdit(){
    const empenho = useLocation().state.empenho;
    const [valor_empenhado, setValorEmpenhado ] = useState(empenho.valor_empenhado);
    const [data_empenho, setDataEmpenho ] = useState(empenho.data_empenho);
    const navigate = useNavigate();

    async function handleEdit(e){
        e.preventDefault();

        const data = {
            valor_empenhado,
            data_empenho,
            credito_disponivel_id: empenho.credito_disponivel_id,
            unidade_administrativa_id: empenho.unidade_administrativa_id,
        }

        try {
            const response = await api.put(`empenhos/${empenho.id}`, data);
            
            if(response){
                navigate('/empenhar');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar o empenho');
        }
    }

    return(
        <div className="empenhos-edit-container">
            <Menu />
            <div className="empenho-edit-container">
                <div className="empenhos-edit-header">
                    <h1 className="empenho-edit-title">Editar Movimento</h1>
                </div>
                <div className="principal">
                    <form className="empenho-edit-form" onSubmit={e => handleEdit(e)}>

                        <label>
                        Valor:
                            <input type="text" name="valor_empenhado" value={valor_empenhado} onChange={e => setValorEmpenhado(e.target.value)} placeholder="Valor" />
                        </label>   
                        
                        <label>
                        Data:
                            <input type="date" name="data_empenho" value={data_empenho}  onChange={e => setDataEmpenho(e.target.value)} placeholder="Data" />
                        </label> 
                       
                        <button type="submit" className="button">
                            Atualizar empenho
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}