import React from 'react';
import  Cards  from "../../components/variados/cards";
import  Container  from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';


import firebase from "../../firebase";


// import { Container } from './styles';

const useStyles = makeStyles((theme) => ({
    marginTopo:{
        marginTop:75
    }
}))





export default function Home (){

    
    const [state, setState] = React.useState({
        produtos:''
    });

    const pegaProdutosBase = async ()=>{
        //get
        const data = await firebase.firestore().collection('produtos').get();
    
        
        const result = (data.docs.map(doc =>({
            ...doc.data(),id:doc.id
            
        }
        )))
    
        return(
            
            setState({
                produtos:result
            })
            
        )

        
        
    }
    pegaProdutosBase();
    const classes = useStyles();

    const data = Array.from(state.produtos)
// categoria
// descricao
// imagem
// nome
// quantidadeEstoque
// valor

    return(
        <div>
            
            <Container className={ classes.marginTopo}>
                {data.map(
                    (doc)=>
                        (
                        <div key={doc.id}>
                        
                            <Cards  
                                avatar={doc.categoria}   
                                titulo={doc.nome} 
                                subtitulo={doc.categoria}
                                conteudocartao={doc.descricao}
                                titulodescricao="Titulo da descrição" 
                                conteudodescricao="conteudo da descrição"
                                id={doc.id} 
                                img={doc.imagem}
                                ></Cards>
                            
                        </div>
                        )
                    

                )}
                
                
            </Container>
        </div>
    
    
  );
}
