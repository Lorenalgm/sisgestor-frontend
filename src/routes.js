import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Exercicios from './pages/Exercicios'
import ExerciciosCreate from './pages/Exercicios/create'
import ExerciciosEdit from './pages/Exercicios/edit'
import ProgramasTipos from './pages/ProgramasTipos'
import ProgramasTiposCreate from './pages/ProgramasTipos/create'
import Fontes from './pages/Fontes'
import Acoes from './pages/Acoes'
import NaturezasDespesas from './pages/NaturezasDespesas'
// import NaturezasDespesasCreate from './pages/NaturezasDespesas/create'
import Instituicoes from './pages/Instituicoes'
import UnidadesGestoras from './pages/UnidadesGestoras'
import UnidadesAdministrativas from './pages/UnidadesAdministrativas'
import MatrizesOrcamentariasInstituicoes from './pages/MatrizesOrcamentariasInstituicoes'
import MatrizesOrcamentariasGestoras from './pages/MatrizesOrcamentariasGestoras'
import MatrizesOrcamentariasAdministrativas from './pages/MatrizesOrcamentariasAdministrativas'
import FontesInstituicoes from './pages/FontesInstituicoes'
import AcoesInstituicoes from './pages/AcoesInstituicoes'
import Usuarios from './pages/Usuarios'

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

                <Route path="/programas_tipos" element={<ProgramasTipos />} />
                <Route path="/programas_tipos/criar" element={<ProgramasTiposCreate />} />
                
                <Route path="/fontes" element={<Fontes />} />
                {/* <Route path="/fontes/create" element={<FontesCreate />} /> */}

                <Route path="/acoes" element={<Acoes />} />
                {/* <Route path="/acoes/create" element={<AcoesCreate />} /> */}
                
                <Route path="/naturezas_despesas" element={<NaturezasDespesas />} />
                {/* <Route path="/naturezas_despesas/create" element={<NaturezasDespesasCreate />} /> */}
                
                <Route path="/instituicoes" element={<Instituicoes />} />
                
                <Route path="/unidades_gestoras" element={<UnidadesGestoras />} />
                {/* <Route path="/unidades_gestoras/create" element={<UnidadesGestorasCreate />} /> */}
                
                <Route path="/unidades_administrativas" element={<UnidadesAdministrativas />} />
                {/* <Route path="/unidades_administrativas/create" element={<UnidadesAdministrativasCreate />} /> */}
                
                <Route path="/usuarios" element={<Usuarios />} />
                
                {/* Instituições */}
                <Route path="/matrizes_orcamentarias_instituicoes" element={<MatrizesOrcamentariasInstituicoes />} />
                <Route path="/fontes_instituicoes" element={<FontesInstituicoes />} />
                <Route path="/acoes_instituicoes" element={<AcoesInstituicoes />} />
                
                {/* Gestoras */}
                <Route path="/matrizes_orcamentarias_gestoras" element={<MatrizesOrcamentariasGestoras />} />
                {/* <Route path="/fontes_gestoras" element={<FontesGestoras />} /> */}
                {/* <Route path="/acoes_gestoras" element={<AcoesGestoras />} /> */}

                {/* Administrativas */}
                <Route path="/matrizes_orcamentarias_administrativas" element={<MatrizesOrcamentariasAdministrativas />} />
                {/* <Route path="/fontes_administrativas" element={<FontesAdministrativas />} /> */}
                {/* <Route path="/acoes_administrativas" element={<AcoesAdministrativas />} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default App;