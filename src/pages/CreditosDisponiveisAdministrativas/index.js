import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraAdministrativa from '../../components/BarraAdministrativa';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CreditosDisponiveisAdministrativas(){
    const [creditos_disponiveis_administrativas, setCreditosDisponiveisAdministrativas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
            .get(`creditos_disponiveis?exercicio_id=1&unidade_administrativa_id=1`)
            .then((response) => {
                setCreditosDisponiveisAdministrativas(response.data.data.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    async function handleDelete(credito_disponivel_administrativa) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir o credito_disponivel_administrativa ${credito_disponivel_administrativa.descricao}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/creditos_disponiveis/${credito_disponivel_administrativa.id}`);
            setCreditosDisponiveisAdministrativas(creditos_disponiveis_administrativas.filter(creditoPlanejadoAdministrativoAntigo => creditoPlanejadoAdministrativoAntigo.id !== credito_disponivel_administrativa.id))
        }
    }

    return(
        <div className="creditos-disponiveis-administrativas-container">
            <Menu />
            <div className="credito-disponivel-administrativa-container">
                <div className="creditos-disponiveis-administrativas-header">
                    <h1 className="credito-disponivel-administrativa-title">Creditos Disponíveis Administrativas</h1>
                    <Link className="button" to="/creditos_disponiveis_administrativas/criar">Criar</Link>
                </div>
                <div className="principal">
                    <BarraAdministrativa ativo='creditos_disponiveis_administrativas' />
                    <div className="list-header">
                        <p>Crédito</p>
                        <p>Valor Planejado</p>
                        <p>Valor Disponível</p>
                        <p>Despesa</p>
                        <p>Unidade</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        creditos_disponiveis_administrativas.map((credito_disponivel_administrativa, index) => (
                            <div className="credito-disponivel-administrativa-card" key={credito_disponivel_administrativa.id}>
                                <p>{credito_disponivel_administrativa.descricao}</p>
                                <p>R${credito_disponivel_administrativa.valor_solicitado}</p>
                                <p>{credito_disponivel_administrativa.valor_disponivel}</p>
                                <p>{credito_disponivel_administrativa.despesa_id}</p>
                                <p>{credito_disponivel_administrativa.unidade_administrativa_id}</p>
                                <div className="actions">
                                    <Link to={'/creditos_disponiveis_administrativas/editar/'+credito_disponivel_administrativa.id} state={{credito_disponivel_administrativa: credito_disponivel_administrativa}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(credito_disponivel_administrativa)} />
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