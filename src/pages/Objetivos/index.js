import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from '@material-ui/lab/Pagination';

export default function Objetivos(){
    const [objetivos, setObjetivos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage ] = useState(1);
    const [totalPages, setTotalPage ] = useState(1);

    useEffect(() => {
      try {
        api
          .get(`objetivos?page=${page}`)
          .then((response) => {
            console.log(response.data.data)
            setObjetivos(response.data.data.data);
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

    async function handleDelete(objetivo) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir o objetivo ${objetivo.nome}?`);
    
        if (isDeleteConfirmed){
            try {
                await api.delete(`/objetivos/${objetivo.id}`);
                setObjetivos(objetivos.filter(objetivoAntiga => objetivoAntiga.id !== objetivo.id))
            } catch (error) {
                alert(error);
            }
        }
    }

    return(
        <div className="objetivos-container">
            <Menu />
            <div className="objetivo-container">
                <div className="objetivos-header">
                    <h1 className="objetivo-title">Objetivos</h1>
                    <Link className="button" to="/objetivos/criar">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Descrição</p>
                        <p>Dimensão</p>
                        <p>Porcentagem atual</p>
                        <p>Ações</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        objetivos.map((objetivo, index) => (
                            <div className="objetivo-card" key={objetivo.id}>
                                <p>{objetivo.nome}</p>
                                <p>{objetivo.descricao}</p>
                                <p>{objetivo.dimensao_id}</p>
                                <p>{objetivo.porcentagem_atual?objetivo.porcentagem_atual:0}</p>
                                <div className="actions">
                                    <Link to={'/objetivos/editar/'+objetivo.id} state={{objetivo: objetivo}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(objetivo)} />
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