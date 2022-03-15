import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraGestora from '../../components/BarraGestora';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function MetasOrcamentarias(){
    const [metas_orcamentarias, setMetasOrcamentarias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
            .get(`metas_orcamentarias?exercicio_id=1`)
            .then((response) => {
                console.log(response)
                setMetasOrcamentarias(response.data.data.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    async function handleDelete(metaOrcamentaria) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a meta ${metaOrcamentaria.nome}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/metas_orcamentarias/${metaOrcamentaria.id}`);
            setMetasOrcamentarias(metas_orcamentarias.filter(metaOrcamentariaAntigo => metaOrcamentariaAntigo.id !== metaOrcamentaria.id))
        }
    }

    return(
        <div className="metas-orcamentarias-container">
            <Menu />
            <div className="meta-orcamentaria-container">
                <div className="metas-orcamentarias-header">
                    <h1 className="meta-orcamentaria-title">Metas Orçamentárias</h1>
                    <Link className="button" to="/metas_orcamentarias/criar">Criar</Link>
                </div>
                <div className="principal">
                    <BarraGestora ativo='metas_orcamentarias' />
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Quantidade Estimada</p>
                        <p>Quantidade Alcançada</p>
                        <p>Ação</p>
                        <p>Natureza de Despesa</p>
                        <p>Unidade Gestora</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        metas_orcamentarias.map((metaOrcamentaria, index) => (

                            <div className="meta-orcamentaria-card" key={metaOrcamentaria.id}>
                                <p>{metaOrcamentaria.nome}</p>
                                <p>R${metaOrcamentaria.qtd_estimada}</p>
                                <p>{metaOrcamentaria.qtd_alcancada}</p>
                                <p>{metaOrcamentaria.acao_id}</p>
                                <p>{metaOrcamentaria.natureza_despesa_id}</p>
                                <p>{metaOrcamentaria.unidade_gestora_id}</p>
                                <div className="actions">
                                    <Link to={'/metas_orcamentarias/editar/'+metaOrcamentaria.id} state={{meta_orcamentaria: metaOrcamentaria}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(metaOrcamentaria)} />
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