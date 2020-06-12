import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import { ToastContainer, toast } from 'react-toastify';

import Cardscroll from "./cardscroll";
import './style.css'

import firebase from "../../firebase";

  
  class Cardhorizontal extends Component {
    
    state = {
      produtos:[]
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
      this.pegaProdutosBase();
      
      
    }

    


    Menu = () =>{
      const data = ()=> Array.from(this.state.produtos)
      const resp = []
      const aqui = data().map(
          (doc,i)=>{
              if (doc.destaque === '1') {
                console.log(doc)
                return (
                  resp.push(
                    <div key={i} className={'cartao'}>
                          <Cardscroll 
                              img={doc.imagem} 
                              nome={doc.nome} 
                              valor={' ' + doc.valor} 
                              click={()=>this.addCarrinho(doc.id,doc)} 
                          />
                    </div>
                  )
                )
              }
          }
      )
      
      return resp
        
      
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
      // Create menu from items
      
      
      if (this.state.produtos.length > 0) {
        console.log(this.Menu())
        this.menuItems = this.Menu();
        const menu = this.menuItems;
        return (
          <div className="App">
            <ScrollMenu
              data={menu}
              selected={false}
              onSelect={false}
              useButtonRole={false}
            />
          </div>
        );
      }else{
        return(<div></div>)
      }
    }
  }

export default Cardhorizontal;