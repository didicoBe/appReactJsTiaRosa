import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

// import { Container } from './styles';

const useStyles = makeStyles((theme) => ({
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
    

  }));
  



  export default function Cards(props) {
    const classes = useStyles();
    
  
    return (
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.avatar}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" className={classes.font}>
              {props.valor}
            </IconButton>
          }
          title={<div className={classes.fontG}>{props.titulo}</div>}
          subheader={props.subtitulo}
          
        />
        <CardMedia
          className={classes.media}
          image={props.img}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.conteudocartao}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="visualizar">
                <AddShoppingCartIcon />           
          </IconButton>
          <IconButton 
              aria-label="Quantidade"
              className={clsx(classes.expand)}>
            <BubbleChartIcon />
            {props.quantidade}
          </IconButton>
        </CardActions>
      </Card>
    );
  }
  