import React, { Component } from 'react';
import  Cards  from "../../components/variados/cards";
import  {Container,Typography}  from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import  CardHorizontal from "../../components/variados/cardHorizontal";

import firebase from "../../firebase";
import './style.css'





class Home extends Component {

    state={
        produtos:'',
        userLat : '',
        userLon: '',
        distancia : ''
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

    Dist(lat1, lon1, lat2, lon2, unit)
    {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist.toFixed(2);
        }               //Retorno 3 casas decimais
    }

    componentDidMount(){
        var lat = '-23.551326'
        var lon = '-46.740460'
        navigator.geolocation.getCurrentPosition(function(position) {
                lat = position.coords.latitude
                lon = position.coords.longitude
                localStorage.setItem('userlat',lat); 
                localStorage.setItem('userlon',lon); 
          })

          

        const distanciaKM = this.Dist(lat,lon,localStorage.getItem('userlat'),localStorage.getItem('userlon'),'K')
        this.setState({
            userLat:localStorage.getItem('userlat'),
            userLon: localStorage.getItem('userlon'),
            distancia: distanciaKM
        })

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
        const distancia = this.state.distancia;
        if (distancia > 15) {
            return(
                <div>
                    <Container className={'marginTopo marginbaixo' }>
                    <Typography variant="subtitle1" gutterBottom>
                        Infelizmente não conseguimos entregar na sua localização, Caso queira retirar entre em contato comigo pelo botão do whatsapp :)
                    </Typography>
                        <img src="https://cliply.co/wp-content/uploads/2019/03/371903340_LOCATION_MARKER_400.gif" alt={''} className={'centro'} />
                    </Container>
                </div>
            )
            
        }else{
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
                    
                    <CardHorizontal/>
                    
                    <div className={'tituloHome'}>
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
}

export default Home;