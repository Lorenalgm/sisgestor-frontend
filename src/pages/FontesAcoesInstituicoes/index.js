import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraInstituicao from '../../components/BarraInstituicao';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function FontesAcoesInstituicoes(){
    const [fontes, setFontes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
            .get(`fontes_acoes?instituicao_id=1`, {
                headers: {
                    tipo: 'instituicao'
                }
            })
            .then((response) => {
            console.log(response)
            setFontes(response.data.data.data);
            setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="fontes-acoes-instituicoes-container">
            <Menu />
            <div className="fonte-acao-instituicao-container">
                <div className="fontes-acoes-instituicoes-header">
                    <h1 className="fonte-acao-instituicao-title">Distribuição da instituição</h1>
                    <Link className="button" to="/fontes_instituicoes/criar">Criar</Link>
                </div>
                <div className="principal">
                    <BarraInstituicao ativo='distribuicao' />
                    <div className="list-header">
                        <p>Ação</p>
                        <p>Exercício</p>
                        <p>Valor</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        fontes.map((fonte, index) => (
                            <div className="fonte-acao-instituicao-card" key={fonte.id}>
                                <p>{fonte.acao_id}</p>
                                <p>{fonte.exercicio_id}</p>
                                <p>R${fonte.valor}</p>
                                <div className="actions">
                                    <FaEdit className="icon" />
                                    <FaTrash className="icon" />
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