import React, { useState, useEffect } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function CreditosPlanejadosAdministrativasCreate(){
    const [loading, setLoading ] = useState(true);
    const [unidadesAdministrativas, setUnidadesAdministrativas ] = useState([]);
    const [unidadeAdministrativaId, setUnidadeAdministrativaId ] = useState('');
    const [despesas, setDespesas ] = useState([]);
    const [despesaId, setDespesaId ] = useState('');
    const [valor_solicitado, setValorSolicitado ] = useState('');
    const [descricao, setDescricao ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
            api
              .get(`despesas`)
              .then((response) => {
                setDespesas(response.data.data.data);
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
            valor_solicitado,
            descricao,
            unidade_administrativa_id: unidadeAdministrativaId,
            despesa_id: despesaId
        }

        try {
            const response = await api.post('creditos_planejados', data);
            
            if(response){
                navigate('/creditos_planejados_administrativas');
            }
        } catch (error) {
            alert(error.response.data.data);
        }
    }

    return(
        <div className="creditos-planejados-administrativas-create-container">
            <Menu />
            <div className="credito-planejado-administrativa-create-container">
                <div className="creditos-planejados-administrativas-create-header">
                    <h1 className="credito-planejado-administrativa-create-title">Novo Crédito Planejado</h1>
                </div>
                <div className="principal">
                        {!loading && (
                            
                            <form className="credito-planejado-administrativa-create-form" onSubmit={e => handleCreate(e)}>                           

                                <label>
                                Descrição:
                                    <input type="text" name="descricao" onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />
                                </label>   

                                <label>
                                Valor Solicitado:
                                    <input type="text" name="valor_solicitado" onChange={e => setValorSolicitado(e.target.value)} placeholder="Valor solicitado" />
                                </label>   
                                
                                <label htmlFor="despesaId">Despesa:
                                <select name="despesaId" id="despesaId" onChange={e => setDespesaId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {despesas.map(despesa =>(
                                        <option key={despesa.id} value={despesa.id}>{despesa.descricao}</option>
                                    ))}
                                </select>
                                </label>

                                <label htmlFor="unidadeAdministrativaId">Unidade Administrativa:
                                <select name="unidadeAdministrativaId" id="unidadeAdministrativaId" onChange={e => setUnidadeAdministrativaId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {unidadesAdministrativas.map(unidade_administrativa =>(
                                        <option key={unidade_administrativa.id} value={unidade_administrativa.id}>{unidade_administrativa.nome}</option>
                                    ))}
                                </select>
                                </label>
                                                          
                                <button type="submit" className="button">
                                    Criar crédito planejado
                                </button>
                            </form>
                        )}
                       
                </div>
            </div>
        </div>
    )
}