import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function Exercicios(){
    const [exercicios, setExercicios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
          .get(`exercicios`)
          .then((response) => {
            setExercicios(response.data.data.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="exercicios-container">
            <Menu />
            <div className="exercicio-container">
                <div className="exercicios-header">
                    <h1 className="exercicio-title">Exercicíos</h1>
                    <Link className="button" to="login">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Data início</p>
                        <p>Data fim</p>
                        <p>Aprovado</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        exercicios.map((exercicio, index) => (
                            <div className="exercicio-card" key={exercicio.nome}>
                                <p>{exercicio.nome}</p>
                                <p>{exercicio.data_inicio}</p>
                                <p>{exercicio.data_fim}</p>
                                <p>{exercicio.aprovado?'Sim':'Não'}</p>
                                <div className="actions">
                                    <FaEdit className="icon" />
                                    <FaTrash className="icon" />
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* TODO: excluir mock depois */}
                    <div className="exercicio-card" key="2022">
                        <p>2022</p>
                        <p>02/02/2022</p>
                        <p>02/12/2022</p>
                        <p>Sim</p>
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