import React, { Component } from 'react';
import  {Container,TextField,Grid, Button,Typography  }  from "@material-ui/core";
import './style.css';
import firebase from '../../../firebase';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import BccAlert from '@bit/bcc.components.bcc-alert';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        flexGrow: 1,
      },
      control: {
        padding: theme.spacing(2),
      },
    },
  }));


class Criar extends Component {
    
    state ={
        categoria:'',
        nome: '',
        descricao: '',
        url: '',
        quantidadeEstoque: '',
        valor: '',
        alerta:false
    }



    async componentDidMount(){
        //get
        // const data = await firebase.firestore().collection('produtos').get();
        // console.log( 
        //     data.docs.map(doc =>({
        //         ...doc.data(),id:doc.id
        //     }))
        //     )


        //create
        // console.log(firebase.firestore().collection('produtos').add({
        //     categoria:'Tapioca',
        //     descricao:'aqui é a descroção',
        //     imagem:'aqui e a url da imagem',
        //     nome:'Tapioca presunto e queijo',
        //     quantidadeEstoque:'12',
        //     valor:'R$5,00'
        // }))
            // ('/produtos'));

        //delete 
        //in doc function put the id of the register
        // const data = await firebase.firestore().collection('produtos').doc('mozcOKxkbib93J72sCvr').delete();
        // console.log(data);



        // //update
        // const data = await firebase.firestore().collection('produtos').doc('90nPQEDpcEhy9IdsfCTg').set({
        //     nome:'Tapioca presunto e queijo', 
        //     valor:'R$15,00',
        //     descricao:'aqui é a descroção',
        //     imagem:'aqui e a url da imagem',
        //     nome:'Tapioca presunto e queijo',
        //     quantidadeEstoque:'12',});
        
    }

    AomudarValor = (event) => {
        let nam = event.target.id;
        if (nam === 'Categoria') {
            this.setState({categoria: event.target.value});
        }
        if (nam === 'Nome') {
            this.setState({nome: event.target.value});
        }
        if (nam === 'Descricao') {
            this.setState({descricao: event.target.value});
        }
        if (nam === 'Urlimagem') {
            this.setState({url: event.target.value});
        }
        if (nam === 'Quantidade') {
            this.setState({quantidadeEstoque: event.target.value});
        }
        if (nam === 'Valor') {
            this.setState({valor: event.target.value});
        }


        
    }


    Salvar= ()=>{
        console.log(this.state);

        //create
        const salva = firebase.firestore().collection('produtos').add({
            categoria: this.state.categoria,
            descricao: this.state.descricao,
            imagem: this.state.url,
            nome: this.state.nome,
            quantidadeEstoque: this.state.quantidadeEstoque,
            valor: this.state.valor
        })

       
        salva.then(
            ()=>{
                this.setState({
                alerta:true
                });
                this.LimpaAlertaedados()
            }
            
        ).catch(err => console.log(err));


    }

    Alerta = ()=>(
        <BccAlert severity="success" className={'marginAlert'}>
            Salvo com sucesso !
        </BccAlert>

    )

    LimpaAlertaedados = ()=>{
        setTimeout(() => {
            this.setState({
                categoria:'',
                nome: '',
                descricao: '',
                url: '',
                quantidadeEstoque: '',
                valor: '',
                alerta:false
            })
        },2000)
    }

       
                
       
        
    


    render() {
        const { classes } = this.props;
        return (
            <div>
                <Container className={ 'topo'} spacing={2}>
                <Typography >Cadastre seu produto</Typography>
                {this.state.alerta ? <this.Alerta /> : null}
                <form className={classes.root} noValidate autoComplete="off">
                    <div>
                       
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                
                                    <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Categorias"
                                    value={this.state.categoria}
                                    onChange={this.AomudarValor}
                                    variant="outlined"
                                    color="secondary"
                                    >
                                        <MenuItem value={'Tapioca'}>{'Tapioca'}</MenuItem>
                                        <MenuItem value={'Tapioca Doce'}>{'Tapioca Doce'}</MenuItem>
                                        <MenuItem value={'Lanche natural'}>{'Lanche natural'}</MenuItem>
                                        <MenuItem value={'Pão de batata'}>{'Pão de batata'}</MenuItem>
                                        <MenuItem value={'Enroladinho salgado'}>{'Enroladinho salgado'}</MenuItem>
                                        <MenuItem value={'bolachas'}>{'bolachas'}</MenuItem>
                                    
                                    </TextField>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="Nome"
                                    label="Nome"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={this.AomudarValor}
                                    value={this.state.nome}
                                />                                
                            </Grid>
                        </Grid>
                       
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                required
                                    id="Descricao"
                                    label="Descrição"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={this.AomudarValor}
                                    value={this.state.descricao}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="Urlimagem"
                                    label="Url da imagem"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={this.AomudarValor}
                                    value={this.state.url}
                                />                                        
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="Quantidade"
                                    label="Quantidade"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    color="secondary"
                                    onChange={this.AomudarValor}
                                    value={this.state.quantidadeEstoque}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    required
                                    id="Valor"
                                    label="Valor"
                                    variant="outlined"
                                    color="secondary"
                                    onChange={this.AomudarValor}
                                    value={this.state.valor}
                                />                                        
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12}> 
                                <Button variant="outlined" color="secondary" onClick={this.Salvar}>Salvar</Button>
                            </Grid>
                        </Grid>    
                    
                    </div>
                </form>
                </Container>
            </div>
        );
    }
}

export default withStyles(useStyles)(Criar);