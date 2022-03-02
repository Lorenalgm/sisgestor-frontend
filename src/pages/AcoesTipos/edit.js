import React, { useState } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AcoesTiposEdit(){
    const acaoTipo = useLocation().state.acao_tipo;
    const [nome, setNome ] = useState(acaoTipo.nome);
    const [codigo, setCodigo ] = useState(acaoTipo.codigo);
    const navigate = useNavigate();

    async function handleEdit(e){
        e.preventDefault();

        const data = {
            nome,
            codigo,
            instituicao_id: 1
        }

        try {
            const response = await api.put(`acoes_tipos/${acaoTipo.id}`, data);
            
            if(response){
                navigate('/acoes_tipos');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar o tipo de ação');
        }
    }

    return(
        <div className="acoes-tipos-edit-container">
            <Menu />
            <div className="acao-tipo-edit-container">
                <div className="acoes-tipos-edit-header">
                    <h1 className="acao-tipo-edit-title">Editar Ação tipo</h1>
                </div>
                <div className="principal">
                    <form className="acao-tipo-edit-form" onSubmit={e => handleEdit(e)}>
                    <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da ação" />
                        </label> 
                        <label>
                        Código:
                            <input type="text" name="codigo" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Código da ação" />
                        </label> 
                       
                        <button type="submit" className="button">
                            Atualizar ação
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}