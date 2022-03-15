import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraGestora from '../../components/BarraGestora';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CreditosPlanejadosAdministrativas(){
    const [creditos_planejados_administrativas, setCreditosPlanejadosAdministrativas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
            .get(`creditos_planejados?exercicio_id=1`)
            .then((response) => {
                setCreditosPlanejadosAdministrativas(response.data.data.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="creditos-planejados-administrativas-container">
            <Menu />
            <div className="credito-planejado-administrativa-container">
                <div className="creditos-planejados-administrativas-header">
                    <h1 className="credito-planejado-administrativa-title">Creditos Planejados Gestoras</h1>
                </div>
                <div className="principal">
                    <BarraGestora ativo='creditos_planejados_gestoras' />
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
                        creditos_planejados_administrativas.map((credito_planejado_administrativa, index) => (
                            <div className="credito-planejado-administrativa-card" key={credito_planejado_administrativa.id}>
                                <p>{credito_planejado_administrativa.descricao}</p>
                                <p>R${credito_planejado_administrativa.valor_solicitado}</p>
                                <p>{credito_planejado_administrativa.valor_disponivel}</p>
                                <p>{credito_planejado_administrativa.despesa_id}</p>
                                <p>{credito_planejado_administrativa.unidade_administrativa_id}</p>
                                <div className="actions">
                                    <Link to={'/creditos_planejados_administrativas/editar/'+credito_planejado_administrativa.id} state={{credito_planejado_administrativa: credito_planejado_administrativa}}><FaEdit className="icon" /></Link>
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