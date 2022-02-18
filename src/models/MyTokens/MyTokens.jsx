/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react'
import { ethers } from 'ethers';
import TokensTable from "../../components/TokensTable/TokensTable";
import { factory_abi } from "../../contract/contract";
import { Skeleton } from '@mui/material';
import { useNetwork } from '../../context/NetworkContext';

const MyTokens = () => {
    // Variables
    const [loading, setLoading] = React.useState(true);
    const [myTokens, setMyTokens] = React.useState([]);

    // NetworkContext
    const { contractAddress, currentNetwork } = useNetwork();

    // Functions
    const getMyTokens = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Instancio el contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let contract = new ethers.Contract(contractAddress, factory_abi, signer);
                // Obtengo el address del cliente
                const myAddress = await signer.getAddress();
                // Obtiene los Tokens de myAddress
                await contract.getClones(myAddress)
                    .then((e) => setMyTokens(e))
                    .catch((error) => console.error(error))
            }
        } catch (error) {
            console.error(error);
        }
    }
    // UseEffect
    React.useEffect(() => {
        setLoading(true);
        getMyTokens();
        setTimeout(() => {
            setLoading(false);
        }, [500]);
    }, [currentNetwork])

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
                <TokensTable tokens={myTokens} />
            </>
        )
    }
}

export default MyTokens