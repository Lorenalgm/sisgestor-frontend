import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function Fontes(){
    const [fontesTipos, setFontesTipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
          .get(`fontes_tipos`)
          .then((response) => {
            setFontesTipos(response.data.data.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    async function handleDelete(fonte_tipo) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a fonte ${fonte_tipo.nome}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/fontes_tipos/${fonte_tipo.id}`);
            setFontesTipos(fontesTipos.filter(fonteTipoAntigo => fonteTipoAntigo.id !== fonte_tipo.id))
        }
    }

    return(
        <div className="fontes-tipos-container">
            <Menu />
            <div className="fonte-tipo-container">
                <div className="fontes-tipos-header">
                    <h1 className="fonte-tipo-title">Fontes</h1>
                    <Link className="button" to="login">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Grupo</p>
                        <p>Especificação</p>
                        <p>Ações</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        fontesTipos.map((fonte_tipo, index) => (
                            <div className="fonte-tipo-card" key={fonte_tipo.id}>
                                <p>{fonte_tipo.nome}</p>
                                <p>{fonte_tipo.grupo_fonte}</p>
                                <p>{fonte_tipo.especificacao}</p>
                                <div className="actions">
                                    {/* <FaEdit className="icon" /> */}
                                    <FaTrash className="icon" onClick={() => handleDelete(fonte_tipo)} />
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* TODO: excluir mock depois */}
                    <div className="fonte-tipo-card" key="2022">
                        <p>Nome do fonte</p>
                        <p>Nome do grupo</p>
                        <p>Nome da fonte</p>
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