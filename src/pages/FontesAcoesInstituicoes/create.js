import React, { useState, useEffect } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';

export default function FontesAcoesInstituicoesCreate(){
    const [fontesTipos, setFontesTipos ] = useState([]);
    const [acoesTipos, setAcoesTipos ] = useState([]);
    const [exercicios, setExercicios ] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [fonteTipoId, setFonteTipoId ] = useState('');
    const [acaoTipoId, setAcaoTipoId ] = useState('');
    const [exercicioId, setExercicioId ] = useState('');
    const [valor, setValor ] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        try {
              api
              .get(`fontes?instituicao_id=1&exercicio_id=1`)
              .then((response) => {
                setFontesTipos(response.data.data.data);
              })
              .catch((err) => console.log(err));
            
              api
              .get(`acoes?instituicao_id=1&exercicio_id=1`)
              .then((response) => {
                setAcoesTipos(response.data.data.data);
              })
              .catch((err) => console.log(err));

              api
              .get(`exercicios`)
              .then((response) => {
                setExercicios(response.data.data.data);
                setLoading(false)
              })
              .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }

    }, [])

    async function handleCreateFonteAcaoInstituicao(e){
        e.preventDefault();

        const data = {
            fonte_id: fonteTipoId,
            acao_id: acaoTipoId,
            exercicio_id: exercicioId,
            valor,
            instituicao_id: 1
        }

        try {
            const response = await api.post('fontes_acoes', data);
            
            if(response){
                navigate('/fontes_acoes_instituicoes');
            }
        } catch (error) {
            alert(error.response.data.data);
        }
    }

    return(
        <div className="fontes-acoes-instituicoes-create-container">
            <Menu />
            <div className="fonte-acao-instituicao-create-container">
                <div className="fontes-acoes-instituicoes-create-header">
                    <h1 className="fonte-acao-instituicao-create-title">Nova Distribuição</h1>
                </div>
                <div className="principal">
                {/* fonte_id: fonteTipoId,
            acao_id: acaoTipoId,
            exercicio_id: exercicioId,
            valor, */}
                        {!loading && (
                            
                            <form className="fonte-acao-instituicao-create-form" onSubmit={e => handleCreateFonteAcaoInstituicao(e)}>
                                
                                <label htmlFor="fonteTipoId">Fonte tipo:
                                    <select name="fonteTipoId" id="fonteTipoId" onChange={e => setFonteTipoId(e.target.value)}>
                                        <option key='' value=''>Selecione</option>
                                        {fontesTipos.map(fonte =>(
                                            <option key={fonte.id} value={fonte.id}>{fonte.id}</option>
                                        ))}
                                    </select>
                                </label>

                                <label htmlFor="acaoTipoId">Ação tipo:
                                    <select name="acaoTipoId" id="acaoTipoId" onChange={e => setAcaoTipoId(e.target.value)}>
                                        <option key='' value=''>Selecione</option>
                                        {acoesTipos.map(acao =>(
                                            <option key={acao.id} value={acao.id}>{acao.id}</option>
                                        ))}
                                    </select>
                                </label>


                                <label>
                                Valor:
                                    <input type="text" name="valor" onChange={e => setValor(e.target.value)} placeholder="Valor da fonte" />
                                </label> 

                                <label htmlFor="exercicioId">Exercício:
                                <select name="exercicioId" id="exercicioId" onChange={e => setExercicioId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {exercicios.map(exercicio =>(
                                        <option key={exercicio.id} value={exercicio.id}>{exercicio.nome}</option>
                                    ))}
                                </select>
                                </label>
                        
                                <button type="submit" className="button">
                                    Criar ação
                                </button>
                            </form>
                        )}
                       
                </div>
            </div>
        </div>
    )
}