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

export default function LimitesOrcamentarios(){
    const [limites, setLimitesOrcamentarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
      try {
        api
            .get(`limites_orcamentarios`)
            .then((response) => {
            setLimitesOrcamentarios(response.data.data.data);
            setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="limites-orcamentarios-instituicoes-container">
            <Menu />
            <div className="limite-orcamentario-instituicao-container">
                <div className="limites-orcamentarios-instituicoes-header">
                    <h1 className="limite-orcamentario-instituicao-title">Limites da instituição</h1>
                </div>
                <div className="principal">
                    <BarraInstituicao ativo='limites_orcamentarios' />
                    <div className="list-header">
                        <p>Descrição</p>
                        <p>Valor Solicitado</p>
                        <p>Valor Disponível</p>
                        <p>Número do Processo</p>
                        <p>Despesa</p>
                        <p>Unidade</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        limites.map((limite, index) => (
                           <div className="limite-orcamentario-card">
                                <div className="limite-orcamentario-instituicao-card" key={limite.id}>
                                    <p>{limite.descricao}</p>
                                    <p>R${limite.valor_solicitado}</p>
                                    <p>R${limite.valor_disponivel}</p>
                                    <p>{limite.numero_processo}</p>
                                    <p>{limite.despesa_id}</p>
                                    <p>{limite.unidade_administrativa_id}</p>
                                    <div className="actions">
                                        <FaEdit className="icon" />
                                    </div>
                                </div>
                           </div>
                        ))
                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}