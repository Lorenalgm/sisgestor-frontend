import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash } from 'react-icons/fa';

export default function NaturezasDespesas(){
    const [naturezas_despesas, setNaturezasDespesas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
          .get(`naturezas_despesas`)
          .then((response) => {
            setNaturezasDespesas(response.data.data.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

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
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Código</p>
                        <p>Tipo</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        naturezas_despesas.map((natureza_despesa, index) => (
                            <div className="natureza-despesa-card" key={natureza_despesa.id}>
                                <p>{natureza_despesa.nome}</p>
                                <p>{natureza_despesa.codigo}</p>
                                <p>{natureza_despesa.tipo}</p>
                                <div className="actions">
                                    {/* <FaEdit className="icon" /> */}
                                    <FaTrash className="icon" onClick={() => handleDelete(natureza_despesa)} />
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