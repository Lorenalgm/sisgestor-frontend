import React, { useState } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function InstituicoesEdit(){
    const instituicao = useLocation().state.instituicao;
    const [nome, setNome ] = useState(instituicao.nome);
    const [sigla, setSigla ] = useState(instituicao.sigla);
    const [cnpj, setCnpj ] = useState(instituicao.cnpj);
    const [uasg, setUasg ] = useState(instituicao.uasg);
    const [logradouro, setLogradouro ] = useState(instituicao.logradouro);
    const [numero, setNumero ] = useState(instituicao.numero);
    const [bairro, setBairro ] = useState(instituicao.bairro);
    const [complemento, setComplemento ] = useState(instituicao.complemento);
    const navigate = useNavigate();

    async function handleEditInstituicao(e){
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
        }

        try {
            const response = await api.put(`instituicoes/${instituicao.id}`, data);
            
            if(response){
                navigate('/instituicoes');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar a instituição');
        }
    }

    return(
        <div className="instituicoes-edit-container">
            <Menu />
            <div className="instituicao-edit-container">
                <div className="instituicoes-edit-header">
                    <h1 className="instituicao-edit-title">Editar Instituição</h1>
                </div>
                <div className="principal">
                    <form className="instituicao-edit-form" onSubmit={e => handleEditInstituicao(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Instituição" />
                        </label>
                        <label>
                        Sigla:
                            <input type="text" name="sigla" value={sigla} onChange={e => setSigla(e.target.value)} placeholder="Sigla" />
                        </label>
                        <label>
                        Cnpj:
                            <input type="text" name="cnpj" value={cnpj} onChange={e => setCnpj(e.target.value)} placeholder="Cnpj" />
                        </label>
                        <label>
                        Uasg:
                            <input type="text" name="uasg" value={uasg} onChange={e => setUasg(e.target.value)} placeholder="Uasg" />
                        </label>
                        <label>
                        Logradouro:
                            <input type="text" name="logradouro" value={logradouro} onChange={e => setLogradouro(e.target.value)} placeholder="logradouro" />
                        </label>
                        <label>
                        Número:
                            <input type="text" name="numero" value={numero} onChange={e => setNumero(e.target.value)} placeholder="Número" />
                        </label> 

                        <label>
                        Bairro:
                            <input type="text" name="bairro" value={bairro} onChange={e => setBairro(e.target.value)} placeholder="Bairro" />
                        </label> 

                        <label>
                        Complemento:
                            <input type="text" name="complemento" value={complemento} onChange={e => setComplemento(e.target.value)} placeholder="Complemento" />
                        </label> 
                        
                        <button type="submit" className="button">
                            Atualizar instituição
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}