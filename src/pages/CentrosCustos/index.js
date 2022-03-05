import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from '@material-ui/lab/Pagination';

export default function CentrosCustos(){
    const [centrosCustos, setCentrosCustos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage ] = useState(1);
    const [totalPages, setTotalPage ] = useState(1);

    useEffect(() => {
      try {
        api
          .get(`centros_custos?page=${page}`)
          .then((response) => {
            setCentrosCustos(response.data.data.data);
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

    async function handleDelete(centro_custo) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir o centro de custo ${centro_custo.nome}?`);
    
        if (isDeleteConfirmed){
            try {
                await api.delete(`/centros_custos/${centro_custo.id}`);
                setCentrosCustos(centrosCustos.filter(centroCustoAntigo => centroCustoAntigo.id !== centro_custo.id))
            } catch (error) {
                alert(error);
            }
        }
    }

    return(
        <div className="centros-custos-container">
            <Menu />
            <div className="centro-custo-container">
                <div className="centros-custos-header">
                    <h1 className="centro-custo-title">Centros Custos</h1>
                    <Link className="button" to="/centros_custos/criar">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Ações</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        centrosCustos.map((centro_custo, index) => (
                            <div className="centro-custo-card" key={centro_custo.id}>
                                <p>{centro_custo.nome}</p>
                                <div className="actions">
                                    <Link to={'/centros_custos/editar/'+centro_custo.id} state={{centro_custo: centro_custo}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(centro_custo)} />
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