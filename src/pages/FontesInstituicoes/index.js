import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import BarraInstituicao from '../../components/BarraInstituicao';
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function FontesInstituicoes(){
    const [fontes, setFontes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [abrirModal, setAbrirModal] = useState(false);

    useEffect(() => {
      try {
        api
            .get(`fontes`, {
                headers: {
                    tipo: 'instituicao'
                }
            })
            .then((response) => {
            setFontes(response.data.data.data);
            setLoading(false);
            })
            .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    async function handleModal(){
        setAbrirModal(!abrirModal);
    }

    return(
        <div className="fontes-instituicoes-container">
            <Menu />
            <div className={abrirModal?'modal-nova-fonte-mostrar modal-nova-fonte':'modal-nova-fonte-ocultar modal-nova-fonte'}>
                <label>
                    Fonte:
                    <input type="text" name="name" />
                </label> 
            </div>
            <div className="fonte-instituicao-container">
                <div className="fontes-instituicoes-header">
                    <h1 className="fonte-instituicao-title">Fontes da instituição</h1>
                    <button className="button" onClick={() => handleModal()}>Criar</button>
                </div>
                <div className="principal">
                    <BarraInstituicao ativo='fontes' />
                    <div className="list-header">
                        <p>Fonte</p>
                        <p>Valor</p>
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        fontes.map((fonte, index) => (
                            <div className="fonte-instituicao-card" key={fonte.id}>
                                <p>{fonte.fonte_tipo}</p>
                                <p>R${fonte.valor}</p>
                                <div className="actions">
                                    <FaEdit className="icon" />
                                    <FaTrash className="icon" />
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* TODO: excluir mock depois */}
                    <div className="fonte-instituicao-card" key="2022">
                        <p>Financeira</p>
                        <p>R$ 2.000</p>
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