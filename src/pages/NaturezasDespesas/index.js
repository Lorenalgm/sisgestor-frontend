import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit, FaStar } from 'react-icons/fa';
import Pagination from '@material-ui/lab/Pagination';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function NaturezasDespesas(){
    const [naturezas_despesas, setNaturezasDespesas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage ] = useState(1);
    const [totalPages, setTotalPage ] = useState(1);
    const [open, setOpen] = useState(false);
    const [searchNome, setSearchNome ] = useState('');

    useEffect(() => {
      try {
        api
          .get(`naturezas_despesas?page=${page}&termo=${searchNome}`)
          .then((response) => {
            setNaturezasDespesas(response.data.data.data);
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

    async function handleDelete(natureza_despesa) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a natureza de despesa ${natureza_despesa.nome}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/naturezas_despesas/${natureza_despesa.id}`);
            setNaturezasDespesas(naturezas_despesas.filter(naturezaDespesaAntigo => naturezaDespesaAntigo.id !== natureza_despesa.id))
        }
    }

    return(
        <div className="naturezas-despesas-container">
            <Menu />
            <div className="natureza-despesa-container">
                <div className="naturezas-despesas-header">
                    <h1 className="natureza-despesa-title">Naturezas de Despesas</h1>
                    <Link className="button" to="/naturezas_despesas/criar">Criar</Link>
                </div>
                <div className="principal">
                    <div className="filters">
                        <input type="text" name="search" placeholder="Pesquise uma natureza" onChange={e => setSearchNome(e.target.value)} />
                    </div>
                    <div className="list-header">
                        <p>Elemento de despesa</p>
                        <p>Natureza</p>
                        <p>Tipo de desoesa</p>
                        <p>A????o</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        naturezas_despesas.map((natureza_despesa, index) => (
                            <div className="natureza-despesa-card" key={natureza_despesa.id}>
                                <div className="natureza-info">
                                    <p>{natureza_despesa.codigo}</p>
                                    <p> 
                                    {natureza_despesa.subnaturezas_despesas.length > 0 && 
                                        <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => setOpen(!open)}>
                                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>}
                                        
                                        {natureza_despesa.nome}

                                    </p>
                                    <p>{natureza_despesa.tipo}</p>
                                    <div className="actions">
                                        <Link to={'/naturezas_despesas/editar/'+natureza_despesa.id} state={{natureza_despesa: natureza_despesa}}><FaEdit className="icon" /></Link>
                                        <FaTrash className="icon" onClick={() => handleDelete(natureza_despesa)} />
                                        {natureza_despesa.fav?<FaStar className="icon fav" />:''}
                                    </div>
                                </div>
                                {open && (natureza_despesa.subnaturezas_despesas.length > 0) && <div className="subnaturezas">
                                    {natureza_despesa.subnaturezas_despesas.map((subnatureza, index) => (
                                        <div className="subnatureza-card">
                                            <p>{subnatureza.nome}</p>
                                            <p>{subnatureza.codigo}</p>
                                            <p>{subnatureza.tipo}</p>
                                            <div className="actions">
                                            <Link to={'/naturezas_despesas/editar/'+subnatureza.id} state={{subnatureza: subnatureza}}><FaEdit className="icon" /></Link>
                                                <FaTrash className="icon" onClick={() => handleDelete(subnatureza)} />
                                            </div>
                                        </div>
                                    ))}
                                </div>}
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