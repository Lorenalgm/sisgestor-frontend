import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaTrash, FaEdit, FaEye } from 'react-icons/fa';

export default function UnidadesGestoras(){
    const [unidades_gestoras, setUnidadesGestoras] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
          .get(`unidades_gestoras`)
          .then((response) => {
            setUnidadesGestoras(response.data.data.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    async function handleDelete(unidade_gestora) {
        const isDeleteConfirmed = window.confirm(`Tem certeza que deseja excluir a unidade ${unidade_gestora.nome}?`);
    
        if (isDeleteConfirmed){
            await api.delete(`/unidades_gestoras/${unidade_gestora.id}`);
            setUnidadesGestoras(unidades_gestoras.filter(unidadeGestoraAntigo => unidadeGestoraAntigo.id !== unidade_gestora.id))
        }
    }

    return(
        <div className="unidades-gestoras-container">
            <Menu />
            <div className="unidade-gestora-container">
                <div className="unidades-gestoras-header">
                    <h1 className="unidade-gestora-title">Unidades Gestoras</h1>
                    <Link className="button" to="login">Criar</Link>
                </div>
                <div className="principal">
                    <div className="list-header">
                        <p>Nome</p>
                        <p>Sigla</p>
                        <p>CNPJ</p>
                        <p>UASG</p>
                        <p>Logradouro</p>
                        <p>Número</p>
                        <p>Bairro</p>
                        <p>Complemento</p>
                        <p>Diretor Geral</p>
                        <p>Data início</p>
                        <p>Data fim</p>
                        <p>Instituição</p>
                        <p>Ações</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        unidades_gestoras.map((unidade_gestora, index) => (
                            <div className="unidade-gestora-card" key={unidade_gestora.id}>
                                <p>{unidade_gestora.sigla}</p>
                                <p>{unidade_gestora.cnpj}</p>
                                <p>{unidade_gestora.uasg}</p>
                                <p>{unidade_gestora.logradouro}</p>
                                <p>{unidade_gestora.numero}</p>
                                <p>{unidade_gestora.bairro}</p>
                                <p>{unidade_gestora.complemento}</p>
                                <p>{unidade_gestora.diretor_geral}</p>
                                <p>{unidade_gestora.data_inicio}</p>
                                <p>{unidade_gestora.data_fim}</p>
                                <p>{unidade_gestora.instituicao}</p>
                                <div className="actions">
                                    {/* <FaEdit className="icon" /> */}
                                    <FaTrash className="icon" onClick={() => handleDelete(unidade_gestora)} />
                                </div>
                            </div>
                        ))
                    )}
                    
                    {/* TODO: excluir mock depois */}
                    <div className="unidade-gestora-card" key="2022">
                        <p>Nome do unidade gestora</p>
                        <p>0000</p>
                        <p>0000</p>
                        <p>0000</p>
                        <p>0000</p>
                        <p>0000</p>
                        <p>0000</p>
                        <p>0000</p>
                        <p>0000</p>
                        <p>0000</p>
                        <p>0000</p>
                        <p>0000</p>
                        <div className="actions">
                            {/* <FaEdit className="icon" /> */}
                            <FaTrash className="icon" />
                            {/* <FaEye className="icon" /> */}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}