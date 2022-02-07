import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
//import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import logo from "../assets/logodaaps.svg";
import backLogo from "../assets/logodaapsblanco.svg"
import Divider from '@mui/material/Divider';
import { Container } from "react-bootstrap"

import '../components/styles/Footer.css';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function Footer() {
    return (
        <div className='footer'>
            <Container>
                <Grid
                    container
                    spacing={0}
                    direction="row"

                    alignItems="center"
                    className='grid-container'
                    wrap="nowrap"
                >
                    <Grid xs={4} sm={4} md={4} lg={4} className='footer-div primero'>
                        <img id="layout-header-logo" src={backLogo} width="250px" alt="logo-action-fintech" />
                    </Grid>
                    <div className='divider' />
                    <Grid xs={4} sm={4} md={4} lg={4} className='footer-div'>
                        <p className='footer-text'>Albarellos 1916 Oficina E11</p>
                        <p className='footer-text'>Martinez(1640) Buenos Aires Argentina</p>
                        <p className='footer-text'>Ventas@actionfintech.com</p>
                        <p className='footer-text'>Tel. +54 11-7079-1777</p>
                        <a href="https://dappsfactory.io" target="_blank" rel="noreferrer">dappsfactory.io</a>
                    </Grid>
                    <div className='divider' />
                    <Grid xs={4} sm={4} md={4} lg={4} className='footer-div tercero'>
                        <a href="https://www.instagram.com/dappsfactory/" target="_blank" rel="noreferrer"><i className="fab fa-instagram" /></a>
                        <a href="https://www.facebook.com/DAppsFactory" target="_blank" rel="noreferrer"><i className="fab fa-facebook-square" /></a>
                        <a href="https://twitter.com/DApp_Factory" target="_blank" rel="noreferrer"><i className="fab fa-twitter-square" /></a>
                    </Grid>

                </Grid>
            </Container>
        </div>

    );
}