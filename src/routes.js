import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import Exercicios from './pages/Exercicios'
import Programas from './pages/Programas'
import Fontes from './pages/Fontes'
import Acoes from './pages/Acoes'
import NaturezasDespesas from './pages/NaturezasDespesas'
import Instituicoes from './pages/Instituicoes'
import UnidadesGestoras from './pages/UnidadesGestoras'
import UnidadesAdministrativas from './pages/UnidadesAdministrativas'
import Usuarios from './pages/Usuarios'

function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/exercicios" element={<Exercicios />} />
                <Route path="/programas" element={<Programas />} />
                <Route path="/fontes" element={<Fontes />} />
                <Route path="/acoes" element={<Acoes />} />
                <Route path="/naturezas_despesas" element={<NaturezasDespesas />} />
                <Route path="/instituicoes" element={<Instituicoes />} />
                <Route path="/unidades_gestoras" element={<UnidadesGestoras />} />
                <Route path="/unidades_administrativas" element={<UnidadesAdministrativas />} />
                <Route path="/usuarios" element={<Usuarios />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;