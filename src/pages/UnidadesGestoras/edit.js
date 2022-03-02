import React, { useState } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function UnidadesGestorasEdit(){
    const unidadeGestora = useLocation().state.unidade_gestora;
    const [nome, setNome ] = useState(unidadeGestora.nome);
    const [sigla, setSigla ] = useState(unidadeGestora.sigla);
    const [cnpj, setCnpj ] = useState(unidadeGestora.cnpj);
    const [uasg, setUasg ] = useState(unidadeGestora.uasg);
    const [logradouro, setLogradouro ] = useState(unidadeGestora.logradouro);
    const [numero, setNumero ] = useState(unidadeGestora.numero);
    const [bairro, setBairro ] = useState(unidadeGestora.bairro);
    const [complemento, setComplemento ] = useState(unidadeGestora.complemento);
    const [diretorGeral, setDiretorGeral ] = useState(unidadeGestora.diretorGeral);
    const navigate = useNavigate();

    async function handleEdit(e){
        e.preventDefault();

        const data = {
            nome,
            sigla,
            cnpj,
            uasg,
            logradouro,
            numero,
            bairro,
            complemento,
            diretor_geral: diretorGeral,
            instituicao_id: 1
        }

        try {
            const response = await api.put(`unidades_gestoras/${unidadeGestora.id}`, data);
            
            if(response){
                navigate('/unidades_gestoras');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar a unidade gestora');
        }
    }

    return(
        <div className="unidades-gestoras-edit-container">
            <Menu />
            <div className="unidade-gestora-edit-container">
                <div className="unidades-gestoras-edit-header">
                    <h1 className="unidade-gestora-edit-title">Editar Ação tipo</h1>
                </div>
                <div className="principal">
                    <form className="unidade-gestora-edit-form" onSubmit={e => handleEdit(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da ação" />
                        </label> 
                        <label>
                        Sigla:
                            <input type="text" name="sigla" value={sigla} onChange={e => setSigla(e.target.value)} placeholder="Sigla" />
                        </label> 
                        <label>
                        CNPJ:
                            <input type="text" name="cnpj" value={cnpj} onChange={e => setCnpj(e.target.value)} placeholder="Cnpj" />
                        </label> 
                        <label>
                        UASG:
                            <input type="text" name="uasg" value={uasg} onChange={e => setUasg(e.target.value)} placeholder="Uasg" />
                        </label> 
                        <label>
                        Logradouro:
                            <input type="text" name="logradouro" value={logradouro} onChange={e => setLogradouro(e.target.value)} placeholder="Nome da rua/avenida" />
                        </label> 
                        <label>
                        Número:
                            <input type="text" name="numero" value={numero} onChange={e => setNumero(e.target.value)} placeholder="Número do local" />
                        </label> 
                        <label>
                        Bairro:
                            <input type="text" name="bairro" value={bairro} onChange={e => setBairro(e.target.value)} placeholder="Bairro" />
                        </label> 
                        <label>
                        Complemento:
                            <input type="text" name="complemento" value={complemento} onChange={e => setComplemento(e.target.value)} placeholder="Complemento" />
                        </label> 
                        <label>
                        Diretor geral:
                            <input type="text" name="diretor_geral" value={diretorGeral} onChange={e => setDiretorGeral(e.target.value)} placeholder="Diretor geral" />
                        </label>  
                       
                        <button type="submit" className="button">
                            Atualizar unidade gestora
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}