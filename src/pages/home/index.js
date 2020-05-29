import React from 'react';
import  Cards  from "../../components/variados/cards";
import  Container  from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';




// import { Container } from './styles';

const useStyles = makeStyles((theme) => ({
    marginTopo:{
        marginTop:75
    }
}))


export default function Home (){
    const classes = useStyles();
    return(
        <div>
            
            <Container className={ classes.marginTopo}>
                <Cards  avatar="W"   
                        titulo="Teste" 
                        subtitulo="sub" 
                        conteudocartao="aqui vai o texto de baixo" 
                        titulodescricao="Titulo da descrição" 
                        conteudodescricao="conteudo da descrição"
                        id="13"></Cards>
                <Cards  avatar="JP"   
                        titulo="Teste2" 
                        subtitulo="sub2" 
                        conteudocartao="aqui vai o texto de baixo2" 
                        titulodescricao="Titulo da descrição2" 
                        conteudodescricao="conteudo da descrição2"
                        id="12"></Cards>
                <Cards></Cards>
                <Cards></Cards>
                <Cards></Cards>
                <Cards></Cards>
            </Container>
        </div>
    
    
  );
}
