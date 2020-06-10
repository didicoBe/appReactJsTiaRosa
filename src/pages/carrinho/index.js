import React, { Component } from 'react';

import firebase from "../../firebase";




// material
import { withStyles } from '@material-ui/core/styles';
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
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

// material


//css
import './style.css'


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
        quantidade:'',
        total:'',
        abre : false,
        nome:'',
        obsevacao:''
    }



    componentDidMount(){

        const itens = localStorage.getItem('itensCarrinho')
        if(itens !== ''){
            const prod = JSON.parse(itens)
            this.setState(
                {
                    produtos:prod,
                    quantidade:localStorage.getItem('carrinho')
                }
            )
        }
        
        console.log(this.state)
        //JSON.parse()
        

        


       

    }

    calculartotal = ()=>{
        
        const valor = this.state.produtos;
        console.log(valor)
        if(valor !== null){
            const data = ()=> Array.from(valor)
            var total = 0;
            data().map(
                (doc)=>{
                    total = (total + parseFloat(doc.valor.replace(",",".")))
                   
                })
            
            return total;
        }
        
    }

    async removeqntFirebase(produto){
        //console.log(produto);
        const quantidade =  (parseInt(produto.quantidadeEstoque) - 1)
        //console.log(quantidade)
        const data = await firebase.firestore().collection('produtos').doc(produto.id).set({
            nome: produto.nome, 
            valor: produto.valor,
            descricao:produto.descricao,
            imagem: produto.imagem,
            categoria: produto.categoria,
            quantidadeEstoque: quantidade
             })
    }   

    removeIten(index){
        const data = this.state.produtos
        data.splice(index,1)
        this.setState({
            produtos:data
        })
        localStorage.setItem('itensCarrinho',JSON.stringify(data));


    }

    finalizar =()=>{
        this.setState({
            abre:true
        })
    }

    handleClose = () => {
        this.setState({
            abre:false
        })
    };

    infogerais = (event) =>{
        let nam = event.target.name;
        if (nam === 'nome') {
            this.setState({nome: event.target.value});
        }
        if (nam === 'observacao') {
            this.setState({obsevacao: event.target.value});
        }
    }

    finalizawhatsapp = ()=>{
        const nome  =  this.state.nome;
        const obs = this.state.obsevacao;
        const total = this.calculartotal();

        if(nome === ''){
            alert("Para enviarmos seu pedido é necessario colocar o seu nome.")
        }else{

            const data = this.state.produtos

            const itens = data.map((doc,i)=>{
                return(
                    (i+1)+'° - '+ doc.nome
                )
            })

            //montar texto whats
            const textomsg = `
                olá segue meu pedido:
                Nome : `+nome+`
                Observação :  `+obs+`
                Itens: `+itens+`
                Total:  R$`+ parseFloat(total).toFixed(2).replace(".",",")+`
            `;

            //diminui qnt no firebase
            data.map(
                (doc, i) =>{
                    this.removeqntFirebase(doc)
                }
            )



            //limpa storage carrinho
            localStorage.setItem('itensCarrinho','');


            // envia todos os dados por whatsapp
            const number = '5511982491715'
            const message = textomsg
            //
            this.handleClose()
            window.location.reload();
            window.open('https://api.whatsapp.com/send?phone=' + number + '&text=%20' + message, '_blank');
        }
        
    }





    render() {



        const { classes } = this.props;
        const valor = this.state.produtos;

        const data = ()=> Array.from(valor)
        const total = this.calculartotal()
        console.log(this.state)
        if (this.state.produtos === '' || this.state.produtos ===[]) {
            return(
                <Container className={'marginTopo marginbaixo' }>
                    <div className={'titulo'}>
                        Carrinho
                    </div>
                    <Divider className={classes.espaco} />
                    <Typography variant="button" className={classes.espaco}>
                        Seu carrinho está vazio
                    </Typography>
                        <img src='https://cdn.dribbble.com/users/2046015/screenshots/4591856/first_white_girl_drbl.gif' alt="carrinho vazio" className='imagem'/>
                </Container>
            )
        } else {
            return (
                <Container className={'marginTopo marginbaixo' }>
                    <div className={'titulo'}>
                        Carrinho
                    </div>
                    <Divider className={classes.espaco} />
                   
                    <Typography variant="h6" className={classes.espaco}>
                        Itens do Carrinho
                    </Typography>
                    <List dense className={classes.root}>
                    {
                        data().map(
                                (doc,indice)=>{
                                        console.log()
                                        return(
                                        <div key={indice}>
                                          
                                                <ListItem key={''} button >
                                                    <ListItemAvatar>
                                                        <Avatar
                                                            alt={`Avatar n°`}
                                                            src={doc.imagem}
                                                        />
                                                    </ListItemAvatar>
                                                    <ListItemText primary={doc.nome} />
                                                    <ListItemText primary={doc.valor} />
                                                    <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="delete" onClick={()=>this.removeIten(indice)}>
                                                        <ClearIcon/>
                                                    </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                        </div>
                                        )
                                    }
    
    
                                
                            )
                    }
                    </List>
                    <Divider className={classes.espaco} />
                    <Grid container spacing={3} className={classes.espaco}>
                        <Grid item xs={6}>
                            <Typography variant="overline" className={classes.espaco}>
                                Total 
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="button" className={classes.espaco}>
                                R$ {parseFloat(total).toFixed(2).replace(".",",")}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3} className={classes.espaco}>
                        <Grid item xs={12}>
                            <Button variant="contained" size="large" color="primary" className={classes.margin} onClick={this.finalizar}>
                                Finalizar
                            </Button>
                        </Grid>
                    </Grid>
    
    
    
                    <Dialog
                        open={this.state.abre}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Deseja Finalizar seu pedido ?"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                           Coloque seus dados para recebermos o seu pedido por whats!<br/><br/>
                           <form className={classes.root} noValidate autoComplete="off">
                                <TextField value={this.state.nome} name="nome" id="standard-basic" label="Nome" fullWidth onChange={this.infogerais} />
                                <br/>
                                <br/>
                                <TextField value={this.state.obsevacao} name="observacao" id="standard-basic" label="Observação" fullWidth onChange={this.infogerais} />
                            </form>
                            <br/><br/>
                            Total :  R$ {parseFloat(total).toFixed(2).replace(".",",")}
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} color="primary" variant="outlined">
                            cancelar
                        </Button>
                        <Button onClick={this.finalizawhatsapp} color="primary" variant="outlined" autoFocus>
                            Enviar pedido por Whats
                        </Button>
                        </DialogActions>
                    </Dialog>
    
                     
                </Container>
                
            );
        }




        
    }
}

export default withStyles(useStyles)(Carrinho);