import React, { Component } from 'react';
import firebase from '../../../firebase';

import  {Container, TextField}  from "@material-ui/core";


import './style.css';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });


class Estoque extends Component {
    state ={
        produtos:''
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
        await firebase.firestore().collection('produtos').doc(doc.id).set({
            nome:doc.nome, 
            valor:doc.valor,
            descricao:doc.descricao,
            imagem:doc.imagem,
            categoria:doc.categoria,
            quantidadeEstoque:doc.quantidadeEstoque
        }).then(()=>{
            this.pegaProdutosBase()
        });

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
                                <TableCell align="right">{doc.valor}</TableCell>
                                <TableCell align="right">
                                    <TextField
                                        required
                                        type="number"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="outlined"
                                        color="secondary"
                                        onChange={()=>(this.updateQuantidade(doc))}
                                        value={doc.quantidadeEstoque}
                                        className={'tamanho'}
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
                                <TableCell align="center">Nome</TableCell>
                                <TableCell align="center">Valor</TableCell>
                                <TableCell align="center">Quant</TableCell>
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

export default withStyles(useStyles)(Estoque);