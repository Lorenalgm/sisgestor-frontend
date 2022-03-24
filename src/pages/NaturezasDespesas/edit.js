import React, { useState } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function NaturezasDespesasEdit(){
    const naturezaDespesa = useLocation().state.natureza_despesa;
    const [nome, setNome ] = useState(naturezaDespesa.nome);
    const [codigo, setCodigo ] = useState(naturezaDespesa.codigo);
    const [tipo, setTipo ] = useState(naturezaDespesa.tipo);
    const [fav, setFavorito ] = useState(naturezaDespesa.fav);
    const navigate = useNavigate();

    async function handleEdit(e){
        e.preventDefault();

        const data = {
            nome,
            codigo,
            tipo,
            fav,
            instituicao_id: 1
        }

        try {
            const response = await api.put(`naturezas_despesas/${naturezaDespesa.id}`, data);
            
            if(response){
                navigate('/naturezas_despesas');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar a natureza de despesa');
        }
    }

    return(
        <div className="naturezas-despesas-edit-container">
            <Menu />
            <div className="natureza-despesa-edit-container">
                <div className="naturezas-despesas-edit-header">
                    <h1 className="natureza-despesa-edit-title">Editar Natureza de Despesa</h1>
                </div>
                <div className="principal">
                    <form className="natureza-despesa-edit-form" onSubmit={e => handleEdit(e)}>
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
                        <div className="check-aprovado">
                            Favorito?&nbsp;&nbsp;
                            <input type="checkbox"  name="fav" value={fav} onChange={e => setFavorito(e.target.checked)} placeholder="Sim" checked={fav?'checked':''} /> 
                        </div>
                        <button type="submit" className="button">
                            Atualizar natureza de despesa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}