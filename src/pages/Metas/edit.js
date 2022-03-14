import React, { useState, useEffect } from 'react';
import './styles-edit.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FontesTiposEdit(){
    const objetivo = useLocation().state.objetivo;
    const [nome, setNome ] = useState(objetivo.nome);
    const [descricao, setDescricao ] = useState(objetivo.descricao);
    const [dimensao_id, setDimensaoId ] = useState(objetivo.dimensao_id);
    const [dimensoes, setDimensoes ] = useState([]);
    const [loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            api
            .get(`objetivos`)
            .then((response) => {
              setDimensoes(response.data.data.data);
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
            descricao,
            dimensao_id
        }

        try {
            const response = await api.put(`objetivos/${objetivo.id}`, data);
            
            if(response){
                navigate('/objetivos');
            }
        } catch (error) {
            console.log(error.response.data.message);
            alert('Não foi possível editar o objetivo');
        }
    }

    return(
        <div className="objetivos-edit-container">
            <Menu />
            <div className="objetivo-edit-container">
                <div className="objetivos-edit-header">
                    <h1 className="objetivo-edit-title">Editar Objetivo</h1>
                </div>
                <div className="principal">
                    {!loading && (<form className="objetivo-edit-form" onSubmit={e => handleEdit(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Escreva o nome" />
                        </label> 

                        <label>
                        Descrição:
                            <input type="text" name="descricao" value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Escreva a descrição" />
                        </label> 

                        <label htmlFor="dimensao_id">Exercício:
                            <select name="dimensao_id" id="dimensao_id" onChange={e => setDimensaoId(e.target.value)}>
                                <option key='' value=''>Selecione</option>
                                {dimensoes.map(dimensao =>(
                                    <option key={dimensao.id} value={dimensao.id} selected={dimensao_id === dimensao.id? 'selected': ''}>{dimensao.nome}</option>
                                ))}
                            </select>
                        </label>
                        <button type="submit" className="button">
                            Atualizar objetivo
                        </button>
                    </form>)}
                </div>
            </div>
        </div>
    )
}