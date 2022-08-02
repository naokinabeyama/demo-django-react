import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    footer: {
        marginTop: 100,
        backgroundColor: "grey",
        width: '100%',
        position: "absolute",
        height: 35,
    },
    footerText: {
        textAlign: 'center',
        marginTop: 5,
    }
}));


const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.footer}>
            <Typography className={classes.footerText}>footer</Typography>
        </div>
    );
};

export default Footer
