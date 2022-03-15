import React, { useState } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function DespesasEdit(){
    const despesa = useLocation().state.despesa;
    const [descricao, setDescricao ] = useState(despesa.descricao);
    const [valor, setValor ] = useState(despesa.valor);
    const [tipo, setTipo ] = useState(despesa.tipo);
    const navigate = useNavigate();

    async function handleEdit(e){
        e.preventDefault();

        const data = {
            descricao,
            valor,
            tipo,
            exercicio_id: despesa.exercicio_id
        }

        try {
            const response = await api.put(`despesas/${despesa.id}`, data);
            
            if(response){
                navigate('/despesas');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar o tipo de despesa');
        }
    }

    return(
        <div className="despesas-edit-container">
            <Menu />
            <div className="despesa-edit-container">
                <div className="despesas-edit-header">
                    <h1 className="despesa-edit-title">Editar Despesa</h1>
                </div>
                <div className="principal">
                    <form className="despesa-edit-form" onSubmit={e => handleEdit(e)}>

                        <label>
                        Valor:
                            <input type="text" name="valor" value={valor} onChange={e => setValor(e.target.value)} placeholder="Valor" />
                        </label>   
                        
                        <label>
                        Descrição:
                            <input type="text" name="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />
                        </label> 

                        <label>
                        Tipo:
                            <input type="text" name="tipo" value={tipo} onChange={e => setTipo(e.target.value)} placeholder="Tipo" />
                        </label>               
                       
                        <button type="submit" className="button">
                            Atualizar despesa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}