import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

class CaixaFinaliza extends Component {

    state = {
        abre : false
    }



    handleClickOpen = () => {
       this.setState({
           abre:true
        });
    };
    
    handleClose = () => {
        this.setState({
            abre:false
         });
    };





    render() {
        return (
            <div>
                <Dialog
                    open={this.props.abre}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Let Google help apps determine location. This means sending anonymous location data to
                        Google, even when no apps are running.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Agree
                    </Button>
                    </DialogActions>
                </Dialog>
                
            </div>
        );
    }
}

export default CaixaFinaliza;
