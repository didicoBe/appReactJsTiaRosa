import React, { Component } from 'react';
import  Container  from "@material-ui/core/Container";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import  Cards  from "../../../components/variados/cards";

import './style.css';
import firebase from '../../../firebase'

const useStyles = makeStyles((theme)=> ({
    titulo:{
        fontWeight:'100',
        fontSize:100
    }
  }))

class Visualizar extends Component {
    state={
        categoria:'',
        produtos:''
    }


    componentDidMount(){
        const categoria = this.props.match.params.categoria;
        this.setState({
            categoria:categoria
        })
        this.pegaProdutosBase().then(()=>{
            console.log(this.state)
         });
    }

    pegaProdutosBase = async ()=>{
        const categoria = this.props.match.params.categoria;
        //get
        const data = await firebase.firestore().collection('produtos').where('categoria','==',categoria).get();

        
        const result = (data.docs.map(doc =>({
            ...doc.data(),id:doc.id

        }
        )))
        this.setState({
            produtos:result
        })
        
        
    }



    render() {
        const { classes } = this.props;
        const data = ()=> Array.from(this.state.produtos)
        return (
            <div>
               <Container className={'topo'}>
                        <div className={'titulo'}>
                            {this.state.categoria}
                        </div>
                        {data().map(
                            (doc)=>{

                                if (doc.quantidadeEstoque > 0) {
                                    return(
                                
                                        <div key={doc.id}>
                                        
                                            <Cards  
                                                avatar={doc.categoria.substring(0,1)}   
                                                titulo={doc.nome} 
                                                subtitulo={doc.categoria}
                                                conteudocartao={doc.descricao}
                                                titulodescricao="Titulo da descrição" 
                                                conteudodescricao="conteudo da descrição"
                                                id={doc.id} 
                                                quantidade={doc.quantidadeEstoque}
                                                img={doc.imagem}
                                                valor={'R$ '+doc.valor}
                                                ></Cards>
                                            
                                        </div>
                                        )
                                    
                    
                                }


                            }
                            
                        )}
                        
                </Container>
            </div>
        );
    }
}

export default withStyles(useStyles)(Visualizar);