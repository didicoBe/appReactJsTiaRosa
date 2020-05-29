import React, { Component } from 'react';
import  Container  from "@material-ui/core/Container";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import './style.css';
import firebase from '../../firebase';



export default class Login extends Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
      }

    state={
        email:'',
        senha:''
    }

    ChangeHandler = (event) => {
        let nam = event.target.name;
        if (nam === 'email') {
            this.setState({email: event.target.value});
        }
        if (nam === 'senha') {
            this.setState({senha: event.target.value});
        }
    }


    logar = ()=>{

        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.senha).then(user => {
            console.log(user)
        }).catch(
            erro => {
                console.log(erro)
            }
        )
    }


    render() {
       
        
        return (
            <div>
            <Container className={'marginTopo'}>
                <form className='' noValidate autoComplete="off">

                    <Grid container className='' spacing={4}>
                        <Grid item xs={12}>
                            <TextField 
                                    name="email" 
                                    label="Login" 
                                    onChange={this.ChangeHandler}  />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                    name="senha"
                                    label="Senha"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={this.ChangeHandler}
                                />
                        </Grid>
                        <Grid item xs={12}>
                            <Button onClick={this.logar.bind()}
                                variant="outlined"
                                className=''
                                endIcon={<Icon>send</Icon>}
                            >
                                Entrar
                            </Button>
                        </Grid>
                    </Grid>
                   
                </form>
            </Container>
        </div>
        );
    }
}
