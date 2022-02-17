/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import './ChainSelector.css'
import { useNetwork } from '../../context/NetworkContext';
import { MenuItem, Select } from '@mui/material';
import { AvaxLogo, PolygonLogo, BSCLogo, ETHLogo } from "./Logos";

const menuItems = [
    // {
    //     key: "0x1",
    //     value: "Ethereum Mainnet",
    //     rpcurl: "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
    //     currencySymbol: "ETH",
    //     icon: <ETHLogo />,
    // },
    {
        key: "0x38",
        value: "Binance Smart Chain",
        rpcurl: "https://bsc-dataseed.binance.org/",
        currencySymbol: "BNB",
        icon: <BSCLogo />,
    },
    // {
    //     key: "0x89",
    //     value: "Polygon Mainnet",
    //     rpcurl: "https://polygon-rpc.com",
    //     currencySymbol: "MATIC",
    //     icon: <PolygonLogo />,
    // },
    // {
    //     key: "0xa86a",
    //     value: "Avalanche Mainnet",
    //     rpcurl: "https://api.avax.network/ext/bc/C/rpc",
    //     currencySymbol: "AVAX",
    //     icon: <AvaxLogo />,
    // },
    {
        key: "0x4",
        value: "Rinkeby Testnet",
        rpcurl: "https://rinkey.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
        currencySymbol: "ETH",
        icon: <ETHLogo />,
    },
    // {
    //     key: "0x61",
    //     value: "Smart Chain Testnet",
    //     rpcurl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    //     currencySymbol: "BNB",
    //     icon: <BSCLogo />,
    // },
    {
        key: "0x13881",
        value: "Polygon Mumbai Testnet",
        rpcurl: "https://rpc-mumbai.maticvigil.com",
        currencySymbol: "MATIC",
        icon: <PolygonLogo />,
    },
    // {
    //     key: "0xa869",
    //     value: "Avalanche Fuji Testnet",
    //     rpcurl: "https://api.avax-test.network/ext/bc/C/rpc",
    //     currencySymbol: "AVAX",
    //     icon: <AvaxLogo />,
    // },
];

const ChainSelector = () => {
    const { currentNetwork, switchNetwork } = useNetwork();
    const switchNet = async (e) => switchNetwork(e);

    return (
        <Select
            value={currentNetwork}
            onChange={(e) => switchNet(e)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ border: '1px solid rgba(255, 255, 255, 0.5)', fontWeight: '600', color: '#ffffff' }}
        >
            {menuItems.map((item) => (
                <MenuItem key={item.key} value={item.value} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <span style={{ paddingLeft: '10px' }}>{item.value}</span>
                </MenuItem>
            ))}
        </Select>
    )
}

export default ChainSelector