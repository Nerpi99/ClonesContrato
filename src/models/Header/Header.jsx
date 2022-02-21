import * as React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { Button, Typography, Grid } from '@mui/material';
import { StarBorder } from '@mui/icons-material';
import HistoryIcon from '@mui/icons-material/History';
import EthLogo from '../../assets/eth-logo.svg';
import BnbLogo from '../../assets/bnb-logo.svg';
import AvaxLogo from '../../assets/avax-logo.svg';
import MaticLogo from '../../assets/matic-logo.svg'

const Header = () => {
  return (
    <section id="banner" >
      <Grid container spacing={2}>
        <Grid xs={12} md={6}>

        </Grid>
        <Grid xs={12} md={6}>

        </Grid>
      </Grid>
    
      <div className="container">
        <div className="banner-container">
          <div>
            <Typography variant="h1" component="h2" color="primary" sx={{ fontWeight: "700", display: 'inline', fontSize: '4rem' }}>Create a Token in less than 1 minute</Typography><HistoryIcon color="secondary" sx={{ width: '4em', height: '3em' }} /></div>
          <Link to='create-tokens' style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}><Button variant="contained" className="btn-create-token" startIcon={<StarBorder sx={{ width: '2em', height: '2em' }} />} sx={{ width: '80%', borderRadius: '2em', fontSize: '1.25em' }}>CREATE TOKEN</Button></Link>
          <div>
            <Typography sx={{ marginTop: '2rem', marginBottom: '1.5rem' }} variant="h5" component="h3">Create your Token in:</Typography>
            <div className="container-logos">
              <img className="network-logos-eth" src={EthLogo} alt="eth logo" width="100px" height="100px" />
              <img className="network-logos" src={BnbLogo} alt="eth logo" width="80px" height="80px" />
              <img className="network-logos" src={AvaxLogo} alt="eth logo" width="80px" height="80px" />
              <img className="network-logos" src={MaticLogo} alt="eth logo" width="80px" height="80px" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header