/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { ethers } from 'ethers';
import TokensTable from "../../components/TokensTable/TokensTable";
import { factory_rinkeby_address, factory_abi } from "../../contract/contract";
import { Skeleton } from '@mui/material';

const TokensCreated = () => {
    // Variables
    const [loading, setLoading] = React.useState(true);
    const [tokensCreated, setTokensCreated] = React.useState([]);

    // functions
    const getAllTokens = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Instancio el contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let contract = new ethers.Contract(factory_rinkeby_address, factory_abi, signer);
                // Busco en todos los eventos
                let filterTo = contract.filters.newToken();
                contract.queryFilter(filterTo)
                    .then((event) => setTokensCreated(event.reverse()))
                    .catch(() => console.error(`Flasho`))
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