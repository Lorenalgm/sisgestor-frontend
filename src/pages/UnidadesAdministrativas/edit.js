import React, { useState, useEffect } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function UnidadesAdministrativasEdit(){
    const unidadeAdministrativa = useLocation().state.unidade_administrativa;
    const [nome, setNome ] = useState(unidadeAdministrativa.nome);
    const [sigla, setSigla ] = useState(unidadeAdministrativa.sigla);
    const [ugr, setUgr ] = useState(unidadeAdministrativa.ugr);
    const [unidadeGestoraId, setUnidadeGestoraId ] = useState(unidadeAdministrativa.unidade_gestora_id);
    const [loading, setLoading ] = useState(true);
    const [unidadesGestoras, setUnidadesGestoras ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
              api
              .get(`unidades_gestoras`)
              .then((response) => {
                setUnidadesGestoras(response.data.data.data);
                setLoading(false)
              })
              .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }

    }, [])

    async function handleEdit(e){
        e.preventDefault();

        const data = {
            nome,
            sigla,
            ugr,
            unidade_gestora_id: unidadeGestoraId,
            instituicao_id: 1
        }

        try {
            const response = await api.put(`unidades_administrativas/${unidadeAdministrativa.id}`, data);
            
            if(response){
                navigate('/unidades_administrativas');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar a unidade administrativa');
        }
    }

    return(
        <div className="unidades-administrativas-edit-container">
            <Menu />
            <div className="unidade-administrativa-edit-container">
                <div className="unidades-administrativas-edit-header">
                    <h1 className="unidade-administrativa-edit-title">Editar Unidade Administrativa</h1>
                </div>
                <div className="principal">
                    <form className="unidade-administrativa-edit-form" onSubmit={e => handleEdit(e)}>
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

                        {!loading && (<label htmlFor="unidade_gestora_id">Unidade Gestora:
                            <select name="unidade_gestora_id" id="unidade_gestora_id" onChange={e => setUnidadeGestoraId(e.target.value)}>
                                <option key='' value=''>Selecione</option>
                                {unidadesGestoras.map(unidade_gestora =>(
                                    <option key={unidade_gestora.id} value={unidade_gestora.id} selected={unidadeGestoraId == unidade_gestora.id? 'selected': ''}>{unidade_gestora.nome}</option>
                                ))}
                            </select>
                        </label>)}
                       
                        <button type="submit" className="button">
                            Atualizar Unidade administrativa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}