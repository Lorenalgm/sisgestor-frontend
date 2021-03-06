import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from '@material-ui/lab/Pagination';

export default function UnidadesAdministrativas(){
    const [unidades_administrativas, setUnidadesAdministrativas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage ] = useState(1);
    const [totalPages, setTotalPage ] = useState(1);

    useEffect(() => {
      try {
        api
          .get(`unidades_administrativas?page=${page}`)
          .then((response) => {
            setUnidadesAdministrativas(response.data.data.data);
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

    async function handleDelete(unidade_administrativa) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a unidade ${unidade_administrativa.nome}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/unidades_administrativas/${unidade_administrativa.id}`);
            setUnidadesAdministrativas(unidades_administrativas.filter(unidadeAdministrativaAntigo => unidadeAdministrativaAntigo.id !== unidade_administrativa.id))
        }
    }
    return(
        <div className="unidades-administrativas-container">
            <Menu />
            <div className="unidade-administrativa-container">
                <div className="unidades-administrativas-header">
                    <h1 className="unidade-administrativa-title">Unidades Administrativas</h1>
                    <Link className="button" to="/unidades_administrativas/criar">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Sigla</p>
                        <p>UGR</p>
                        <p>Unidade Gestora</p>
                        <p>A????es</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        unidades_administrativas.map((unidade_administrativa, index) => (
                            <div className="unidade-administrativa-card" key={unidade_administrativa.id}>
                                <p>{unidade_administrativa.nome}</p>
                                <p>{unidade_administrativa.sigla}</p>
                                <p>{unidade_administrativa.ugr}</p>
                                <p>{unidade_administrativa.unidade_gestora.nome}</p>
                                <div className="actions">
                                    <Link to={'/unidades_administrativas/editar/'+unidade_administrativa.id} state={{unidade_administrativa: unidade_administrativa}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(unidade_administrativa)} />
                                    {/* <FaEye className="icon" /> */}
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