import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';

export default function UnidadesAdministrativas(){
    const [unidades_administrativas, setUnidadesAdministrativas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
          .get(`unidades_administrativas`)
          .then((response) => {
            setUnidadesAdministrativas(response.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="unidades-administrativas-container">
            <Menu />
            <div className="unidade-administrativa-container">
                <div className="unidades-administrativas-header">
                    <h1 className="unidade-administrativa-title">Unidades Administrativas</h1>
                    <Link className="button" to="login">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Sigla</p>
                        <p>UGR</p>
                        <p>Unidade Gestora</p>
                        <p>Ações</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        unidades_administrativas.map((unidade_administrativa, index) => (
                            <div className="unidade-administrativa-card" key={unidade_administrativa.id}>
                                <p>{unidade_administrativa.nome}</p>
                                <p>{unidade_administrativa.sigla}</p>
                                <p>{unidade_administrativa.ugr}</p>
                                <p>{unidade_administrativa.unidade_gestora}</p>
                                <div className="actions">
                                    <FaEdit className="icon" />
                                    <FaTrash className="icon" />
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* TODO: excluir mock depois */}
                    <div className="unidade-administrativa-card" key="2022">
                        <p>Nome do unidade administrativa</p>
                        <p>STN</p>
                        <p>UGR aqui</p>
                        <p>IFAP Santana</p>
                        <div className="actions">
                            <FaEdit className="icon" />
                            <FaTrash className="icon" />
                            <FaEye className="icon" />
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}