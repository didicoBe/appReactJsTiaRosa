import React, { Component } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import Chip from '@material-ui/core/Chip';


import './style.css'

const useStyles = (theme) =>({
    root: {
      width: 600,
      
    },
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
      },
  });




class Footer extends Component {

    state={
        value:'',
        totalitens:localStorage.getItem('carrinho')
    }



    WhatsApp = ()=>{
        const number = '5511982491715'
        const message = 'text'
        //
        window.open('https://api.whatsapp.com/send?phone=' + number + '&text=%20' + message, '_blank');
        //return console.log('https://api.whatsapp.com/send?phone=' + number + '&text=%20' + message)
    }





    render() {
        const { classes } = this.props;
        return (
            <div className={'stickToBottom'}>
                <BottomNavigation
                value={this.state.value}
                onChange={(event, newValue) => {
                    this.setState({
                        value:newValue
                    });
                }}
                showLabels
                
                
                >
                    
                    <BottomNavigationAction 
                         
                        icon={
                            <ShoppingBasketIcon style={{fontSize:25, color:"#da9d9d"}}/>
                        }
                        label="Carrinho"
                        onClick={()=>(window.location.replace('/carrinho'))}
                        />
                    
                    <BottomNavigationAction label="Ligar" href="tel:+5511992638184"  icon={<PhoneAndroidIcon style={{fontSize:25, color:"#da9d9d"}}/>} />
                    <BottomNavigationAction label="Whatsapp"  icon={<WhatsAppIcon style={{fontSize:25, color:"#da9d9d"}}/>} onClick={this.WhatsApp} />
                </BottomNavigation>
            </div>
        );
    }
}

export default withStyles(useStyles)(Footer);