import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import FacebookIcon from '@material-ui/icons/Facebook';

const useStyles = makeStyles({
    root: {
      width: 500,
    },
    stickToBottom: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
      },
  });


const Footer = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    return (
        <div>
            <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root ,classes.stickToBottom}
            >
                <BottomNavigationAction label="Facebook" icon={<FacebookIcon />} />
                <BottomNavigationAction label="Ligar" icon={<PhoneAndroidIcon />} />
                <BottomNavigationAction label="Whatsapp" icon={<WhatsAppIcon />} />
            </BottomNavigation>
        </div>
    );
};

export default Footer;