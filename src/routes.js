import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
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
import { UserProvider } from './contexts/UserProvider';
import { isAuthorized } from './helpers/permission';

const PrivateRoute = ({ component: Component, ...rest}) => (
    <Route 
        {...rest}
        render={props => isAuthorized()? ( <Component {...props} />) : (
            <Redirect to={{ pathname: "/", state: { from: props.location} }} />
        )}  
    />
);

function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" exact component={Login} />

                <UserProvider>
                    <PrivateRoute path="/exercicios" component={Exercicios} />
                    <PrivateRoute path="/programas" component={Programas} />
                    <PrivateRoute path="/fontes" component={Fontes} />
                    <PrivateRoute path="/acoes" component={Acoes} />
                    <PrivateRoute path="/naturezas_despesas" component={NaturezasDespesas} />
                    <PrivateRoute path="/instituicoes" component={Instituicoes} />
                    <PrivateRoute path="/unidades_gestoras" component={UnidadesGestoras} />
                    <PrivateRoute path="/unidades_administrativas" component={UnidadesAdministrativas} />
                    <PrivateRoute path="/usuarios" component={Usuarios} />
                </UserProvider>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;