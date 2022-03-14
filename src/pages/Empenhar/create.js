import React, { useState, useEffect } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function EmpenharCreate(){
    const [loading, setLoading ] = useState(true);
    const [valor_empenhado, setValorEmpenhado ] = useState('');
    const [data_empenho, setDataEmpenho ] = useState('');
    const [credito_disponivel_id, setCreditoDisponivelId ] = useState('');
    const [creditos_disponiveis, setCreditosDisponiveis ] = useState([]);
    const [unidade_administrativa_id, setUnidadeAdministrativaId ] = useState('');
    const [unidades_administrativas, setUnidadesAdministrativas ] = useState('');
    const navigate = useNavigate();



    useEffect(() => {
        try {
              api
              .get(`creditos_disponiveis`)
              .then((response) => {
                setCreditosDisponiveis(response.data.data.data);
              })
              .catch((err) => console.log(err));

              api
              .get(`unidades_administrativas`)
              .then((response) => {
                setUnidadesAdministrativas(response.data.data.data);
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
            valor_empenhado,
            data_empenho,
            credito_disponivel_id,
            unidade_administrativa_id
        }

        try {
            const response = await api.post('empenhos', data);
            
            if(response){
                navigate('/empenhar');
            }
        } catch (error) {
            alert(error.response.data.data);
        }
    }

    return(
        <div className="empenhos-create-container">
            <Menu />
            <div className="empenho-create-container">
                <div className="empenhos-create-header">
                    <h1 className="empenho-create-title">Novo Empenho</h1>
                </div>
                <div className="principal">
                        {!loading && (
                            
                            <form className="empenho-create-form" onSubmit={e => handleCreate(e)}>
                                {!loading && <><label htmlFor="unidadeAdministrativaId">Unidade Administrativa:
                                <select name="unidadeAdministrativaId" id="unidadeAdministrativaId" onChange={e => setUnidadeAdministrativaId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {unidades_administrativas.map(unidade_administrativa =>(
                                        <option key={unidade_administrativa.id} value={unidade_administrativa.id}>{unidade_administrativa.nome}</option>
                                    ))}
                                </select>
                                </label>

                                <label htmlFor="credito_disponivel_id">Crédito Disponível:
                                <select name="credito_disponivel_id" id="credito_disponivel_id" onChange={e => setCreditoDisponivelId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {creditos_disponiveis.map(credito_disponivel =>(
                                        <option key={credito_disponivel.id} value={credito_disponivel.id}>{credito_disponivel.descricao}</option>
                                    ))}
                                </select>
                                </label></>}

                                <label>
                                Valor:
                                    <input type="text" name="valor_empenhado" onChange={e => setValorEmpenhado(e.target.value)} placeholder="Valor" />
                                </label>   
                                
                                <label>
                                Data:
                                    <input type="date" name="data_empenho" onChange={e => setDataEmpenho(e.target.value)} placeholder="Data" />
                                </label> 

                               
                                <button type="submit" className="button">
                                    Criar empenho
                                </button>
                            </form>
                        )}
                       
                </div>
            </div>
        </div>
    )
}