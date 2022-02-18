/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { ethers } from 'ethers';
import TokensTable from "../../components/TokensTable/TokensTable";
import { factory_abi } from "../../contract/contract";
import { Skeleton } from '@mui/material';
import { useNetwork } from '../../context/NetworkContext';
const TokensCreated = () => {
    // Variables
    const [loading, setLoading] = React.useState(true);
    const [tokensCreated, setTokensCreated] = React.useState([]);

    // NetworkContext
    const { contractAddress, currentNetwork } = useNetwork();

    // functions
    const getAllTokens = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Instancio el contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let contract = new ethers.Contract(contractAddress, factory_abi, signer);
                // Dependiendo de cada red elijo cuantos bloques para atras va
                let blocks;
                switch (currentNetwork) {
                    case 'Rinkeby Testnet':
                        blocks = -150000000
                        break
                    case 'Polygon Mumbai Testnet':
                        blocks = -990
                        break
                    case 'Binance Smart Chain':
                        blocks = -4900
                        break
                    default:
                        blocks = -990
                        break
                }
                // Busco en todos los eventos
                let filterTo = contract.filters.newToken();
                contract.queryFilter(filterTo, blocks)
                    .then((event) => setTokensCreated(event.reverse()))
                    .catch((error) => console.error(`Flasho`, error))
            }
        } catch (err) {
            console.error(err);
        }
    }
    // UseEffect
    React.useEffect(() => {
        getAllTokens();
        setTimeout(() => {
            setLoading(false);
        }, [200]);
    }, [])
    // Component
    if (loading) {
        return <div id="loading">
            <Skeleton animation="wave" width={'70%'} height={35} />
            <Skeleton animation="wave" width={'70%'} height={35} />
            <Skeleton animation="wave" width={'70%'} height={35} />
        </div>
    } else {
        return (
            <>
                <TokensTable tokens={tokensCreated} />
            </>
        )
    }
}
export default TokensCreated