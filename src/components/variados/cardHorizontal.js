import React, { Component } from 'react';

import Cards from "./cards";
import './style.css'
class Cardhorizontal extends Component {
    render() {
       
    return (
      <div className={'scrolling'}>
          <Cards className={'cartao'}/>
          <Cards className={'cartao'}/>
          <Cards className={'cartao'}/>
          <Cards className={'cartao'}/>
      </div>
    )
    }
}

export default Cardhorizontal;