import React from 'react';
import  Container  from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';



// import { Container } from './styles';

const useStyles = makeStyles((theme) => ({
    marginTopo:{
        marginTop:75
    }
}))



export default class Produto {
    
    state ={
        product:{
            id:''
        }
    
    }
    
    componentDidMount(){
        const {id} = this.props.match.params;
        console.log(id)
        
    }

    

    

    render(){
        const {product} = this.state;
        const classes = useStyles()
        return(
            <div>
                <Container className={ classes.marginTopo}>
                       {product.id}
                </Container>
            </div>
        )
    }
    
   
    
    
 
}