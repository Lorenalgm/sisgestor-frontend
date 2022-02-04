import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function NaturezasDespesas(){
    const [naturezas_despesas, setNaturezasDespesas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
          .get(`naturezas_despesas`)
          .then((response) => {
            setNaturezasDespesas(response.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="naturezas-despesas-container">
            <Menu />
            <div className="natureza-despesa-container">
                <div className="naturezas-despesas-header">
                    <h1 className="natureza-despesa-title">Naturezas de Despesas</h1>
                    <Link className="button" to="login">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Código</p>
                        <p>Tipo</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        naturezas_despesas.map((natureza_despesa, index) => (
                            <div className="natureza-despesa-card" key={natureza_despesa.nome}>
                                <p>{natureza_despesa.nome}</p>
                                <p>{natureza_despesa.codigo}</p>
                                <div className="actions">
                                    <FaEdit className="icon" />
                                    <FaTrash className="icon" />
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* TODO: excluir mock depois */}
                    <div className="natureza-despesa-card" key="2022">
                        <p>Nome da natureza de despesa</p>
                        <p>0000</p>
                        <p>Mãe</p>
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