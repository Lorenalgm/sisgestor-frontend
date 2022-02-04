import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function Fontes(){
    const [fontes, setFontes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
          .get(`fontes_tipos`)
          .then((response) => {
            setFontes(response.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="fontes-container">
            <Menu />
            <div className="fonte-container">
                <div className="fontes-header">
                    <h1 className="fonte-title">Fontes</h1>
                    <Link className="button" to="login">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Grupo</p>
                        <p>Especificação</p>
                        <p>Ações</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        fontes.map((fonte, index) => (
                            <div className="fonte-card" key={fonte.nome}>
                                <p>{fonte.nome}</p>
                                <p>{fonte.grupo_fonte}</p>
                                <p>{fonte.especificacao}</p>
                                <div className="actions">
                                    <FaEdit className="icon" />
                                    <FaTrash className="icon" />
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* TODO: excluir mock depois */}
                    <div className="fonte-card" key="2022">
                        <p>Nome do fonte</p>
                        <p>Nome do grupo</p>
                        <p>Nome da fonte</p>
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