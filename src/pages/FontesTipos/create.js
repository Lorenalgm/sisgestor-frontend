import React, { useState, useEffect } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function FontesTiposCreate(){
    const [nome, setNome ] = useState('');
    const [loading, setLoading ] = useState(true);
    const [gruposFontes, setGruposFontes ] = useState('');
    const [grupo_fonte_id, setGrupoFonteId ] = useState('');
    const [especificacoes, setEspecificacoes ] = useState('');
    const [especificacao_id, setEspecificacaoId ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            api
              .get(`grupos_fontes`)
              .then((response) => {
                setGruposFontes(response.data.data.data);
              })
              .catch((err) => console.log(err));

              api
              .get(`especificacoes`)
              .then((response) => {
                setEspecificacoes(response.data.data.data);
                setLoading(false)
              })
              .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }

    }, [])

    async function handleCreatePrograma(e){
        e.preventDefault();

        const data = {
            nome,
            especificacao_id,
            grupo_fonte_id,
            instituicao_id: 1
        }

        try {
            const response = await api.post('fontes_tipos', data);
            
            if(response){
                navigate('/fontes_tipos');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar o programa');
        }
    }

    return(
        <div className="fontes-tipos-create-container">
            <Menu />
            <div className="fonte-tipo-create-container">
                <div className="fontes-tipos-create-header">
                    <h1 className="fonte-tipo-create-title">Novo Programa Tipo</h1>
                </div>
                <div className="principal">
                    {!loading && (<form className="fonte-tipo-create-form" onSubmit={e => handleCreatePrograma(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Escreva o nome" />
                        </label> 

                        <label htmlFor="grupo_fonte_id">Grupo Fonte:
                            <select name="grupo_fonte_id" id="grupo_fonte_id" onChange={e => setGrupoFonteId(e.target.value)}>
                                <option key='' value=''>Selecione</option>
                                {gruposFontes.map(grupo_fonte =>(
                                    <option key={grupo_fonte.id} value={grupo_fonte.id}>{grupo_fonte.nome}</option>
                                ))}
                            </select>
                        </label>
                       
                        <label htmlFor="especificacao_id">Especificação:
                            <select name="especificacao_id" id="especificacao_id" onChange={e => setEspecificacaoId(e.target.value)}>
                                <option key='' value=''>Selecione</option>
                                {especificacoes.map(especificacao =>(
                                    <option key={especificacao.id} value={especificacao.id}>{especificacao.nome}</option>
                                ))}
                            </select>
                        </label>

                        <button type="submit" className="button">
                            Criar programa
                        </button>
                    </form>)}
                </div>
            </div>
        </div>
    )
}