import React, { useState } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function ProgramasTiposEdit(){
    const programaTipo = useLocation().state.programa;
    const [nome, setNome ] = useState(programaTipo.nome);
    const [codigo, setCodigo ] = useState(programaTipo.codigo);
    const navigate = useNavigate();
    
    async function handleEditProgramaTipo(e){
        e.preventDefault();

        const data = {
            nome,
            codigo,
            instituicao_id: 1
        }

        try {
            const response = await api.put(`programas/${programaTipo.id}`, data);
            
            if(response){
                navigate('/programas_tipos');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar o tipo de programa');
        }
    }

    return(
        <div className="programas-tipos-edit-container">
            <Menu />
            <div className="programa-tipo-edit-container">
                <div className="programas-tipos-edit-header">
                    <h1 className="programa-tipo-edit-title">Editar Programa</h1>
                </div>
                <div className="principal">
                    <form className="programa-tipo-edit-form" onSubmit={e => handleEditProgramaTipo(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Escreva o nome" />
                        </label> 
                        <label>
                        Código:
                            <input type="text" name="codigo" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Escreva o código" />
                        </label> 
                        <button type="submit" className="button">
                            Atualizar programa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}