import React, { Component } from 'react';
import firebase from '../../../firebase';

import  {Container, TextField,Button , Fab}  from "@material-ui/core";


import './style.css';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SaveIcon from '@material-ui/icons/Save';
import Switch from '@material-ui/core/Switch';


const useStyles = makeStyles((theme)=> ({
    table: {
      minWidth: 650,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      }
  }))


class Destaque extends Component {
    state ={
        produtos:'',
        
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
           console.log(this.state)
        });
        
    }

    
    updateQuantidade = async(doc)=>{
        // //update
        var dest = ''
        if(doc.destaque === '1'){
            dest = '0'
        }else{
            dest = '1'
        }
        // if(novaq !== ''){
                const data = await firebase.firestore().collection('produtos').doc(doc.id).set({
                nome: doc.nome, 
                valor: doc.valor,
                descricao:doc.descricao,
                imagem: doc.imagem,
                categoria: doc.categoria,
                quantidadeEstoque: doc.quantidadeEstoque,
                destaque:dest
             })
            

           
        //}
        
    }



    clickMudar = (doc)=>{
        this.updateQuantidade(doc).then(
            ()=>{
                this.pegaProdutosBase();
            }
        )
       
    }



    render() {
        const { classes } = this.props;
        let lista;
            if(this.state.produtos !== ''){
                lista = (
                        this.state.produtos.map((doc, index)=>(
                            <TableRow key={doc.id}>
                                <TableCell component="th" scope="row">{doc.categoria}</TableCell>
                                <TableCell align="right">{doc.nome}</TableCell>
                                <TableCell align="right">
                                    <Switch
                                        checked={doc.destaque === '1' ? true : false}
                                        required
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                        color="secondary"
                                        onChange={
                                            e=>{
                                                this.clickMudar(doc)
                                            }
                                        }
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                )
            }else{
                lista = (<></>)
            }
        return (
            <div>
                 <Container className={'topo'}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Categoria</TableCell>
                                <TableCell align="right">Nome</TableCell>
                                <TableCell align="center">Destaque</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            { lista }
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <br/>
                    
                </Container>
                
            </div>
        );
    }
}

export default withStyles(useStyles)(Destaque);