import React, { useState, useEffect } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function NaturezasDespesasCreate(){
    const [nome, setNome ] = useState('');
    const [codigo, setCodigo ] = useState('');
    const [tipo, setTipo ] = useState('');
    const [subnatureza, setSubnatureza ] = useState(false);
    const [natureza_despesa_id, setNaturezaDespesaId ] = useState('');
    const [naturezas_despesas, setNaturezasDespesas ] = useState('');
    const [loading, setLoading ] = useState(true);
    const navigate = useNavigate();

    async function handleCreateNaturezaDespesa(e){
        e.preventDefault();

        if(subnatureza){
            const data = {
                nome,
                codigo,
                natureza_despesa_id,
                instituicao_id: 1
            }
    
            try {
                const response = await api.post('subnaturezas_despesas', data);
                
                if(response){
                    navigate('/naturezas_despesas');
                }
            } catch (error) {
                console.log(error.response.data.message);
                alert('Não foi possível criar a natureza de despesa');
            }
        }else{
            const data = {
                nome,
                codigo,
                tipo,
                instituicao_id: 1
            }
    
            try {
                const response = await api.post('naturezas_despesas', data);
                
                if(response){
                    navigate('/naturezas_despesas');
                }
            } catch (error) {
                console.log(error.response.data.message);
                alert('Não foi possível criar a natureza de despesa');
            }
        }
    }

    useEffect(() => {
        try {
            api
              .get(`naturezas_despesas`)
              .then((response) => {
                setNaturezasDespesas(response.data.data.data);
                setLoading(false)
              })
              .catch((err) => console.log(err));

          } catch (error) {
            alert(error);
          }

    }, [])

    return(
        <div className="naturezas-despesas-create-container">
            <Menu />
            <div className="natureza-despesa-create-container">
                <div className="naturezas-despesas-create-header">
                    <h1 className="natureza-despesa-create-title">Nova Natureza de Despesa</h1>
                </div>
                <div className="principal">
                    <form className="natureza-despesa-create-form" onSubmit={e => handleCreateNaturezaDespesa(e)}>
                        <label>
                        Nome:
                            <input type="text" name="nome" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome" />
                        </label>
                        <label>
                        Código:
                            <input type="text" name="codigo" value={codigo} onChange={e => setCodigo(e.target.value)} placeholder="Código" />
                        </label>
                        <label>
                        Tipo:
                            <input type="text" name="tipo" value={tipo} onChange={e => setTipo(e.target.value)} placeholder="Tipo" />
                        </label> 
                        <div className="check-aprovado">
                            Possui uma despesa mãe?&nbsp;&nbsp;
                            <input type="checkbox"  name="subnatureza" value={subnatureza} onChange={e => setSubnatureza(e.target.checked)} placeholder="Sim" /> 
                        </div>

                        {!loading && subnatureza && 
                        <label htmlFor="natureza_despesa_id">Natureza de despesa:
                            <select name="natureza_despesa_id" id="natureza_despesa_id" onChange={e => setNaturezaDespesaId(e.target.value)}>
                                <option key='' value=''>Selecione</option>
                                {naturezas_despesas.map(natureza_despesa =>(
                                    <option key={natureza_despesa.id} value={natureza_despesa.id}>{natureza_despesa.nome}</option>
                                ))}
                            </select>
                        </label>
                        }
                      
                        <button type="submit" className="button">
                            Criar Natureza de Despesa
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}