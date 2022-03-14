import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraInstituicao from '../../components/BarraInstituicao';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Movimentos(){
    const [movimentos, setMovimentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
            .get(`movimentos?exercicio_id=1`)
            .then((response) => {
                setMovimentos(response.data.data.data);
                setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    async function handleDelete(movimento) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir o movimento ${movimento.descricao}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/movimentos/${movimento.id}`);
            setMovimentos(movimentos.filter(movimentoAntigo => movimentoAntigo.id !== movimento.id))
        }
    }

    return(
        <div className="movimentos-container">
            <Menu />
            <div className="movimento-container">
                <div className="movimentos-header">
                    <h1 className="movimento-title">Movimentos da instituição</h1>
                    <Link className="button" to="/movimentos/criar">Criar</Link>
                </div>
                <div className="principal">
                    <BarraInstituicao ativo='movimentos' />
                    <div className="list-header">
                        <p>Movimento</p>
                        <p>Valor</p>
                        <p>Tipo</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        movimentos.map((movimento, index) => (
                            <div className="movimento-card" key={movimento.id}>
                                <p>{movimento.descricao}</p>
                                <p>R${movimento.valor}</p>
                                <p>{movimento.tipo}</p>
                                <div className="actions">
                                    <Link to={'/movimentos/editar/'+movimento.id} state={{movimento: movimento}}><FaEdit className="icon" /></Link>
                                    <FaTrash className="icon" onClick={() => handleDelete(movimento)} />
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