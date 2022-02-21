import * as React from 'react';
import './Content.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography  from '@mui/material/Typography';
import Container from 'react-bootstrap/Container'
import iconPaso1 from '../../assets/iconPaso1.png';
import iconPaso2 from '../../assets/iconPaso2.svg';
import iconPaso3 from '../../assets/iconPaso3.svg';



const Content = () => {
  return (
    <>
    <Container>
    <br/>
      <Typography variant="h1" component="h2" color="primary" sx={{ fontWeight: "700", display: 'inline', fontSize: '3rem' }}>HOW IT WORKS!</Typography>
      <br/>
      <Typography variant="h3" component="h3" color="gray" sx={{ fontWeight: "400", display: 'inline', fontSize: '2rem' }}>Have your ERC20 Token in less than 1 minute</Typography>
      <br/>
      <Typography variant="h4" component="h4" color="LightGray" sx={{ fontWeight: "500", display: 'inline', fontSize: '1.5rem' }}>Simple, secure, relailable and fast. No coding required</Typography>


      <Grid container fluid  spacing={2}>
        <Grid item xs={12} md={4}>
          <div className="pasos-img">
            <div className="pasos-text">
              <img src={iconPaso1} alt="Paso 1" width="75px"/>
              <h2 className="textos">INSTALL METAMASK</h2>
              <h3 className="subtexts">You need to have MetaMask installed</h3>
            </div> 
          </div>
        </Grid>


        <Grid item xs={12} md={4}>
          <div className="pasos-img2">
            <div className="pasos-text">
              <img src={iconPaso2} alt="Paso 2" width="55px"/>
              <h2 className="textos">COMPLETE DETAILS</h2>
              <h3 className="subtexts">Enter Token's Name, Symbol, Initial Supply.</h3>
            </div> 
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
        <div className="pasos-img3">
            <div className="pasos-text">
              <img src={iconPaso3} alt="Paso 3" width="55px"/>
              <h2 className="textos">CREATE TOKEN</h2>
              <h3 className="subtexts">Confirm the operation using MetaMask. The token is automatically verified and deployed</h3>
            </div> 
          </div>
        </Grid>
      </Grid>

      </Container>
    </>
  )
}

export default Content