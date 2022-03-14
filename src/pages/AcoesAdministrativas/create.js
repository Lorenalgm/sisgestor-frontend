import React, { useState, useEffect } from 'react';
import './styles-create.css';
import api from '../../services/api';
import Menu from '../../components/Menu';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function AcoesInstituicoesCreate(){
    const [acoesTipos, setAcoesTipos ] = useState([]);
    const [exercicios, setExercicios ] = useState([]);
    const [loading, setLoading ] = useState(true);
    const [acaoTipoId, setAcaoTipoId ] = useState('');
    const [exercicioId, setExercicioId ] = useState('');
    const navigate = useNavigate();
    const [fontesTipos, setFontesTipos ] = useState([]);
    const [fonteTipoId, setFonteTipoId ] = useState('');
    const [valor, setValor ] = useState('');

    useEffect(() => {
        try {
            api
              .get(`acoes_tipos/opcoes`)
              .then((response) => {
                console.log(response)
                setAcoesTipos(response.data.data);
              })
              .catch((err) => console.log(err));

              api
              .get(`exercicios`)
              .then((response) => {
                setExercicios(response.data.data.data);
              })
              .catch((err) => console.log(err));

              api
              .get(`fontes?instituicao_id=1&exercicio_id=1`)
              .then((response) => {
                setFontesTipos(response.data.data.data);
                setLoading(false)
              })
              .catch((err) => console.log(err));
          } catch (error) {
            alert(error);
          }

    }, [])

    async function handleCreateAcaoInstituicao(e){
        e.preventDefault();
        
        try {
            const data = {
                acao_tipo_id: acaoTipoId,
                exercicio_id: exercicioId,
                instituicao_id: 1
            }

            const response = await api.post('acoes', data);
            
            if(response){
                const dataFonteAcao = {
                    fonte_id: fonteTipoId,
                    acao_id: response.data.data.id,
                    exercicio_id: exercicioId,
                    valor,
                    instituicao_id: 1
                }

                await api.post('fontes_acoes', dataFonteAcao);

                navigate('/acoes_instituicoes');
            }
           
        } catch (error) {
            alert(error.response.data.data?error.response.data.data:'Não foi possível finalizar o procedimento. Tente novamente');
        }
    }

    return(
        <div className="acoes-instituicoes-create-container">
            <Menu />
            <div className="acao-instituicao-create-container">
                <div className="acoes-instituicoes-create-header">
                    <h1 className="acao-instituicao-create-title">Nova Ação</h1>
                </div>
                <div className="principal">
                        {!loading && (
                            
                            <form className="acao-instituicao-create-form" onSubmit={e => handleCreateAcaoInstituicao(e)}>
                                <label htmlFor="exercicioId">Exercício:
                                <select name="exercicioId" id="exercicioId" onChange={e => setExercicioId(e.target.value)}>
                                    <option key='' value=''>Selecione</option>
                                    {exercicios.map(exercicio =>(
                                        <option key={exercicio.id} value={exercicio.id}>{exercicio.nome}</option>
                                    ))}
                                </select>
                                </label>

                                <Autocomplete
                                disablePortal
                                className="select2"
                                id="acaoTipoId"
                                options={acoesTipos}
                                sx={{ width: 460 }}
                                onChange={(e,v) => setAcaoTipoId(v.id)}
                                renderInput={(params) => <TextField {...params} label="Ação tipo" />}
                                />

                                <label htmlFor="fonteTipoId">Fonte tipo:
                                    <select name="fonteTipoId" id="fonteTipoId" onChange={e => setFonteTipoId(e.target.value)}>
                                        <option key='' value=''>Selecione</option>
                                        {fontesTipos.map(fonte =>(
                                            <option key={fonte.id} value={fonte.id}>{fonte.fonte_tipo.nome}</option>
                                        ))}
                                    </select>
                                </label>

                                <label>
                                Valor:
                                    <input type="text" name="valor" onChange={e => setValor(e.target.value)} placeholder="Valor da fonte" />
                                </label> 

                                {/* <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                                <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                multiple
                                value={personName}
                                onChange={handleChange}
                                input={<OutlinedInput label="Name" />}
                                MenuProps={MenuProps}
                                >
                                {names.map((name) => (
                                    <MenuItem
                                    key={name}
                                    value={name}
                                    style={getStyles(name, personName, theme)}
                                    >
                                    {name}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl> */}
                        
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