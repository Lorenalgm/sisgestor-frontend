import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraAdministrativa from '../../components/BarraAdministrativa';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CreditosPlanejadosAdministrativas(){
    const [creditos_planejados_administrativas, setCreditosPlanejadosAdministrativas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
            .get(`creditos_planejados?exercicio_id=1&unidade_administrativa_id=1`)
            .then((response) => {
                setCreditosPlanejadosAdministrativas(response.data.data.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    async function handleDelete(credito_planejado_administrativa) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir o credito_planejado_administrativa ${credito_planejado_administrativa.descricao}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/creditos_planejados/${credito_planejado_administrativa.id}`);
            setCreditosPlanejadosAdministrativas(creditos_planejados_administrativas.filter(creditoPlanejadoAdministrativoAntigo => creditoPlanejadoAdministrativoAntigo.id !== credito_planejado_administrativa.id))
        }
    }

    return(
        <div className="creditos-planejados-administrativas-container">
            <Menu />
            <div className="credito-planejado-administrativa-container">
                <div className="creditos-planejados-administrativas-header">
                    <h1 className="credito-planejado-administrativa-title">Creditos Planejados Administrativas</h1>
                    <Link className="button" to="/creditos_planejados_administrativas/criar">Criar</Link>
                </div>
                <div className="principal">
                    <BarraAdministrativa ativo='creditos_planejados_administrativas' />
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
                                    <FaTrash className="icon" onClick={() => handleDelete(credito_planejado_administrativa)} />
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