import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash } from 'react-icons/fa';

export default function AcoesTipos(){
    const [acoesTipos, setAcoesTipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
          .get(`acoes_tipos`)
          .then((response) => {
            setAcoesTipos(response.data.data.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    async function handleDelete(acao_tipo) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a ação ${acao_tipo.nome}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/acoes_tipos/${acao_tipo.id}`);
            setAcoesTipos(acoesTipos.filter(acaoTipoAntigo => acaoTipoAntigo.id !== acao_tipo.id))
        }
    }

    return(
        <div className="acoes-tipos-container">
            <Menu />
            <div className="acao-tipo-container">
                <div className="acoes-tipos-header">
                    <h1 className="acao-tipo-title">Ações Tipos</h1>
                    <Link className="button" to="/acoes_tipos/criar">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Código</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        acoesTipos.map((acao_tipo, index) => (
                            <div className="acao-tipo-card" key={acao_tipo.id}>
                                <p>{acao_tipo.nome}</p>
                                <p>{acao_tipo.codigo}</p>
                                <div className="actions">
                                    {/* <FaEdit className="icon" /> */}
                                    <FaTrash className="icon" onClick={() => handleDelete(acao_tipo)} />
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* TODO: excluir mock depois */}
                    <div className="acao-tipo-card" key="2022">
                        <p>Nome do acao</p>
                        <p>0000</p>
                        <div className="actions">
                            {/* <FaEdit className="icon" /> */}
                            <FaTrash className="icon" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}