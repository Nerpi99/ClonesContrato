/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext'
import { useNetwork } from '../../context/NetworkContext'
import { Button, Toolbar, Skeleton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import ChainSelector from '../../components/ChainSelector/ChainSelector';
import backLogo from "../../assets/logodaaps.svg";
import {useLocation} from 'react-router-dom';
import Container from 'react-bootstrap/Container';


const Navbar = () => {

    let myTokens = useLocation().pathname;

    // Variables
    const [loading, setLoading] = React.useState(true)
    const { currentAccount, connect, checkWallet } = useUser();
    const { adminAddress } = useNetwork();
    const connectWallet = () => { connect() }
    const checkIfWalletIsConnected = () => { checkWallet() }

    // UseEffect
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, [300])
        checkIfWalletIsConnected();
    }, [])

    // Componente que se renderiza
    return (
        <nav id="nav-bar">
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', margin: '0 5%' }}>
                <Link to={`/`} style={{ marginTop: '.5rem', marginBottom: '.5rem' }}>
                    <img id="layout-header-logo" src={backLogo} alt="logo-action-fintech" width="300px" />
                </Link>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {loading ? <Skeleton width={175} height={35} animation="wave" />
                        : currentAccount === ""
                            ? <Button color="info" onClick={connectWallet}>CONNECT WALLET</Button>
                            : <>
                                {myTokens === "/my-tokens" ? <Link to="/create-tokens"><Button variant="outlined" color="info"  sx={{ height: '39px', marginRight: '1rem' }}>Create Token</Button></Link> : <Link to="/my-tokens"><Button variant="outlined" color="info"  sx={{ height: '39px', marginRight: '1rem' }}>Go to my Tokens</Button></Link>}
                                {currentAccount.toLowerCase() === adminAddress.toLowerCase() ? (myTokens !== "/admin" ? <Link to="/admin"><Button variant="outlined" color="info"  sx={{ height: '39px', marginRight: '1rem' }}>Go to Admin</Button></Link> : <Link to="/create-tokens"><Button variant="outlined" color="info"  sx={{ height: '39px', marginRight: '1rem' }}>Create Token</Button></Link>) : null}
                                <Button variant="outlined" color="info" startIcon={<AccountCircle />} sx={{ height: '39px', marginRight: '1rem' }}>
                                    {currentAccount.slice(0, 5)}...{currentAccount.slice(37)}
                                </Button>
                                <ChainSelector />
                            </>
                    }</div>
            </Toolbar>
        </nav >
    )
};

export default Navbar;
