import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from '@material-ui/lab/Pagination';

export default function Metas(){
    const [metas, setMetas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage ] = useState(1);
    const [totalPages, setTotalPage ] = useState(1);

    useEffect(() => {
      try {
        api
          .get(`metas?page=${page}`)
          .then((response) => {
            console.log(response.data.data)
            setMetas(response.data.data.data);
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

    async function handleDelete(meta) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a meta ${meta.nome}?`);
    
        if (isDeleteConfirmed){
            try {
                await api.delete(`/metas/${meta.id}`);
                setMetas(metas.filter(metaAntiga => metaAntiga.id !== meta.id))
            } catch (error) {
                alert(error);
            }
        }
    }

    return(
        <div className="metas-container">
            <Menu />
            <div className="meta-container">
                <div className="metas-header">
                    <h1 className="meta-title">Metas</h1>
                    <Link className="button" to="/metas/criar">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Descrição</p>
                        <p>Tipo</p>
                        <p>Valor inicial</p>
                        <p>Valor final</p>
                        <p>Valor atingido</p>
                        <p>Objetivo</p>
                        <p>Unidade gestora</p>
                        <p>Ações</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        metas.map((meta, index) => (
                            <div className="meta-card" key={meta.id}>
                                <p>{meta.nome}</p>
                                <p>{meta.descricao}</p>
                                <p>{meta.tipo}</p>
                                <p>{meta.valor_inicial?meta.valor_inicial:0}</p>
                                <p>{meta.valor_final?meta.valor_final:0}</p>
                                <p>{meta.valor_atingido?meta.valor_atingido:0}</p>
                                <p>{meta.objetivo_id}</p>
                                <p>{meta.unidade_gestora_id}</p>
                                <div className="actions">
                                    <Link to={'/metas/editar/'+meta.id} state={{meta: meta}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(meta)} />
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