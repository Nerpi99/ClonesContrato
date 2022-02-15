import * as React from 'react';
// import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// import AssistantIcon from '@mui/icons-material/Assistant';

const TokensTable = ({ tokens }) => {
    const link = "https://rinkeby.etherscan.io/token/";
    const addToMetamask = async (addr, sym, dec) => {
        console.log(`Comienza la funcion Add to Metamask --`)
        console.log(addr)
        console.log(sym)
        console.log(dec)
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

    return (
        <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Table sx={{ minWidth: 650, maxWidth: '75%', margin: '1rem 1rem 3rem 1rem', border: 'solid rgba(0, 0, 0, 0.12) 1px' }} aria-label="simple table">
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
                                {token.args._name}
                            </TableCell>
                            <TableCell align="right">{token.args._symbol}</TableCell>
                            <TableCell align="right"><a className="link-table" href={`${link}${token.args._tokenAddress}`} target="_blank" rel="noreferrer">{token.args._tokenAddress.slice(0, 5)}...{token.args._tokenAddress.slice(37)}</a><Tooltip title="Copy address" arrow><IconButton onClick={() => navigator.clipboard.writeText(token.args._tokenAddress)}><ContentCopyIcon /></IconButton></Tooltip></TableCell>
                            <TableCell align="right">{token.args._owner.slice(0, 5)}...{token.args._owner.slice(37)}<Tooltip title="Copy address" arrow><IconButton onClick={() => navigator.clipboard.writeText(token.args._owner)}><ContentCopyIcon /></IconButton></Tooltip></TableCell>
                            <TableCell align="right">{ethers.utils.formatUnits(token.args._initialSupply, token.args._decimals)}</TableCell>
                            {/* ACA VA A IR EL LINK AL DASHBOARD DE TOKENS */}
                            {/* <TableCell><Link to={`/token/${token.args._tokenAddress}`}><IconButton><AssistantIcon /></IconButton></Link></TableCell> */}
                            <TableCell align="center"><Button variant="contained" type="submit" sx={{ fontSize: '0.75rem' }} onClick={() => addToMetamask(token.args._tokenAddress, token.args._symbol, token.args._decimals)}>Add to Metamask</Button></TableCell>
                            <TableCell align="center"><a href={`${link}${token.args._tokenAddress}`} target="_blank" rel="noreferrer"><Button variant="contained" sx={{ fontSize: '0.75rem' }} type="submit" endIcon={<OpenInNewIcon />}>Open in etherscan</Button></a></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TokensTable