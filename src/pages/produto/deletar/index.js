import React, { Component } from 'react';
import  Container  from "@material-ui/core/Container";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

//criar o Dialog
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
//fim modal

import firebase from '../../../firebase';

import './style.css';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

class Deletar extends Component {
    state ={
        produtos:'',
        setOpen:false,
        open:false,
        produtoUnico :{
            id:'',
            nome:'',
            valor: '',
            categora:'',
            quant:''
        }
    }

     pegaProdutosBase = async ()=>{
        //get
        const data = await firebase.firestore().collection('produtos').get();

        
        const result = (data.docs.map(doc =>({
            ...doc.data(),id:doc.id

        }
        )))
        this.setState({
            produtos:result
        })
        
        
    }


    componentDidMount(){
        this.pegaProdutosBase().then(()=>{
            //console.log(this.state)
        });
        
    }


    deletarProduto = async(id)=>{
        //delete 
        //in doc function put the id of the register
        await firebase.firestore().collection('produtos').doc(id).delete();
            
            this.setState({
                produtos:'',
                produtoUnico:{
                    id:'',
                    nome:'',
                    valor: '',
                    categora:'',
                    quant:''
                },
                open:false
            });
        
        this.pegaProdutosBase().then(()=>{
            //console.log(this.state)
        })
    }

  

    modalDeletar (index){
        const prod = this.state.produtos[index];

        this.setState({
            
            produtoUnico:{
                id:prod.id,
                nome:prod.nome,
                valor: prod.valor,
                categora:prod.categoria,
                quant:prod.quantidadeEstoque
            },
            open:true
            
        })

        console.log(prod)
    }

    handleClickOpen = () => {
        this.setState({
            open:true
        });
    };

    handleClose = () => {
        this.setState({
            open:false
        });
    };


    render() {
        const { classes } = this.props;

       
        let lista;
        if(this.state.produtos !== ''){
            lista = (
                    this.state.produtos.map((doc, index)=>(
                        <TableRow key={doc.id}>
                            <TableCell component="th" scope="row">{doc.categoria}</TableCell>
                            <TableCell align="right">{doc.nome}</TableCell>
                            <TableCell align="right">{doc.valor}</TableCell>
                            <TableCell align="right">{doc.quantidadeEstoque}</TableCell>
                            <TableCell align="right">
                                <IconButton aria-label="delete" onClick={(doc)=>this.modalDeletar(index)}>
                                    <DeleteIcon />
                                </IconButton>         
                            </TableCell>
                        </TableRow>
                    ))
            )
        }else{
            lista = (<></>)
        }
        return (
            
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogTitle id="alert-dialog-title">{"Deseja mesmo deletar esse produto?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Typography variant='subtitle1'>Com essa ação você ira remover o produto</Typography><br/><br/>
                        <div className={'modalTexto'}>Categoria</div>: {this.state.produtoUnico.categora}<br/>
                        <div className={'modalTexto'}>Nome</div> : {this.state.produtoUnico.nome}<br/>
                        <div className={'modalTexto'}>Valor</div> :{this.state.produtoUnico.valor}<br/>
                        <div className={'modalTexto'}>Quantidade</div> {this.state.produtoUnico.quant}<br/>

                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={()=>this.deletarProduto(this.state.produtoUnico.id)} color="primary" autoFocus>
                        Sim
                    </Button>
                    </DialogActions>
                </Dialog>


                 <Container className={'topo'}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Categoria</TableCell>
                                <TableCell align="center">Nome</TableCell>
                                <TableCell align="center">Valor</TableCell>
                                <TableCell align="center">Quant</TableCell>
                                <TableCell align="center">Deletar</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            { lista }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </div>
        );
    }
}

export default withStyles(useStyles)(Deletar);