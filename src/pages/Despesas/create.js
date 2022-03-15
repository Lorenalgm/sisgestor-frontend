import React, { useState, useEffect } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function DespesaCreate(){
    const [loading, setLoading ] = useState(true);
    const [exercicios, setExercicios ] = useState([]);
    const [exercicioId, setExercicioId ] = useState('');
    const [valor, setValor ] = useState('');
    const [descricao, setDescricao ] = useState('');
    const [quantidade, setQuantidade ] = useState('');
    const [quantidade_pessoas, setQuantidadePessoas ] = useState('');
    const [tipo, setTipo ] = useState('despesa_fixa');
    const [acoes, setAcoes ] = useState([]);
    const [acao_id, setAcaoId ] = useState(1);
    const [fontes, setFontes ] = useState([]);
    const [fonte_id, setFonteId ] = useState('');
    const [centros_custos, setCentrosCustos ] = useState([]);
    const [centro_custo_id, setCentroCustoId ] = useState('');
    const [naturezas_despesas, setNaturezasDespesas ] = useState([]);
    const [natureza_despesa_id, setNaturezaDespesaId ] = useState('');
    // const [subnatureza_despesa_id, setSubnaturezaDespesaId ] = useState('');
    const [unidades_administrativas, setUnidadesAdministrativas ] = useState([]);
    const [unidade_administrativa_id, setUnidadeAdministrativaId ] = useState(1);
    
    const navigate = useNavigate();
    useEffect(() => {
        try {
            api
            .get(`/acoes/opcoes`)
            .then((response) => {
                setAcoes(response.data.data);
            })

            api
              .get(`fontes/opcoes/${unidade_administrativa_id}/${acao_id}`)
              .then((response) => {
                setFontes(response.data.data);
              })
            
            api
              .get(`centros_custos`)
              .then((response) => {
                setCentrosCustos(response.data.data.data);
              })
            
            api
              .get(`naturezas_despesas`)
              .then((response) => {
                setNaturezasDespesas(response.data.data.data);
              })

            api
              .get(`unidades_administrativas`)
              .then((response) => {
                setUnidadesAdministrativas(response.data.data.data);
              })
              
            api
              .get(`exercicios`)
              .then((response) => {
                setExercicios(response.data.data.data);
                setLoading(false)
              })
              .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }

    }, [unidade_administrativa_id, acao_id])

    async function handleCreate(e){
        e.preventDefault();

        const data = {
            descricao,
            valor,
            qtd: quantidade,
            qtd_pessoas: quantidade_pessoas,
            tipo,
            fonte_id,
            acao_id,
            centro_custo_id,
            natureza_despesa_id,
            // subnatureza_despesa_id,
            unidade_administrativa_id,
            exercicio_id: exercicioId
        }

        try {
            const response = await api.post('despesas', data);
            
            if(response){
                navigate('/despesas');
            }
        } catch (error) {
            alert(error.response.data.data);
        }
    }

    return(
        <div className="despesas-create-container">
            <Menu />
            <div className="despesa-create-container">
                <div className="despesas-create-header">
                    <h1 className="despesa-create-title">Nova Despesa</h1>
                </div>
                <div className="principal">
                        {!loading && (
                            
                            <form className="despesa-create-form" onSubmit={e => handleCreate(e)}>

                                <label htmlFor="exercicioId">Exercício:
                                <select name="exercicioId" id="exercicioId" onChange={e => setExercicioId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {exercicios.map(exercicio =>(
                                        <option key={exercicio.id} value={exercicio.id}>{exercicio.nome}</option>
                                    ))}
                                </select>
                                </label>

                                <label htmlFor="unidade_administrativa_id">Unidade administrativa:
                                <select name="unidade_administrativa_id" id="unidade_administrativa_id" onChange={e => setUnidadeAdministrativaId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {unidades_administrativas.map(unidade_administrativa =>(
                                        <option key={unidade_administrativa.id} value={unidade_administrativa.id}>{unidade_administrativa.nome}</option>
                                    ))}
                                </select>
                                </label>

                                <label>
                                Valor:
                                    <input type="text" name="valor" onChange={e => setValor(e.target.value)} placeholder="Valor" />
                                </label>   

                                <label>
                                Quantidade:
                                    <input type="text" name="qtd" onChange={e => setQuantidade(e.target.value)} placeholder="Valor total" />
                                </label>   

                                <label>
                                Quantidade de pessoas:
                                    <input type="text" name="qtd_pessoas" onChange={e => setQuantidadePessoas(e.target.value)} placeholder="Quantidade de pessoas" />
                                </label>   
                                
                                <label>
                                Descrição:
                                    <input type="text" name="descricao" onChange={e => setDescricao(e.target.value)} placeholder="Descrição" />

                                </label> 
             
                                <label htmlFor="tipo">Tipo:
                                <select name="tipo" id="tipo" onChange={e => setTipo(e.target.value)}>
                                    <option key='despesa_fixa' value='despesa_fixa'>Despesa Fixa</option>
                                    <option key='despesa_variavel' value='despesa_variavel'>Despesa Variável</option>
                                </select>
                                </label>   

                                {acoes && <label htmlFor="acao_id">Ação:
                                <select name="acao_id" id="acao_id" onChange={e => setAcaoId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {acoes.map(acao =>(
                                        <option key={acao.id} value={acao.id}>{acao.label}</option>
                                    ))}
                                </select>
                                </label>  }

                                {fontes && <label htmlFor="fonte_id">Fonte:
                                <select name="fonte_id" id="fonte_id" onChange={e => setFonteId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {fontes.map(fonte =>(
                                        <option key={fonte.id} value={fonte.id}>{fonte.label}</option>
                                    ))}
                                </select>
                                </label>}

                                <label htmlFor="centro_custo_id">Centro de custo:
                                <select name="centro_custo_id" id="centro_custo_id" onChange={e => setCentroCustoId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {centros_custos.map(centro_custo =>(
                                        <option key={centro_custo.id} value={centro_custo.id}>{centro_custo.nome}</option>
                                    ))}
                                </select>
                                </label>   

                                <label htmlFor="natureza_despesa_id">Natureza de despesa:
                                <select name="natureza_despesa_id" id="natureza_despesa_id" onChange={e => setNaturezaDespesaId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {naturezas_despesas.map(natureza_despesa =>(
                                        <option key={natureza_despesa.id} value={natureza_despesa.id}>{natureza_despesa.nome}</option>
                                    ))}
                                </select>
                                </label>                               
                        
                                <button type="submit" className="button">
                                    Criar despesa
                                </button>
                            </form>
                        )}
                       
                </div>
            </div>
        </div>
    )
}