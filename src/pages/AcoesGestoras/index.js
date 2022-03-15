import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraGestora from '../../components/BarraGestora';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AcoesGestoras(){
    const [acoes_gestoras, setAcoesGestoras] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
            .get(`acoes?exercicio_id=1&unidade_gestora_id=1`)
            .then((response) => {
                console.log(response)
                setAcoesGestoras(response.data.data.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    async function handleDelete(acao_gestora) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a ação ${acao_gestora.acao_tipo.nome}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/acoes_gestoras/${acao_gestora.id}`);
            setAcoesGestoras(acoes_gestoras.filter(acaoGestoraAntigo => acaoGestoraAntigo.id !== acao_gestora.id))
        }
    }

    return(
        <div className="acoes-gestoras-container">
            <Menu />
            <div className="acao-gestora-container">
                <div className="acoes-gestoras-header">
                    <h1 className="acao-gestora-title">Ações Gestora</h1>
                    <Link className="button" to="/acoes_gestoras/criar">Criar</Link>
                </div>
                <div className="principal">
                    <BarraGestora ativo='acoes_gestoras' />
                    <div className="list-header">
                        <p>Ação</p>
                        <p>Valor Total</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        acoes_gestoras.map((acao_gestora, index) => (

                            <div className="acao-gestora-card" key={acao_gestora.id}>
                                <p>{acao_gestora.acao_tipo.nome}</p>
                                <p>R${acao_gestora.valor_total}</p>
                                <div className="actions">
                                    <Link to={'/acoes_gestoras/editar/'+acao_gestora.id} state={{acao_gestora: acao_gestora}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(acao_gestora)} />
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