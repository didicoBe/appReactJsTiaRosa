import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./pages/home";
import Visualizar from "./pages/produto/visualizar";
import Login from "./pages/login";
import Admin from './pages/admin';
import Criar from "./pages/produto/criar";
import Deletar from "./pages/produto/deletar";
import Estoque from "./pages/produto/estoque";
import Carrinho from "./pages/carrinho";
import Destaque from "./pages/produto/destaques";


const Routes = ()=>(
    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/produto/visualizar/:categoria" component={Visualizar}></Route>
                <Route exact path="/login" component={Login}></Route>
                <Route exact path="/admin" component={Admin}></Route>
                <Route exact path="/produto/criar" component={Criar}></Route>
                <Route exact path="/produto/deletar" component={Deletar}></Route>
                <Route exact path="/produto/estoque" component={Estoque}></Route>
                <Route exact path="/produto/destaque" component={Destaque}></Route>
                <Route exact path="/carrinho" component={Carrinho}></Route>
            </Switch>
        </BrowserRouter>
    </div>
    
)

export default Routes;