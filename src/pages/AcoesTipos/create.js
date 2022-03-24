import React, { useState } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function AcoesTiposCreate(){
    const [nome, setNome ] = useState('');
    const [codigo, setCodigo ] = useState('');
    const [fav, setFavorito ] = useState(false);
    const navigate = useNavigate();

    async function handleCreateAcoesTipos(e){
        e.preventDefault();

        const data = {
            nome,
            codigo,
            fav,
            instituicao_id: 1
        }

        try {
            const response = await api.post('acoes_tipos', data);
            
            if(response){
                navigate('/acoes_tipos');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar a ação tipo');
        }
    }

    return(
        <div className="acoes-tipos-create-container">
            <Menu />
            <div className="acao-tipo-create-container">
                <div className="acoes-tipos-create-header">
                    <h1 className="acao-tipo-create-title">Novo Exercício</h1>
                </div>
                <div className="principal">
                    <form className="acao-tipo-create-form" onSubmit={e => handleCreateAcoesTipos(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da ação" />
                        </label> 
                        <label>
                        Código:
                            <input type="text" name="codigo" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Código da ação" />
                        </label> 
                        <div className="check-aprovado">
                            Favorito?&nbsp;&nbsp;
                            <input type="checkbox"  name="fav" value={fav} onChange={e => setFavorito(e.target.checked)} placeholder="Sim" /> 
                        </div>
                       
                        <button type="submit" className="button">
                            Criar ação tipo
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}