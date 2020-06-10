import React, { useState } from 'react';
import './App.css';
import  Header  from "./components/header/index";
import Footer from './components/footer/'
import Routes from "./routes";
import Loading from "./pages/loading";










function App() {

  const [pronto, setPronto] = useState(false);

  console.log(localStorage.getItem('loading'))
  if (pronto === false && localStorage.getItem('loading') !== 'true') {
    setTimeout(() => {
      setPronto(true);
      localStorage.setItem('loading', 'true')
    }, 5000);
    return(
      <div className="App">
        <Loading/>
      </div>
      
    )
  }else{
        return (    
          <div className="App">
            <Header/>
            <Routes/>
            <Footer/>
          </div>
    );
  }
  
}

export default App;
