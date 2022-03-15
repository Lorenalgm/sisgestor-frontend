import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraGestora from '../../components/BarraGestora';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CreditosDisponiveisAdministrativas(){
    const [creditos_disponiveis_administrativas, setCreditosDisponiveisAdministrativas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
            .get(`creditos_disponiveis?exercicio_id=1`)
            .then((response) => {
                setCreditosDisponiveisAdministrativas(response.data.data.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="creditos-disponiveis-administrativas-container">
            <Menu />
            <div className="credito-disponivel-administrativa-container">
                <div className="creditos-disponiveis-administrativas-header">
                    <h1 className="credito-disponivel-administrativa-title">Creditos Disponíveis Gestoras</h1>
                </div>
                <div className="principal">
                    <BarraGestora ativo='creditos_disponiveis_gestoras' />
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