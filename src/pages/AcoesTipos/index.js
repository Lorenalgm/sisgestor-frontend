import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit, FaStar } from 'react-icons/fa';
import Pagination from '@material-ui/lab/Pagination';

export default function AcoesTipos(){
    const [acoesTipos, setAcoesTipos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage ] = useState(1);
    const [totalPages, setTotalPage ] = useState(1);
    const [searchNome, setSearchNome ] = useState('');

    useEffect(() => {
      try {
        api
          .get(`acoes_tipos?page=${page}&termo=${searchNome}`)
          .then((response) => {
            setAcoesTipos(response.data.data.data);
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

    async function handleDelete(acao_tipo) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a ação ${acao_tipo.nome}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/acoes_tipos/${acao_tipo.id}`);
            setAcoesTipos(acoesTipos.filter(acaoTipoAntigo => acaoTipoAntigo.id !== acao_tipo.id))
        }
    }

    return(
        <div className="acoes-tipos-container">
            <Menu />
            <div className="acao-tipo-container">
                <div className="acoes-tipos-header">
                    <h1 className="acao-tipo-title">Ações Tipos</h1>
                    <Link className="button" to="/acoes_tipos/criar">Criar</Link>
                </div>
                <div className="principal">
                    <div className="filters">
                        <input type="text" name="search" placeholder="Pesquise um programa" onChange={e => setSearchNome(e.target.value)} />
                    </div>
                    <div className="list-header">
                        <p>Código</p>
                        <p>Nome</p>
                        <p>Custeio</p>
                        <p>Investimento</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        acoesTipos.map((acao_tipo, index) => (
                            <div className="acao-tipo-card" key={acao_tipo.id}>
                                <p>{acao_tipo.codigo}</p>
                                <p>{acao_tipo.nome}</p>
                                <p>{acao_tipo.custeio?'Sim':'Não'}</p>
                                <p>{acao_tipo.investimento?'Sim':'Não'}</p>
                                <div className="actions">
                                    <Link to={'/acoes_tipos/editar/'+acao_tipo.id} state={{acao_tipo: acao_tipo}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(acao_tipo)} />
                                    {acao_tipo.fav?<FaStar className="icon fav" />:''}
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