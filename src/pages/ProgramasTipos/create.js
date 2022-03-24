import React, { useState } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function ProgramasTiposCreate(){
    const [nome, setNome ] = useState('');
    const [codigo, setCodigo ] = useState('');
    const [fav, setFavorito ] = useState(false);
    const navigate = useNavigate();

    async function handleCreatePrograma(e){
        e.preventDefault();

        const data = {
            nome,
            codigo,
            fav,
            instituicao_id: 1
        }

        try {
            const response = await api.post('programas', data);
            
            if(response){
                navigate('/programas_tipos');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar o programa');
        }
    }

    return(
        <div className="programas-tipos-create-container">
            <Menu />
            <div className="programa-tipo-create-container">
                <div className="programas-tipos-create-header">
                    <h1 className="programa-tipo-create-title">Novo Programa Tipo</h1>
                </div>
                <div className="principal">
                    <form className="programa-tipo-create-form" onSubmit={e => handleCreatePrograma(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Escreva o nome" />
                        </label> 
                        <label>
                        Código:
                            <input type="text" name="codigo" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Escreva o código" />
                        </label>
                        <div className="check-aprovado">
                            Favorito?&nbsp;&nbsp;
                            <input type="checkbox"  name="fav" value={fav} onChange={e => setFavorito(e.target.checked)} placeholder="Sim" /> 
                        </div>
                        <button type="submit" className="button">
                            Criar programa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}