import React, { Component } from 'react';
import  Container  from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';



import './style.css';




export default class Produto extends Component {
    
   
    
    componentDidMount(){
        console.log('aqui')
        // const {categoria} = this.props.match.params.id;
        
        // console.log(categoria)
        
    }

    

    

    render(){
        return(
            <div>
                <Container className={'topo'}>
                        aqui
                </Container>
            </div>
        )
    }
    
   
    
    
 
}