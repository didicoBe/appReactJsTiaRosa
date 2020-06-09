import React, { Component } from 'react';
import  Cards  from "../../components/variados/cards";
import  Container  from "@material-ui/core/Container";
import { ToastContainer, toast } from 'react-toastify';

import firebase from "../../firebase";
import './style.css'
import Calculardistancia from '../../calculardistancia'





class Home extends Component {

    state={
        produtos:'',
        userLat : '',
        userLon: ''
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

    Dist(lat1, lon1, lat2, lon2)
    {
        const rad = function(x) {return x*Math.PI/180;}

        var R     = 6378.137;                  //Raio da Terra no km (WGS84)
        var dLat  = rad( lat2 - lat1 );
        var dLong = rad( lon2 - lon1 );

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;

        return d.toFixed(2);                   //Retorno 3 casas decimais
    }

    componentDidMount(){
        var lat = '-23.5554093'
        var lon = '-46.7381878'
        navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude
                lon = position.coords.longitude
                localStorage.setItem('userlat',lat); 
                localStorage.setItem('userlon',lon); 
          })

          this.setState({
            userLat:localStorage.getItem('userlat'),
            userLon: localStorage.getItem('userlon'),
        })

        const distanciaKM = this.Dist(lat,lon,this.state.userLat, this.state.userLon)

        alert(distanciaKM)

        this.pegaProdutosBase()
        
    }



    addCarrinho= (id,doc)=>{
        var oldItems = ''

        const itenscarrinho  = localStorage.getItem('itensCarrinho')
        if(itenscarrinho !== ''){
            oldItems = JSON.parse(localStorage.getItem('itensCarrinho')) || [];
        }else{
            oldItems = localStorage.getItem('itensCarrinho') || [];
        }

        
  
        const newItem = doc;
  
        oldItems.push(newItem);  
  
  
          const valoratual = localStorage.getItem('carrinho')
          const novoValor = (parseInt(valoratual) + 1)
          localStorage.setItem('carrinho',novoValor); 
          localStorage.setItem('itensCarrinho',JSON.stringify(oldItems));
          this.setState({
            doc:doc
          })
          toast('Adicionado ao carrinho com sucesso :. ' + doc.nome, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            type:'success'
            });
            console.log(this.state)
            
        }




    render() {
        const data = ()=> Array.from(this.state.produtos)
        return (
            <div>
            <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  />
                  
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
                                        doc={doc}
                                        click={()=>this.addCarrinho(doc.id,doc)}
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

export default Home;