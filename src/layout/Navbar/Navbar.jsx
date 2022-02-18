import * as React from 'react';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext'
import { Button, Toolbar, Skeleton } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import ChainSelector from '../../components/ChainSelector/ChainSelector';
import backLogo from "../../assets/logodaaps.svg";
import {useLocation} from 'react-router-dom';
import { Container } from "react-bootstrap";

const Navbar = () => {

    let myTokens = useLocation().pathname;

    // Variables
    const [loading, setLoading] = React.useState(true)
    const { currentAccount, adminAddress, connect, checkWallet } = useUser();
    const connectWallet = () => { connect() }
    const checkIfWalletIsConnected = () => { checkWallet() }

    // UseEffect
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, [300])
        checkIfWalletIsConnected();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Componente que se renderiza
    return (
        
        <nav id="nav-bar">
            <Container>
                <Toolbar className="space">
                    <Link to={`/`} style={{ marginTop: '.5rem', marginBottom: '.5rem' }}>
                        <img id="layout-header-logo" src={backLogo} alt="logo-action-fintech" width="300px" />
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {loading ? <Skeleton width={175} height={35} animation="wave" />
                            : currentAccount === ""
                                ? <Button className="button-purple" color="info" onClick={connectWallet}>CONNECT WALLET</Button>
                                : <>
                                    {myTokens == "/my-tokens" ? null : <Link to="/my-tokens"><Button className="button-purple" variant="outlined" color="info"  sx={{ height: '39px', marginRight: '1rem' }}>Go to my Tokens</Button></Link>}
                                    {currentAccount.toLowerCase() === adminAddress.toLowerCase() && <Link to="/admin"><Button className="button-purple" variant="outlined" color="info"  sx={{ height: '39px', marginRight: '1rem' }}>Go to Admin</Button></Link>}
                                    <Button className="button-purple" variant="outlined" color="info" startIcon={<AccountCircle />} sx={{ height: '39px', marginRight: '1rem' }}>
                                        {currentAccount.slice(0, 5)}...{currentAccount.slice(37)}
                                    </Button>
                                    <ChainSelector className="button-purple"></ChainSelector>
                                </>
                        }</div>
                </Toolbar>
            </Container>
        </nav >
        
    )
};

export default Navbar;
