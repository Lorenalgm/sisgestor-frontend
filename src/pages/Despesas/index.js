import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraAdministrativa from '../../components/BarraAdministrativa';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Despesas(){
    const [despesas, setDespesas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
            .get(`despesas?exercicio_id=1`)
            .then((response) => {
                console.log(response)
                setDespesas(response.data.data.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    async function handleDelete(despesa) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir o despesa ${despesa.descricao}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/despesas/${despesa.id}`);
            setDespesas(despesas.filter(despesaAntigo => despesaAntigo.id !== despesa.id))
        }
    }

    return(
        <div className="despesas-container">
            <Menu />
            <div className="despesa-container">
                <div className="despesas-header">
                    <h1 className="despesa-title">Despesas administrativas</h1>
                    <Link className="button" to="/despesas/criar">Criar</Link>
                </div>
                <div className="principal">
                    <BarraAdministrativa ativo='despesas' />
                    <div className="list-header">
                        <p>Despesa</p>
                        <p>Valor</p>
                        <p>Valor Total</p>
                        <p>Quantidade</p>
                        <p>Qtd. de pessoas</p>
                        <p>Tipo</p>
                        <p>Centro de Custo</p>
                        <p>Natureza da Despesa</p>
                        <p>Unidade</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        despesas.map((despesa, index) => (

                            <div className="despesa-card" key={despesa.id}>
                                <p>{despesa.descricao}</p>
                                <p>R${despesa.valor}</p>
                                <p>{despesa.valor_total}</p>
                                <p>{despesa.qtd}</p>
                                <p>{despesa.qtd_pessoas}</p>
                                <p>{despesa.tipo}</p>
                                <p>{despesa.centro_custo?.nome}</p>
                                <p>{despesa.natureza_despesa?.nome}</p>
                                <p>{despesa.unidade_administrativa?.nome}</p>
                                <div className="actions">
                                    <Link to={'/despesas/editar/'+despesa.id} state={{despesa: despesa}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(despesa)} />
                                </div>
                            </div>
                        ))
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}