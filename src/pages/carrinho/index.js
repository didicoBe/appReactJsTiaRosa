import React, { Component } from 'react';

// material
import { makeStyles,withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import  Container  from "@material-ui/core/Container";
import ClearIcon from '@material-ui/icons/Clear';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
// material


const useStyles = (theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    espaco:{
        marginTop:20
    }
  });



class Carrinho extends Component {


    state={
        produtos:'',
        quantidade:''
    }



    componentDidMount(){


        const prod = JSON.parse(localStorage.getItem('itensCarrinho'))

        //JSON.parse()

        this.setState(
            {
                produtos:prod,
                quantidade:localStorage.getItem('carrinho')
            }
        )

    }


    render() {
        const { classes } = this.props;
        const valor = this.state.produtos;

        const data = ()=> Array.from(valor)
        

        return (
            <Container className={'marginTopo marginbaixo' }>
                <div className={'titulo'}>
                    Carrinho
                </div>
                <Divider className={classes.espaco} />
                <List dense className={classes.root}>
                {
                    data().map(
                            (doc,indice)=>{
                                console.log(doc.imagem);
                                if (doc =! '') {
                                    return(
                                    <div key={indice}>
                                        <ListItem key={''} button>
                                            <ListItemAvatar>
                                            <Avatar
                                                alt={`Avatar n°`}
                                                src={doc.imagem}
                                            />
                                            </ListItemAvatar>
                                            <ListItemText id={''} primary={doc.nome} />
                                            <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete">
                                                <ClearIcon/>
                                            </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        
                                    </div>
                                    )
                                }


                            }
                        )
                }
                </List>
            </Container>
            
        );
    }
}

export default withStyles(useStyles)(Carrinho);