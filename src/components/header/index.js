import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppBar from "@material-ui/core/AppBar/AppBar";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import IconButton  from "@material-ui/core/IconButton/IconButton";
import Typography  from "@material-ui/core/Typography/Typography";
import Button  from "@material-ui/core/Button/Button";
import MenuIcon  from "@material-ui/icons/Menu";


import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import HomeIcon from '@material-ui/icons/Home';


import firebase from '../../firebase';

import './style.css';




// import { Container } from './styles';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow:2,
    },
    topcolor: {
        backgroundColor:'#f44336'
    },
    list: {
        width: 250,
      },
    fullList: {
    width: 'auto',
    },
    titleMenu:{
        padding:10,
        fontSize:16
    }
}));





export default function Header() {
   

    const Logado = ()=>(
        firebase.auth().onAuthStateChanged(function(user) {
            
            if (user) {
               
                return( 
                <Button color="inherit">
                    Logado
                </Button> 
            );
            } else {
                
                return( 
                <Button color="inherit">
                    <a href={`/login`} className={classes.link}>
                        Login
                    </a>
                </Button> 
                );
            }
            })
    )
    






    const classes = useStyles();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }

        setState({ ...state, [anchor]: open });
    };

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
            <ListItem button >
                <ListItemIcon> <HomeIcon/> </ListItemIcon>
                <ListItemText primary={"Home"} />
            </ListItem>
            <Divider />
            <Typography variant="h6" className={classes.titleMenu}>
                Produtos
            </Typography>
            <Divider />
            <ListItem button >
                <ListItemIcon> <RestaurantIcon /></ListItemIcon>
                <ListItemText primary={"Tapioca"} />
            </ListItem>
            <ListItem button >
                <ListItemIcon> <RestaurantIcon /></ListItemIcon>
                <ListItemText primary={" Tapioca Doce "} />
            </ListItem>
            <ListItem button >
                <ListItemIcon> <RestaurantIcon /></ListItemIcon>
                <ListItemText primary={" Lanche natural "} />
            </ListItem>
            <ListItem button >
                <ListItemIcon> <RestaurantIcon /></ListItemIcon>
                <ListItemText primary={" Pão de batata "} />
            </ListItem>
            <ListItem button >
                <ListItemIcon> <RestaurantIcon /></ListItemIcon>
                <ListItemText primary={" Enroladinho salgado "} />
            </ListItem>
            <ListItem button >
                <ListItemIcon> <RestaurantIcon /></ListItemIcon>
                <ListItemText primary={" Mantecal "} />
            </ListItem>
            <ListItem button >
                <ListItemIcon> <RestaurantIcon /></ListItemIcon>
                <ListItemText primary={" Goiabinha "} />
            </ListItem>

        </List>
        <Divider />
       
        </div>
    );



    
    return (
        
        <div>
            <div>
                
            <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
                
                
            </div>
            <AppBar position="fixed" className={classes.topcolor}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        <a href={`/`} className={classes.link}>
                            Tia Rosa Salgados
                        </a>
                    </Typography>
                    <Logado/>
                </Toolbar>
            </AppBar>
        </div>
    );
}
