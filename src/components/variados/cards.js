import React, { Component } from 'react';
import { makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const useStyles = (theme) => ({
    root: {
        marginTop: 20
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    link:{
        all:"unset"
    },
    font:{
      fontSize:16
    },
    fontG:{
      fontSize:25
    }
    

  });

  

class Cards extends Component {

  state={
    doc:''
  }

    addCarrinho= (id,doc)=>{
       
      const oldItems = JSON.parse(localStorage.getItem('itensCarrinho')) || [];

      const newItem = doc;

      oldItems.push(newItem);  







        const valoratual = localStorage.getItem('carrinho')
        const novoValor = (parseInt(valoratual) + 1)
        localStorage.setItem('carrinho',novoValor); 
        localStorage.setItem('itensCarrinho',JSON.stringify(oldItems));
        this.setState({
          doc:doc
        })
        toast('Adicionado ao carrinho com sucesso :. ' + doc.nome, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          type:'success'
          });
          console.log(localStorage.getItem('carrinho'))
          console.log(JSON.parse(localStorage.getItem('itensCarrinho')))
      }








    render() {


      const { classes } = this.props;
      

        return (
            <div>
                <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  />
                  {/* Same as */}
                  <ToastContainer />
                <Card className={classes.root}>
                    <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                        {this.props.avatar}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings" className={classes.font}>
                        {this.props.valor}
                        </IconButton>
                    }
                    title={<div className={classes.fontG}>{this.props.titulo}</div>}
                    subheader={this.props.subtitulo}
                    
                    />
                    <CardMedia
                    className={classes.media}
                    image={this.props.img}
                    title="Paella dish"
                    />

                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                          {this.props.conteudocartao}
                      </Typography>
                    </CardContent>

                    <CardActions disableSpacing>


                      <IconButton aria-label="visualizar"
                              onClick={()=>this.addCarrinho(this.props.id,this.props.doc)}>
                              <AddShoppingCartIcon />           
                      </IconButton>

                      <IconButton 
                          aria-label="Quantidade"
                          className={clsx(classes.expand)}>
                          <BubbleChartIcon />
                          {this.props.quantidade}
                      </IconButton>

                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(useStyles)(Cards);