import * as React from 'react';
// import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { useNetwork } from '../../context/NetworkContext';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// import AssistantIcon from '@mui/icons-material/Assistant';

const TokensTable = ({ tokens }) => {
    const { currentNetwork } = useNetwork();
    const [link, setLink] = React.useState('')
    const addToMetamask = async (addr, sym, dec) => {
        console.log(`Comienza la funcion Add to Metamask --`)
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Add token
                ethereum
                    .request({
                        method: 'wallet_watchAsset',
                        params: {
                            type: 'ERC20',
                            options: {
                                address: addr,
                                symbol: sym,
                                decimals: dec,
                            },
                        },
                    })
                    .then((success) => {
                        if (success) {
                            console.log('Token successfully added to wallet!');
                        } else {
                            throw new Error('Something went wrong.');
                        }
                    })
                    .catch(console.error);
            }
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        switch (currentNetwork) {
            case 'Rinkeby Testnet':
                setLink('https://rinkeby.etherscan.io/token/')
                break
            case 'Polygon Mumbai Testnet':
                setLink('https://mumbai.polygonscan.com/token/')
                break
            case 'Binance Smart Chain':
                setLink('https://www.bscscan.com/token/')
                break
            case 'Smart Chain Testnet':
                setLink('https://testnet.bscscan.com/token/')
                break
            default:
                setLink('https://rinkeby.etherscan.io/token/')
                break
        }
    }, [currentNetwork])
    return (
        <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center', borderStyle: 'solid', borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.2)', boxShadow: 'rgb(0 0 0 / 19%) 0px 10px 20px, rgb(0 0 0 / 23%) 0px 6px 6px', maxWidth: '75%', borderRadius: '22px', marginTop: '13rem', marginBottom: '5rem' }}>
            <Table sx={{ minWidth: 650, margin: 1 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Token Name</TableCell>
                        <TableCell align="right">Symbol</TableCell>
                        <TableCell align="right">Contract Address</TableCell>
                        <TableCell align="right" sx={{ paddingRight: '40px' }}>Owner</TableCell>
                        <TableCell align="right">Initial Supply</TableCell>
                        {/* <TableCell></TableCell> */}
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tokens.length > 0 && tokens.map((token, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {token.tokenName}
                            </TableCell>
                            <TableCell align="right">{token.tokenSymbol}</TableCell>
                            <TableCell align="right"><a className="link-table" href={`${link}${token.tokenAddress}`} target="_blank" rel="noreferrer">{token.tokenAddress.slice(0, 5)}...{token.tokenAddress.slice(37)}</a><Tooltip title="Copy address" arrow><IconButton onClick={() => navigator.clipboard.writeText(token.tokenAddress)}><ContentCopyIcon /></IconButton></Tooltip></TableCell>
                            <TableCell align="right">{token.owner.slice(0, 5)}...{token.owner.slice(37)}<Tooltip title="Copy address" arrow><IconButton onClick={() => navigator.clipboard.writeText(token.owner)}><ContentCopyIcon /></IconButton></Tooltip></TableCell>
                            <TableCell align="right">{ethers.utils.formatUnits(token.initialSupply, token.tokenDecimals)}</TableCell>
                            {/* ACA VA A IR EL LINK AL DASHBOARD DE TOKENS */}
                            {/* <TableCell><Link to={`/token/${token.tokenAddress}`}><IconButton><AssistantIcon /></IconButton></Link></TableCell> */}
                            <TableCell align="center"><Button variant="contained" type="submit" sx={{ fontSize: '0.75rem' }} onClick={() => addToMetamask(token.tokenAddress, token.tokenSymbol, token.tokenDecimals)}>Add to Metamask</Button></TableCell>
                            <TableCell align="center"><a href={`${link}${token.tokenAddress}`} target="_blank" rel="noreferrer"><Button variant="contained" sx={{ fontSize: '0.75rem' }} endIcon={<OpenInNewIcon />}>Open in etherscan</Button></a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TokensTable