import React, { useState } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function UnidadesGestorasCreate(){
    const [nome, setNome ] = useState('');
    const [sigla, setSigla ] = useState('');
    const [cnpj, setCnpj ] = useState('');
    const [uasg, setUasg ] = useState('');
    const [logradouro, setLogradouro ] = useState('');
    const [numero, setNumero ] = useState('');
    const [bairro, setBairro ] = useState('');
    const [complemento, setComplemento ] = useState('');
    const [diretorGeral, setDiretorGeral ] = useState('');
    const navigate = useNavigate();

    async function handleCreateExercicio(e){
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
            instituicao_id: 3
        }

        try {
            const response = await api.post('unidades_gestoras', data);
            
            if(response){
                navigate('/unidades_gestoras');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar a unidade gestora');
        }
    }

    return(
        <div className="unidades-gestoras-create-container">
            <Menu />
            <div className="unidade-gestora-create-container">
                <div className="unidades-gestoras-create-header">
                    <h1 className="unidade-gestora-create-title">Nova Unidade Gestora</h1>
                </div>
                <div className="principal">
                    <form className="unidade-gestora-create-form" onSubmit={e => handleCreateExercicio(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome da unidade" />
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
                            <input type="text" name="diretor_geral" value={uasg} onChange={e => setDiretorGeral(e.target.value)} placeholder="Diretor geral" />
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