import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function Acoes(){
    const [acoes, setAcoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
          .get(`acoes_tipos`)
          .then((response) => {
            setAcoes(response.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="acoes-container">
            <Menu />
            <div className="acao-container">
                <div className="acoes-header">
                    <h1 className="acao-title">Ações</h1>
                    <Link className="button" to="login">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Código</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        acoes.map((acao, index) => (
                            <div className="acao-card" key={acao.nome}>
                                <p>{acao.nome}</p>
                                <p>{acao.codigo}</p>
                                <div className="actions">
                                    <FaEdit className="icon" />
                                    <FaTrash className="icon" />
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* TODO: excluir mock depois */}
                    <div className="acao-card" key="2022">
                        <p>Nome do acao</p>
                        <p>0000</p>
                        <div className="actions">
                            <FaEdit className="icon" />
                            <FaTrash className="icon" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}