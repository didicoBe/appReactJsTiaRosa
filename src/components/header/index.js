import React, { Component } from 'react';

import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton  from "@material-ui/core/IconButton/IconButton";
import Typography  from "@material-ui/core/Typography/Typography";
import Button  from "@material-ui/core/Button/Button";
import MenuIcon  from "@material-ui/icons/Menu";

import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';


import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


import firebase from '../../firebase';

import './style.css';


const  useStyles = theme => ({
    root: {
        flexGrow: 1,
      },
      menuButton: {
        marginRight: 2,
      },
      title: {
        flexGrow:2,
        
      },
      topcolor: {
          backgroundColor:'#ffff',
          boxShadow:'0 0 black',
          color:'#ecb2b2',
          height:70
         
          
      },
      list: {
          width: 250,
        },
      fullList: {
          width: 'auto',
      },
      titleMenu:{
          padding:20,
          fontSize:25,
          fontWeight:'300',
          color:'#ecb2b2',
          
          
      },
      link:{
        fontWeight:'300'
      },
      top:{
          marginTop: 10
      },
      primary:{
          fontSize:35,
          fontWeight:'200',
          color:'#c5837b',
          marginLeft: 20

      },
      ico:{
        fontSize:25,
        fontWeight:'200',
        color:'#c5837b',
      }

})





class Header extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            top: false,
            left: false,
            bottom: false,
            right: false,
            logado:false,
            texto:'Login',
            url:'/login',
            produtos:'' 
        }
      }
   


    Logado = ()=>{ 
               
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                // console.log(user);
                // console.log('logado');
                this.setState({
                    logado:true,
                    texto:"Admin",
                    url:'/admin'
                });
            }else{
                this.setState({
                    logado:false,
                    texto:"Login",
                    url:'/login'
                });
            }      
            }) 
            
           
    }


    pegaProdutosBase = async ()=>{
        //get
        const data = await firebase.firestore().collection('categorias').orderBy('nome').get();
    
        
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
         this.Logado();
         this.pegaProdutosBase() 
           
    }



    render() {

        const { classes } = this.props;
       
        const toggleDrawer = (anchor, open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
            }
    
            this.setState({ ...this.state, [anchor]: open });
        };


        
        const produtos = this.state.produtos

        const data = Array.from(this.state.produtos)
        //console.log(produtos);

    
        const list = (anchor) => (
            <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
            >
            <List>
                <Typography variant="h6" className={classes.titleMenu}>
                   Menu       
                </Typography>
                <a href={'/'}>
                    <ListItem button >
                        
                            <ListItemText primary={"Home"} className={ classes.primary} />
                        
                    </ListItem>
                </a> 
                
                <Typography variant="h6" className={classes.titleMenu}>
                    Categorias
                </Typography>
                
                {
                    data.map((text, index) => (
                        <a href={'/produto/visualizar/'+text.nome} key={index}>
                            <ListItem button >
                                    <ListItemIcon> <FavoriteBorderIcon className={ classes.ico} /></ListItemIcon>
                                    <ListItemText primary={text.nome} className={ classes.primary}/>
                            </ListItem>
                        </a>
                       
                    ))
                }
            </List>
            <Divider />
           
            </div>
        );



        

        return (
            <div>
                <div>
                
                    <Drawer anchor={'left'} open={this.state['left']} onClose={toggleDrawer('left', false)} >
                        {list('left')}
                    </Drawer>
                    
                    
                </div>
                <AppBar position="fixed" className={classes.topcolor}>
                    <Toolbar className={classes.top}>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                            <MenuOpenIcon  style={{fontSize:35}} />
                        </IconButton>
                        <Typography variant="h5" className={classes.title}>
                            <a href={`/`} className={classes.link}>
                                Rosa Doces
                            </a>
                        </Typography>
                        <Button color="inherit">

                            <a href={this.state.url} className={classes.link}>
                                {this.state.logado ?   <SettingsIcon style={{fontSize:35}} />: <AccountCircleIcon style={{fontSize:35}} />}
                            </a>
                        </Button> 
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    
}


Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(useStyles)(Header);