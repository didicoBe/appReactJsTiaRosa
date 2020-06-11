import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';

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
      console.log(result)

      return(
          this.setState({
              produtos:result
          })
         
      )
    }



    componentDidMount(){
      this.pegaProdutosBase();
      
      
    }



    // Menu = () =>{
    //   const data = ()=> Array.from(this.state.produtos)
    //    const resp = data().map(
    //       (doc)=>{
    //           if (doc.quantidadeEstoque > 0) {
    //             return (
    //               [
    //               <div key={1} className={'cartao'}>
    //                       <Cardscroll />
    //                   </div>,
    //               <div key={2} className={'cartao'}>
    //                       <Cardscroll />
    //                   </div>,
    //               <div key={3} className={'cartao'}>
    //                       <Cardscroll />
    //                   </div>,
    //               <div key={4} className={'cartao'}>
    //                       <Cardscroll />
    //               </div>
    //               ]
    //           )
    //           }
    //       }
    //   )
        
      
    // }

    Menu = () =>{
      return(
        [
                        <div key={1} className={'cartao'}>
                                <Cardscroll />
                            </div>,
                        <div key={2} className={'cartao'}>
                                <Cardscroll />
                            </div>,
                        <div key={3} className={'cartao'}>
                                <Cardscroll />
                            </div>,
                        <div key={4} className={'cartao'}>
                                <Cardscroll />
                        </div>
                        ]
      )
    }


  
    render() {
      // Create menu from items
      

      if (this.state.produtos.length > 0) {
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