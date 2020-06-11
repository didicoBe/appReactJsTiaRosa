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
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";


const useStyles = (theme) => ({
    root: {
        marginTop: 20,
        with:300
    },
    media: {
      height: 300,
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

    








    render() {


      const { classes } = this.props;
      

        return (
            <div>
                
                <Card className={'geral'}>
                    <CardMedia
                    className={classes.media}
                    image={this.props.img}
                    title="Paella dish"
                    />

                    <CardActions disableSpacing className={'espaco'}>


                      <IconButton aria-label="visualizar"
                              onClick={this.props.click} style={{marginTop:15}}>
                              <AddShoppingCartIcon style={{ color:'#da9d9d',fontSize:30 }}/>           
                      </IconButton>


                      <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 400, color:'#da9d9d', marginTop:15}}>
                        <div style={{ fontWeight: 600, color:'#c5837b', fontSize:15, marginTop:10}}>{this.props.subtitulo}</div>
                        
                        <div style={{ fontWeight: 300, color:'#c5837b', fontSize:15, marginTop:10}}>{this.props.titulo}</div>

                      </Typography>


                      <IconButton>
                        <div style={{ fontWeight: 600, color:'#da9d9d', fontSize:15, marginTop:10}}> {this.props.valor} </div>
                      </IconButton>

                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withStyles(useStyles)(Cards);