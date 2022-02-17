import * as React from 'react';
import './Content.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import n1 from '../../assets/N1.png';
import n2 from '../../assets/N2.png';
import n3 from '../../assets/N3.png';
import iconPaso1 from '../../assets/iconPaso1.png';
import iconPaso2 from '../../assets/iconPaso2.svg';
import iconPaso3 from '../../assets/iconPaso3.svg';



const Content = () => {
  return (
    <>
      <h1 className="container-title">HOW IT WORKS!</h1>
      <h3 className="container-subtitle">Have your ERC20 TOken in less than 1 minute</h3>
      <h4 className="container-text">Simple, secure and fast. No coding required</h4>

      <Grid container spacing={0}>
        <Grid item xs={4}>
          <img src={n1} alt="N 1" width="500px"/>
          <img src={iconPaso1} alt="Paso 1" width="150px"/>
          <h1>INSTALL METAMASK</h1>
          <h3>You need to have MetaMask installed</h3>
        </Grid>
        <Grid item xs={4}>
          <img src={n2} alt="N 2" width="500px"/>
          <img src={iconPaso2} alt="Paso 2" width="150px"/>
          <h1>COMPLETE DETAILS</h1>
          <h3>Enter Token's Name, Symbol, Initial Supply</h3>
        </Grid>
        <Grid item xs={4}>
          <img src={n3} alt="N 3" width="500px"/>
          <img src={iconPaso3} alt="Paso 3" width="150px"/>
          <h1>CREATE TOKEN</h1>
          <h3>Confirm the operation using MetaMask. The token is automatically verified and deployed</h3>
        </Grid>
      </Grid>

      <Button>CREATE TOKEN</Button>
    </>
  )
}

export default Content