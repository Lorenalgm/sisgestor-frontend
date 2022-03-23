import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from '@material-ui/lab/Pagination';

export default function ProgramasTipos(){
    const [programasTipos, setProgramasTipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage ] = useState(1);
    const [totalPages, setTotalPage ] = useState(1);

    useEffect(() => {
      try {
        api
          .get(`programas?page=${page}`)
          .then((response) => {
            setProgramasTipos(response.data.data.data);
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

    async function handleDelete(programa) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir o programa ${programa.nome}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/programas/${programa.id}`);
            setProgramasTipos(programasTipos.filter(programaAntigo => programaAntigo.id !== programa.id))
        }
    }
    
    return(
        <div className="programas-tipos-container">
            <Menu />
            <div className="programa-tipo-container">
                <div className="programas-tipos-header">
                    <h1 className="programa-tipo-title">Programas Tipos</h1>
                    <Link className="button" to="/programas_tipos/criar">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Código</p>
                        <p>Nome</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        programasTipos.map((programa, index) => (
                            <div className="programa-tipo-card" key={programa.id}>
                                <p>{programa.codigo}</p>
                                <p>{programa.nome}</p>
                                <div className="actions">
                                    <Link to={'/programas_tipos/editar/'+programa.id} state={{programa: programa}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(programa)} />
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