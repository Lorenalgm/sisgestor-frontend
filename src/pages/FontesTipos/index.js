import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from '@material-ui/lab/Pagination';

export default function Fontes(){
    const [fontesTipos, setFontesTipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage ] = useState(1);
    const [totalPages, setTotalPage ] = useState(1);

    useEffect(() => {
      try {
        api
          .get(`fontes_tipos?page=${page}`)
          .then((response) => {
            setFontesTipos(response.data.data.data);
            setTotalPage(response.data.data.last_page);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, [page]);

    function handleChange(e, value) {
        setPage(value);            
    };

    async function handleDelete(fonte_tipo) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a fonte ${fonte_tipo.nome}?`);
    
        if (isDeleteConfirmed){
            try {
                await api.delete(`/fontes_tipos/${fonte_tipo.id}`);
                setFontesTipos(fontesTipos.filter(fonteTipoAntigo => fonteTipoAntigo.id !== fonte_tipo.id))
            } catch (error) {
                alert(error);
            }
        }
    }

    return(
        <div className="fontes-tipos-container">
            <Menu />
            <div className="fonte-tipo-container">
                <div className="fontes-tipos-header">
                    <h1 className="fonte-tipo-title">Fontes Tipos</h1>
                    <Link className="button" to="/fontes_tipos/criar">Criar</Link>
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
                                <p>{fonte_tipo.grupo_fonte.nome}</p>
                                <p>{fonte_tipo.especificacao.nome}</p>
                                <div className="actions">
                                    <Link to={'/fontes_tipos/editar/'+fonte_tipo.id} state={{fonte_tipo: fonte_tipo}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(fonte_tipo)} />
                                </div>
                            </div>
                        ))
                    )}
                    </div>
                    <div>
                        <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
                    </div>
                </div>
            </div>
        </div>
    )
}