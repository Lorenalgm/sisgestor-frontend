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
import Dimensoes from './pages/Dimensoes'
import DimensoesCreate from './pages/Dimensoes/create'
import DimensoesEdit from './pages/Dimensoes/edit'
import Objetivos from './pages/Objetivos'
import ObjetivosCreate from './pages/Objetivos/create'
import ObjetivosEdit from './pages/Objetivos/edit'
import Metas from './pages/Metas'
import MetasCreate from './pages/Metas/create'
import MetasEdit from './pages/Metas/edit'
import AcoesTipos from './pages/AcoesTipos'
import AcoesTiposCreate from './pages/AcoesTipos/create'
import AcoesTiposEdit from './pages/AcoesTipos/edit'
import NaturezasDespesas from './pages/NaturezasDespesas'
import NaturezasDespesasCreate from './pages/NaturezasDespesas/create'
import NaturezasDespesasEdit from './pages/NaturezasDespesas/edit'
import Instituicoes from './pages/Instituicoes'
import InstituicoesEdit from './pages/Instituicoes/edit'
import Movimentos from './pages/Movimentos'
import MovimentosCreate from './pages/Movimentos/create'
import MovimentosEdit from './pages/Movimentos/edit'
import Despesas from './pages/Despesas'
import DespesasCreate from './pages/Despesas/create'
import DespesasEdit from './pages/Despesas/edit'
import LimitesOrcamentarios from './pages/LimitesOrcamentarios'
// import LimitesOrcamentariosEdit from './pages/LimitesOrcamentarios/edit'
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
import RelatoriosGestoras from './pages/RelatoriosGestoras'
import RelatoriosAdministrativas from './pages/RelatoriosAdministrativas'
import CentrosCustos from './pages/CentrosCustos'
import CentrosCustosCreate from './pages/CentrosCustos/create'
import CentrosCustosEdit from './pages/CentrosCustos/edit'
import AcoesAdministrativas from './pages/AcoesAdministrativas';

import CreditosPlanejadosAdministrativas from './pages/CreditosPlanejadosAdministrativas'
import CreditosPlanejadosAdministrativasCreate from './pages/CreditosPlanejadosAdministrativas/create';
import CreditosPlanejadosAdministrativasEdit from './pages/CreditosPlanejadosAdministrativas/edit';

import CreditosPlanejadosGestoras from './pages/CreditosPlanejadosGestoras'
import CreditosPlanejadosGestorasEdit from './pages/CreditosPlanejadosGestoras/edit';

import CreditosDisponiveisAdministrativas from './pages/CreditosDisponiveisAdministrativas'
import CreditosDisponiveisAdministrativasCreate from './pages/CreditosDisponiveisAdministrativas/create';
import CreditosDisponiveisAdministrativasEdit from './pages/CreditosDisponiveisAdministrativas/edit';


import CreditosDisponiveisGestoras from './pages/CreditosDisponiveisGestoras'
import CreditosDisponiveisGestorasEdit from './pages/CreditosDisponiveisGestoras/edit';


import Empenhar from './pages/Empenhar'
import EmpenharCreate from './pages/Empenhar/create';
import EmpenharEdit from './pages/Empenhar/edit';

import MetasOrcamentarias from './pages/MetasOrcamentarias'
import MetasOrcamentariasCreate from './pages/MetasOrcamentarias/create';
import MetasOrcamentariasEdit from './pages/MetasOrcamentarias/edit';

import LimitesOrcamentariosGestoras from './pages/LimitesOrcamentariosGestoras'
import LimitesOrcamentariosGestorasCreate from './pages/LimitesOrcamentariosGestoras/create'
import LimitesOrcamentariosGestorasEdit from './pages/LimitesOrcamentariosGestoras/edit'

import AcoesGestoras from './pages/AcoesGestoras';

import FontesAcoesGestoras from './pages/FontesAcoesGestoras'
import FontesAcoesGestorasCreate from './pages/FontesAcoesGestoras/create'

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" element={<Login />} />
                
                {/* Configura????es */}
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
                
                {/* Institui????es */}
                <Route path="/matrizes_orcamentarias_instituicoes" element={<MatrizesOrcamentariasInstituicoes />} />
                <Route path="/fontes_instituicoes" element={<FontesInstituicoes />} />
                <Route path="/fontes_instituicoes/criar" element={<FontesInstituicoesCreate />} />
                <Route path="/acoes_instituicoes" element={<AcoesInstituicoes />} />
                <Route path="/acoes_instituicoes/criar" element={<AcoesInstituicoesCreate />} />
                <Route path="/fontes_acoes_instituicoes" element={<FontesAcoesInstituicoes />} />
                <Route path="/fontes_acoes_instituicoes/criar" element={<FontesAcoesInstituicoesCreate />} />
                <Route path="/movimentos" element={<Movimentos />} />
                <Route path="/movimentos/criar" element={<MovimentosCreate />} />
                <Route path="/movimentos/editar/:id" element={<MovimentosEdit />} />
                <Route path="/limites_orcamentarios" element={<LimitesOrcamentarios />} />
                {/* <Route path="/limites_orcamentarios/editar/:id" element={<LimitesOrcamentariosEdit />} /> */}
                
                {/* Gestoras */}
                <Route path="/matrizes_orcamentarias_gestoras" element={<MatrizesOrcamentariasGestoras />} />
                {/* <Route path="/fontes_gestoras" element={<FontesGestoras />} /> */}
                <Route path="/acoes_gestoras" element={<AcoesGestoras />} />

                <Route path="/metas_orcamentarias" element={<MetasOrcamentarias />} />
                <Route path="/metas_orcamentarias/criar" element={<MetasOrcamentariasCreate />} />
                <Route path="/metas_orcamentarias/editar/:id" element={<MetasOrcamentariasEdit />} />

                <Route path="/creditos_planejados_gestoras" element={<CreditosPlanejadosGestoras />} />
                <Route path="/creditos_planejados_gestoras/editar/:id" element={<CreditosPlanejadosGestorasEdit />} />
                <Route path="/creditos_disponiveis_gestoras" element={<CreditosDisponiveisGestoras />} />
                <Route path="/creditos_disponiveis_gestoras/editar/:id" element={<CreditosDisponiveisGestorasEdit />} />

                <Route path="/limites_orcamentarios_gestoras" element={<LimitesOrcamentariosGestoras />} />
                <Route path="/limites_orcamentarios_gestoras/criar" element={<LimitesOrcamentariosGestorasCreate />} />
                <Route path="/limites_orcamentarios_gestoras/editar/:id" element={<LimitesOrcamentariosGestorasEdit />} />

                <Route path="/fontes_acoes_gestoras" element={<FontesAcoesGestoras />} />
                <Route path="/fontes_acoes_gestoras/criar" element={<FontesAcoesGestorasCreate />} />

                {/* Administrativas */}
                <Route path="/matrizes_orcamentarias_administrativas" element={<MatrizesOrcamentariasAdministrativas />} />
                {/* <Route path="/fontes_administrativas" element={<FontesAdministrativas />} /> */}
                <Route path="/acoes_administrativas" element={<AcoesAdministrativas />} />
                <Route path="/despesas" element={<Despesas />} />
                <Route path="/despesas/criar" element={<DespesasCreate />} />
                <Route path="/despesas/editar/:id" element={<DespesasEdit />} />
                <Route path="/creditos_planejados_administrativas" element={<CreditosPlanejadosAdministrativas />} />
                <Route path="/creditos_planejados_administrativas/criar" element={<CreditosPlanejadosAdministrativasCreate />} />
                <Route path="/creditos_planejados_administrativas/editar/:id" element={<CreditosPlanejadosAdministrativasEdit />} />
                <Route path="/creditos_disponiveis_administrativas" element={<CreditosDisponiveisAdministrativas />} />
                <Route path="/creditos_disponiveis_administrativas/criar" element={<CreditosDisponiveisAdministrativasCreate />} />
                <Route path="/creditos_disponiveis_administrativas/editar/:id" element={<CreditosDisponiveisAdministrativasEdit />} />
                <Route path="/empenhar" element={<Empenhar />} />
                <Route path="/empenhar/criar" element={<EmpenharCreate />} />
                <Route path="/empenhar/editar/:id" element={<EmpenharEdit />} />

                <Route path="/relatorios" element={<Relatorios />} />
                <Route path="/relatorios_gestoras" element={<RelatoriosGestoras />} />
                <Route path="/relatorios_administrativas" element={<RelatoriosAdministrativas />} />

                <Route path="/dimensoes" element={<Dimensoes />} />
                <Route path="/dimensoes/criar" element={<DimensoesCreate />} />
                <Route path="/dimensoes/editar/:id" element={<DimensoesEdit />} />

                <Route path="/objetivos" element={<Objetivos />} />
                <Route path="/objetivos/criar" element={<ObjetivosCreate />} />
                <Route path="/objetivos/editar/:id" element={<ObjetivosEdit />} />

                <Route path="/metas" element={<Metas />} />
                <Route path="/metas/criar" element={<MetasCreate />} />
                <Route path="/metas/editar/:id" element={<MetasEdit />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;