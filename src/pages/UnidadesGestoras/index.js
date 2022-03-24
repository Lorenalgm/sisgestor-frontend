import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Pagination from '@material-ui/lab/Pagination';

export default function UnidadesGestoras(){
    const [unidades_gestoras, setUnidadesGestoras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage ] = useState(1);
    const [totalPages, setTotalPage ] = useState(1);
    const [searchNome, setSearchNome ] = useState('');

    useEffect(() => {
      try {
        api
          .get(`unidades_gestoras?page=${page}&termo=${searchNome}`)
          .then((response) => {
            console.log(response.data.data.data)
            setUnidadesGestoras(response.data.data.data);
            setTotalPage(response.data.data.last_page);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, [page, searchNome]);

    function handleChange(e, value) {
        setPage(value);            
    };

    async function handleDelete(unidade_gestora) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a unidade ${unidade_gestora.nome}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/unidades_gestoras/${unidade_gestora.id}`);
            setUnidadesGestoras(unidades_gestoras.filter(unidadeGestoraAntigo => unidadeGestoraAntigo.id !== unidade_gestora.id))
        }
    }

    return(
        <div className="unidades-gestoras-container">
            <Menu />
            <div className="unidade-gestora-container">
                <div className="unidades-gestoras-header">
                    <h1 className="unidade-gestora-title">Unidades Gestoras</h1>
                    <Link className="button" to="/unidades_gestoras/criar">Criar</Link>
                </div>
                <div className="principal">
                    <div className="filters">
                        <input type="text" name="search" placeholder="Pesquise uma unidade" onChange={e => setSearchNome(e.target.value)} />
                    </div>
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Sigla</p>
                        <p>CNPJ</p>
                        <p>UASG</p>
                        <p>Logradouro</p>
                        <p>Número</p>
                        <p>Bairro</p>
                        <p>Complemento</p>
                        <p>Instituição</p>
                        <p>Ações</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        unidades_gestoras.map((unidade_gestora, index) => (
                            <div className="unidade-gestora-card" key={unidade_gestora.id}>
                                <p>{unidade_gestora.nome}</p>
                                <p>{unidade_gestora.sigla}</p>
                                <p>{unidade_gestora.cnpj}</p>
                                <p>{unidade_gestora.uasg}</p>
                                <p>{unidade_gestora.logradouro}</p>
                                <p>{unidade_gestora.numero}</p>
                                <p>{unidade_gestora.bairro}</p>
                                <p>{unidade_gestora.complemento}</p>
                                <p>{unidade_gestora.instituicao.nome}</p>
                                <div className="actions">
                                    <Link to={'/unidades_gestoras/editar/'+unidade_gestora.id} state={{unidade_gestora: unidade_gestora}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(unidade_gestora)} />
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