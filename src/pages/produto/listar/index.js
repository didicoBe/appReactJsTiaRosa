import React, { Component } from 'react';
import  Container  from "@material-ui/core/Container";
import './style.css'
import firebase from "../../../firebase";

class ListarProd extends Component {

    componentDidMount(){
        firebase.database.list('/produtos');
    }




    render() {
        return (
            <div>
                 <Container className={ 'topo'}>
                     lista
                 </Container>
            </div>
        );
    }
}

export default ListarProd;