import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Exercicios from './pages/Exercicios'
import ExerciciosCreate from './pages/Exercicios/create'
import ExerciciosEdit from './pages/Exercicios/edit'
import ProgramasTipos from './pages/ProgramasTipos'
import ProgramasTiposCreate from './pages/ProgramasTipos/create'
import ProgramasTiposEdit from './pages/ProgramasTipos/edit'
import FontesTipos from './pages/FontesTipos'
import FontesTiposCreate from './pages/FontesTipos/create'
import FontesTiposEdit from './pages/FontesTipos/edit'
import AcoesTipos from './pages/AcoesTipos'
import AcoesTiposCreate from './pages/AcoesTipos/create'
import AcoesTiposEdit from './pages/AcoesTipos/edit'
import NaturezasDespesas from './pages/NaturezasDespesas'
import NaturezasDespesasCreate from './pages/NaturezasDespesas/create'
import NaturezasDespesasEdit from './pages/NaturezasDespesas/edit'
import Instituicoes from './pages/Instituicoes'
import InstituicoesEdit from './pages/Instituicoes/edit'
import UnidadesGestoras from './pages/UnidadesGestoras'
import UnidadesGestorasCreate from './pages/UnidadesGestoras/create'
import UnidadesGestorasEdit from './pages/UnidadesGestoras/edit'
import UnidadesAdministrativas from './pages/UnidadesAdministrativas'
import UnidadesAdministrativasCreate from './pages/UnidadesAdministrativas/create';
import UnidadesAdministrativasEdit from './pages/UnidadesAdministrativas/edit';
import MatrizesOrcamentariasInstituicoes from './pages/MatrizesOrcamentariasInstituicoes'
import MatrizesOrcamentariasGestoras from './pages/MatrizesOrcamentariasGestoras'
import MatrizesOrcamentariasAdministrativas from './pages/MatrizesOrcamentariasAdministrativas'
import FontesInstituicoes from './pages/FontesInstituicoes'
import FontesInstituicoesCreate from './pages/FontesInstituicoes/create'
import AcoesInstituicoes from './pages/AcoesInstituicoes'
import AcoesInstituicoesCreate from './pages/AcoesInstituicoes/create'
import FontesAcoesInstituicoes from './pages/FontesAcoesInstituicoes'
import FontesAcoesInstituicoesCreate from './pages/FontesAcoesInstituicoes/create'
import Usuarios from './pages/Usuarios'
import Relatorios from './pages/Relatorios'
import CentrosCustos from './pages/CentrosCustos'
import CentrosCustosCreate from './pages/CentrosCustos/create'
import CentrosCustosEdit from './pages/CentrosCustos/edit'

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" element={<Login />} />
                
                {/* Configurações */}
                <Route path="/exercicios" element={<Exercicios />} />
                <Route path="/exercicios/criar" element={<ExerciciosCreate />} />
                <Route path="/exercicios/editar/:id" element={<ExerciciosEdit />} />

                <Route path="/centros_custos" element={<CentrosCustos />} />
                <Route path="/centros_custos/criar" element={<CentrosCustosCreate />} />
                <Route path="/centros_custos/editar/:id" element={<CentrosCustosEdit />} />

                <Route path="/programas_tipos" element={<ProgramasTipos />} />
                <Route path="/programas_tipos/criar" element={<ProgramasTiposCreate />} />
                <Route path="/programas_tipos/editar/:id" element={<ProgramasTiposEdit />} />
                
                <Route path="/fontes_tipos" element={<FontesTipos />} />
                <Route path="/fontes_tipos/criar" element={<FontesTiposCreate />} />
                <Route path="/fontes_tipos/editar/:id" element={<FontesTiposEdit />} />

                <Route path="/acoes_tipos" element={<AcoesTipos />} />
                <Route path="/acoes_tipos/criar" element={<AcoesTiposCreate />} />
                <Route path="/acoes_tipos/editar/:id" element={<AcoesTiposEdit />} />
                
                <Route path="/naturezas_despesas" element={<NaturezasDespesas />} />
                <Route path="/naturezas_despesas/criar" element={<NaturezasDespesasCreate />} />
                <Route path="/naturezas_despesas/editar/:id" element={<NaturezasDespesasEdit />} />
                
                <Route path="/instituicoes" element={<Instituicoes />} />
                <Route path="/instituicoes/editar/:id" element={<InstituicoesEdit />} />
                
                <Route path="/unidades_gestoras" element={<UnidadesGestoras />} />
                <Route path="/unidades_gestoras/criar" element={<UnidadesGestorasCreate />} />
                <Route path="/unidades_gestoras/editar/:id" element={<UnidadesGestorasEdit />} />
                
                <Route path="/unidades_administrativas" element={<UnidadesAdministrativas />} />
                <Route path="/unidades_administrativas/criar" element={<UnidadesAdministrativasCreate />} />
                <Route path="/unidades_administrativas/editar/:id" element={<UnidadesAdministrativasEdit />} />
                
                <Route path="/usuarios" element={<Usuarios />} />
                
                {/* Instituições */}
                <Route path="/matrizes_orcamentarias_instituicoes" element={<MatrizesOrcamentariasInstituicoes />} />
                <Route path="/fontes_instituicoes" element={<FontesInstituicoes />} />
                <Route path="/fontes_instituicoes/criar" element={<FontesInstituicoesCreate />} />
                <Route path="/acoes_instituicoes" element={<AcoesInstituicoes />} />
                <Route path="/acoes_instituicoes/criar" element={<AcoesInstituicoesCreate />} /><Route path="/fontes_acoes_instituicoes" element={<FontesAcoesInstituicoes />} />
                <Route path="/fontes_acoes_instituicoes/criar" element={<FontesAcoesInstituicoesCreate />} />
                
                {/* Gestoras */}
                <Route path="/matrizes_orcamentarias_gestoras" element={<MatrizesOrcamentariasGestoras />} />
                {/* <Route path="/fontes_gestoras" element={<FontesGestoras />} /> */}
                {/* <Route path="/acoes_gestoras" element={<AcoesGestoras />} /> */}

                {/* Administrativas */}
                <Route path="/matrizes_orcamentarias_administrativas" element={<MatrizesOrcamentariasAdministrativas />} />
                {/* <Route path="/fontes_administrativas" element={<FontesAdministrativas />} /> */}
                {/* <Route path="/acoes_administrativas" element={<AcoesAdministrativas />} /> */}

                <Route path="/relatorios" element={<Relatorios />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;