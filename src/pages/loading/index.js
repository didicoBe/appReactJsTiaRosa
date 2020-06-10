import React, { Component } from 'react';
import  {Container,Typography}  from "@material-ui/core";

class Loading extends Component {
    render() {
        return (
            <div>
                    <Container className={'marginTopo marginbaixo' }>
                        <img src="https://i.pinimg.com/originals/ee/1d/08/ee1d081c5bdf966b058c1a6588e73e8a.gif" alt={''} className={'centro'} />
                        <Typography variant="subtitle1" gutterBottom>
                            Carregando...
                        </Typography>
                    </Container>
                </div>
        );
    }
}

export default Loading;