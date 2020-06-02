import React, { Component } from 'react';
import  Container  from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
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
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Paper elevation={3} className={'papel'}>
                                    <div>Você esta logado como:</div>
                                    <p>{this.state.email}</p>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Paper elevation={3} className={'papel'}>
                                    <div className={'espaco'}>Adicionar novo produto</div>
                                    <Button variant="outlined" size="large" color="primary" >
                                        <a href={'/produto/criar'} className={'linka'}>
                                            adicionar
                                        </a>
                                    </Button>
                                </Paper>
                            </Grid>
                            <Grid item xs={6}>
                                <Paper elevation={3} className={'papel'}>
                                    <div className={'espaco'}>Excluir produto</div>
                                    <Button variant="outlined" size="large" color="primary">
                                        <a href={'/produto/deletar'} className={'linka'}>
                                            excluir
                                        </a>
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Paper elevation={3} className={'papel'}>
                                    <div className={'espaco'}>Estoque</div>
                                    <Button variant="outlined" size="large" color="primary">
                                        <a href={'/produto/estoque'} className={'linka'}>
                                            visualizar
                                        </a>
                                    </Button>
                                    <div className={'marginbaixo'}></div>
                                </Paper>
                            </Grid>
                        </Grid>
                            
                        <div className={'margintopo'} >   
                            <Button variant="contained" color="secondary" size="large" onClick={this.logout} >sair</Button>
                        </div>
                   </Container>
                </div>
            );
        }





        
    }
}

export default admin;