import React, { Component } from 'react';
import  Container  from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import './style.css';
import firebase from '../../firebase';
import {Redirect} from 'react-router-dom';



class admin extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            email : '',
            status:true

        };
      }



    componentDidMount(){
        firebase.auth().onAuthStateChanged((user)=>{
            if (user) {
                this.setState({
                    email: user.email,
                    status:true
                });
            }
            else{
                this.setState({
                    email: '',
                    status:false
                });
               
            }    
            }) 
            
    }

    logout = () =>{
       const fire =  firebase.auth()
       console.log(fire)
       console.log(fire.signOut())
       
      
    }


    render() {

        if(this.state.status === false){
            return( <Redirect to="/"/>)
        }else{
            return (

                <div>
                   <Container className={ 'topo'}>
                        <div className={'titulo'}>
                            Painel Administrativo
                            <hr/>
                        </div>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Paper elevation={3} className={'papel'}>
                               
                                    <img src=' https://data.whicdn.com/images/327790700/original.gif' alt="carrinho vazio" className='imagem' style={{width:150}}/>
                                    <Typography variant="h5" gutterBottom className={'admintitulo'}>Bem vinda tia Rosa</Typography>
                                    <Typography variant="subtitle2" gutterBottom className={'adminsubtitulo'}>Aqui é onde você vai cadastrar, excluir e adicionar os estoques dos seus produtos</Typography>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Paper elevation={3} className={'papel'}>
                                    <div className={'espaco'}>Adicionar novo produto</div>
                                    <img src='https://i.pinimg.com/originals/e6/01/f5/e601f5d7b407e87baf850261614f77c3.gif' alt="carrinho vazio" className='imagem'/>
                                    <Button variant="outlined" size="large" className={'botaoSair'} >
                                        <a href={'/produto/criar'} className={'linka'}>
                                            adicionar
                                        </a>
                                    </Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper elevation={3} className={'papel'} style={ {backgroundColor : '#f8f3eb'}}>
                                    <div className={'espaco'}>Excluir produto</div>
                                    <img src='https://i.pinimg.com/originals/b2/a1/ac/b2a1acf76003ddc7f705cad056c010b8.gif' alt="carrinho vazio" className='imagem'/>
                                    <Button variant="outlined" size="large" className={'botaoSair'}>
                                        <a href={'/produto/deletar'} className={'linka'}>
                                            excluir
                                        </a>
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Paper elevation={3} className={'papel'} style={ {backgroundColor : '#f5f4e1'}}>
                                    <div className={'espaco'}>Estoque</div>
                                    <img src='https://i.pinimg.com/originals/e9/a9/2a/e9a92aee950d006e2d8ca88ad4f61edb.gif' alt="carrinho vazio" className='imagem'/>
                                    <Button variant="outlined" size="large" className={'botaoSair'}>
                                        <a href={'/produto/estoque'} className={'linka'}>
                                            visualizar
                                        </a>
                                    </Button>
                                    <div className={'marginbaixo'}></div>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper elevation={3} className={'papel'} style={ {backgroundColor : '#f5f4e1'}}>
                                    <div className={'espaco'}>Destaque</div>
                                    <img src='https://i.pinimg.com/originals/53/f1/2c/53f12ca26caf8ada3835a99da78f60c8.gif' alt="carrinho vazio" className='imagem'/>
                                    <Button variant="outlined" size="large" className={'botaoSair'}>
                                        <a href={'/produto/destaque'} className={'linka'}>
                                        visualizar
                                        </a>
                                    </Button>
                                    <div className={'marginbaixo'}></div>
                                </Paper>
                            </Grid>
                        </Grid>
                            
                        <div className={'margintopo'} >   
                            <Button variant="contained" fullWidth color="secondary" size="large" onClick={this.logout} className={'botaoSair'} >sair</Button>
                        </div>
                   </Container>
                </div>
            );
        }





        
    }
}

export default admin;