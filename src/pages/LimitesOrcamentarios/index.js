import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraInstituicao from '../../components/BarraInstituicao';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export default function FontesInstituicoes(){
    const [fontes, setFontes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      try {
        api
            .get(`fontes?instituicao_id=1&exercicio_id=1`)
            .then((response) => {
            setFontes(response.data.data.data);
            setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="fontes-instituicoes-container">
            <Menu />
            <div className="fonte-instituicao-container">
                <div className="fontes-instituicoes-header">
                    <h1 className="fonte-instituicao-title">Fontes da instituição</h1>
                    <Link className="button" to="/fontes_instituicoes/criar">Criar</Link>
                </div>
                <div className="principal">
                    <BarraInstituicao ativo='fontes' />
                    <div className="list-header">
                        <p>Fonte</p>
                        <p>Valor</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        fontes.map((fonte, index) => (
                           <div className="fonte-card">
                                <div className="fonte-instituicao-card" key={fonte.id}>
                                    <p>
                                        {fonte.acoes.length > 0 && 
                                        <IconButton
                                        aria-label="expand row"
                                        size="small"
                                        onClick={() => setOpen(!open)}>
                                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                        </IconButton>}

                                        {fonte.fonte_tipo.nome}
                                    </p>
                                    <p>R${fonte.valor}</p>
                                    <div className="actions">
                                        <FaEdit className="icon" />
                                        <FaTrash className="icon" />
                                    </div>
                                </div>
                                {open && (fonte.acoes.length > 0) && <div className="acoes">
                                {fonte.acoes.map((acao, index) => (
                                    <div className="acoes-card">
                                        <p>{acao.acao_tipo.nome}</p>
                                    </div>
                                ))}
                                </div>}
                           </div>
                        ))
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}