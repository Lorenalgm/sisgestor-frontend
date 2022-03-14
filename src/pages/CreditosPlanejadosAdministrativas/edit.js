import React, { useState } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MovimentosEdit(){
    const movimento = useLocation().state.movimento;
    const [descricao, setDescricao ] = useState(movimento.descricao);
    const [valor, setValor ] = useState(movimento.valor);
    const [tipo, setTipo ] = useState(movimento.tipo);
    const navigate = useNavigate();

    async function handleEdit(e){
        e.preventDefault();

        const data = {
            descricao,
            valor,
            tipo,
            exercicio_id: movimento.exercicio_id
        }

        try {
            const response = await api.put(`movimentos/${movimento.id}`, data);
            
            if(response){
                navigate('/movimentos');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar o tipo de movimento');
        }
    }

    return(
        <div className="movimentos-edit-container">
            <Menu />
            <div className="movimento-edit-container">
                <div className="movimentos-edit-header">
                    <h1 className="movimento-edit-title">Editar Movimento</h1>
                </div>
                <div className="principal">
                    <form className="movimento-edit-form" onSubmit={e => handleEdit(e)}>

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
                            Atualizar movimento
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}