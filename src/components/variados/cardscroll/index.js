import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Typography from "@material-ui/core/Typography";

import './style.css'

class Cardscroll extends Component {
    render() {
        return (
            <div>
                <Card className={'geral'}>
                    <CardActionArea>
                        <CardMedia
                        className={'cardscrollimg'}
                        image={this.props.img}
                        title="Contemplative Reptile"
                        />
                       
                    </CardActionArea>
                    <CardActions disableSpacing className={'espaco'}>

                        <IconButton aria-label="visualizar"
                                onClick={this.props.click}
                                >
                                <AddShoppingCartIcon style={{ color:'#da9d9d' }}/>           
                        </IconButton>
                        <Typography variant="subtitle2" gutterBottom style={{ fontWeight: 400, color:'#da9d9d', marginTop:15}}>
                           {this.props.nome}
                        </Typography>
                        <IconButton aria-label="Quantidade" >
                            <div style={{ fontWeight: 400, color:'#da9d9d', fontSize:12, marginTop:10}}>R${this.props.valor}</div>
                      </IconButton>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Cardscroll;