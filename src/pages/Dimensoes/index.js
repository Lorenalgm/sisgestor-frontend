import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from '@material-ui/lab/Pagination';

export default function Dimensoes(){
    const [dimensoes, setDimensoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage ] = useState(1);
    const [totalPages, setTotalPage ] = useState(1);

    useEffect(() => {
      try {
        api
          .get(`dimensoes?page=${page}`)
          .then((response) => {
            setDimensoes(response.data.data.data);
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

    async function handleDelete(dimensao) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a dimensão ${dimensao.nome}?`);
    
        if (isDeleteConfirmed){
            try {
                await api.delete(`/dimensoes/${dimensao.id}`);
                setDimensoes(dimensoes.filter(dimensaoAntiga => dimensaoAntiga.id !== dimensao.id))
            } catch (error) {
                alert(error);
            }
        }
    }

    return(
        <div className="dimensoes-container">
            <Menu />
            <div className="dimensao-container">
                <div className="dimensoes-header">
                    <h1 className="dimensao-title">Dimensões</h1>
                    <Link className="button" to="/dimensoes/criar">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Descrição</p>
                        <p>Ações</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        dimensoes.map((dimensao, index) => (
                            <div className="dimensao-card" key={dimensao.id}>
                                <p>{dimensao.nome}</p>
                                <p>{dimensao.descricao}</p>
                                <div className="actions">
                                    <Link to={'/dimensoes/editar/'+dimensao.id} state={{dimensao: dimensao}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(dimensao)} />
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