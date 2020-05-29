import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from "./pages/home";
import Produto from "./pages/produto";
import Login from "./pages/login";


const Routes = ()=>(
    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route exact path="/produtos:id" component={Produto}></Route>
                <Route exact path="/login" component={Login}></Route>
            </Switch>
        </BrowserRouter>
    </div>
    
)

export default Routes;