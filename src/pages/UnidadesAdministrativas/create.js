import React, { useState } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function UnidadesAdministrativasCreate(){
    const [nome, setNome ] = useState('');
    const [sigla, setSigla ] = useState('');
    const [ugr, setUgr ] = useState('');
    const [unidadeGestoraId, setUnidadeGestoraId ] = useState('');
    const navigate = useNavigate();

    async function handleCreateExercicio(e){
        e.preventDefault();

        const data = {
            nome,
            sigla,
            ugr,
            unidade_gestora_id: unidadeGestoraId,
            instituicao_id: 3
        }

        try {
            const response = await api.post('exercicios', data);
            
            if(response){
                navigate('/exercicios');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar a unidade administrativa');
        }
    }

    return(
        <div className="unidades-administrativas-create-container">
            <Menu />
            <div className="unidade-administrativa-create-container">
                <div className="unidades-administrativas-create-header">
                    <h1 className="unidade-administrativa-create-title">Nova Unidade Administrativa</h1>
                </div>
                <div className="principal">
                    <form className="unidade-administrativa-create-form" onSubmit={e => handleCreateExercicio(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da unidade" />
                        </label> 
                        <label>
                        Sigla:
                            <input type="text" name="sigla" value={sigla} onChange={e => setSigla(e.target.value)} placeholder="Sigla" />
                        </label> 
                        <label>
                        UGR:
                            <input type="text" name="ugr" value={ugr} onChange={e => setUgr(e.target.value)} placeholder="UGR" />
                        </label> 

                        <label>
                        Unidade Gestora:
                        {/* TODO: trocar para select */}
                            <input type="select" name="unidade_gestora_id" value={unidadeGestoraId} onChange={e => setUnidadeGestoraId(e.target.value)} placeholder="Unidade" />
                        </label> 
                       
                        <button type="submit" className="button">
                            Criar unidade gestora
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}