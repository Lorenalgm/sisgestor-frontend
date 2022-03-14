import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraAdministrativa from '../../components/BarraAdministrativa';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Movimentos(){
    const [empenhos, setEmpenhos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
            .get(`empenhos?unidade_administrativa_id=1`)
            .then((response) => {
                setEmpenhos(response.data.data.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    async function handleDelete(empenho) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir o empenho ${empenho.descricao}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/empenhos/${empenho.id}`);
            setEmpenhos(empenhos.filter(empenhoAntigo => empenhoAntigo.id !== empenho.id))
        }
    }

    return(
        <div className="empenhos-container">
            <Menu />
            <div className="empenho-container">
                <div className="empenhos-header">
                    <h1 className="empenho-title">Empenhos</h1>
                    <Link className="button" to="/empenhar/criar">Criar</Link>
                </div>
                <div className="principal">
                    <BarraAdministrativa ativo='empenhar' />
                    <div className="list-header">
                        <p>Valor</p>
                        <p>Data</p>
                        <p>Crédito</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        empenhos.map((empenho, index) => (
                            <div className="empenho-card" key={empenho.id}>
                                <p>{empenho.valor_empenhado}</p>
                                <p>{empenho.data_empenho}</p>
                                <p>{empenho.credito_disponivel_id}</p>
                                <div className="actions">
                                    <Link to={'/empenhar/editar/'+empenho.id} state={{empenho: empenho}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(empenho)} />
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