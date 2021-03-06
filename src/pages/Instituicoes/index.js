import React, {useEffect, useState} from 'react';
import './styles.css';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import Menu from '../../components/Menu';
import { FaEdit } from 'react-icons/fa';

export default function Instituicoes(){
    const [instituicoes, setInstituicoes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        api
          .get(`instituicoes`)
          .then((response) => {
            setInstituicoes(response.data.data.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      } catch (error) {
        alert(error);
      }
    }, []);

    return(
        <div className="instituicoes-container">
            <Menu />
            <div className="instituicao-container">
                <div className="instituicoes-header">
                    <h1 className="instituicao-title">Instituicoes</h1>
                    <Link className="button" to="/instituicoes/criar">Criar</Link>
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
                        <p>Ação</p>
                    </div>
                    <div className="list">
                    {!loading && (
                        instituicoes.map((instituicao, index) => (
                            <div className="instituicao-card" key={instituicao.id}>
                                <p>{instituicao.nome}</p>
                                <p>{instituicao.sigla}</p>
                                <p>{instituicao.cnpj}</p>
                                <p>{instituicao.uasg}</p>
                                <p>{instituicao.logradouro}</p>
                                <p>{instituicao.numero}</p>
                                <p>{instituicao.bairro}</p>
                                <p>{instituicao.complemento}</p>
                                <div className="actions">
                                <Link to={'/instituicoes/editar/'+instituicao.id} state={{instituicao: instituicao}}><FaEdit className="icon" /></Link>
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