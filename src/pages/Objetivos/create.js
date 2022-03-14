import React, { useState, useEffect } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function ObjetivosCreate(){
    const [nome, setNome ] = useState('');
    const [descricao, setDescricao ] = useState('');
    const [loading, setLoading ] = useState(true);
    const [dimensoes, setDimensoes ] = useState([]);
    const [dimensao_id, setDimensaoId ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            api
            .get(`dimensoes?instituicao_id=1&exercicio_id=1`)
            .then((response) => {
                setDimensoes(response.data.data.data);
                setLoading(false)
            })
            .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }

    }, [])

    async function handleCreate(e){
        e.preventDefault();

        const data = {
            nome,
            descricao,
            dimensao_id
        }

        try {
            const response = await api.post('objetivos', data);
            
            if(response){
                navigate('/objetivos');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível criar o objetivo');
        }
    }

    return(
        <div className="objetivos-create-container">
            <Menu />
            <div className="objetivo-create-container">
                <div className="objetivos-create-header">
                    <h1 className="objetivo-create-title">Novo objetivo</h1>
                </div>
                <div className="principal">
                    {!loading && (<form className="objetivo-create-form" onSubmit={e => handleCreate(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Escreva o nome" />
                        </label> 

                        <label>
                        Descrição:
                            <input type="text" name="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Escreva uma descrição" />
                        </label> 

                        <label htmlFor="dimensao_id">Dimensão:
                            <select name="dimensao_id" id="dimensao_id" onChange={e => setDimensaoId(e.target.value)}>
                                <option key='' value=''>Selecione</option>
                                {dimensoes.map(dimensoes =>(
                                    <option key={dimensoes.id} value={dimensoes.id}>{dimensoes.nome}</option>
                                ))}
                            </select>
                        </label>
                       
                        <button type="submit" className="button">
                            Criar objetivo
                        </button>
                    </form>)}
                </div>
            </div>
        </div>
    )
}