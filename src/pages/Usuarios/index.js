import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from '@material-ui/lab/Pagination';

export default function Usuarios(){
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage ] = useState(1);
    const [totalPages, setTotalPage ] = useState(1);

    useEffect(() => {
      try {
        api
          .get(`usuarios?page=${page}`)
          .then((response) => {
              console.log(response)
            setUsuarios(response.data.data.data);
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

    async function handleDelete(usuario) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a ação ${usuario.nome}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/usuarios/${usuario.id}`);
            setUsuarios(usuarios.filter(usuarioAntigo => usuarioAntigo.id !== usuario.id))
        }
    }

    return(
        <div className="usuarios-container">
            <Menu />
            <div className="usuario-container">
                <div className="usuarios-header">
                    <h1 className="usuario-title">Usuários</h1>
                    <Link className="button" to="/usuarios/criar">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        usuarios.map((usuario, index) => (
                            <div className="usuario-card" key={usuario.id}>
                                <p>{usuario.nome}</p>
                                <div className="actions">
                                    <Link to={'/acoes_tipos/editar/'+usuario.id} state={{usuario: usuario}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(usuario)} />
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