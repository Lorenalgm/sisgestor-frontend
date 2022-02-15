import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function ProgramasTipos(){
    const [programasTipos, setProgramasTipos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
          .get(`programas_tipos`)
          .then((response) => {
            setProgramasTipos(response.data.data.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    async function handleDelete(programa) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir o programa ${programa.nome}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/programas_tipos/${programa.id}`);
            setProgramasTipos(programasTipos.filter(programaAntigo => programaAntigo.id !== programa.id))
        }
    }
    
    return(
        <div className="programas-tipos-container">
            <Menu />
            <div className="programa-tipo-container">
                <div className="programas-tipos-header">
                    <h1 className="programa-tipo-title">Programas Tipos</h1>
                    <Link className="button" to="/programas_tipos/criar">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Código</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        programasTipos.map((programa, index) => (
                            <div className="programa-tipo-card" key={programa.id}>
                                <p>{programa.nome}</p>
                                <p>{programa.codigo}</p>
                                <div className="actions">
                                    {/* <FaEdit className="icon" disabled /> */}
                                    <FaTrash className="icon" onClick={() => handleDelete(programa)} />
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