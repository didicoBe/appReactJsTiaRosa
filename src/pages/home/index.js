import React, { Component } from 'react';
import  Cards  from "../../components/variados/cards";
import  Container  from "@material-ui/core/Container";

import firebase from "../../firebase";
import './style.css'





class Home extends Component {

    state={
        produtos:''
    }


    pegaProdutosBase = async ()=>{
        //get
        const data = await firebase.firestore().collection('produtos').get();
    
        
        const result = (data.docs.map(doc =>({
            ...doc.data(),id:doc.id
            
        }
        )))
    
        return(
            
            this.setState({
                produtos:result
            })
            
        )

        
        
    }



    componentDidMount(){
        this.pegaProdutosBase()
        console.log(this.state)
    }







    render() {
        const data = ()=> Array.from(this.state.produtos)
        return (
            <Container className={'marginTopo marginbaixo' }>
                <div className={'titulo'}>
                    Faça seu Pedido
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
        );
    }
}

export default Home;