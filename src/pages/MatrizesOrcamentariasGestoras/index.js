import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function MatrizesOrcamentariasGestoras(){
    const [programas, setProgramas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
          .get(`programas_tipos`)
          .then((response) => {
            setProgramas(response.data.data.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="programas-container">
            <Menu />
            <div className="programa-container">
                <div className="programas-header">
                    <h1 className="programa-title">Programas</h1>
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
                        programas.map((programa, index) => (
                            <div className="programa-card" key={programa.nome}>
                                <p>{programa.nome}</p>
                                <p>{programa.codigo}</p>
                                <div className="actions">
                                    <FaEdit className="icon" />
                                    <FaTrash className="icon" />
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* TODO: excluir mock depois */}
                    <div className="programa-card" key="2022">
                        <p>Nome do programa</p>
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