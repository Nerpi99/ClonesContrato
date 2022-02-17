import * as React from 'react'
import { ethers } from 'ethers';
import { factory_abi } from '../../../contract/contract'
import { useLocation, Navigate, Outlet, useParams } from 'react-router-dom';
import { useUser } from '../../../context/UserContext';
import { useNetwork } from '../../../context/NetworkContext';
import { Skeleton } from '@mui/material';

const RequireTokenAuth = () => {
    // Variables
    const [loading, setLoading] = React.useState(true)
    const { currentAccount } = useUser();
    const location = useLocation();
    const { tokenId } = useParams();
    const [tokenOwner, setTokenOwner] = React.useState()
    const { contractAddress } = useNetwork();

    // Functions
    const getTokenOwner = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Instancio el contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let contract = new ethers.Contract(contractAddress, factory_abi, signer);
                // Busco en los eventos newToken solo los tokens que deployo myAddress
                let filterTo = contract.filters.newToken(tokenId);
                contract.queryFilter(filterTo)
                    .then((event) => setTokenOwner(event[0].args._owner))
                    .catch(() => setTokenOwner('ERROR'))
            }
        } catch (error) {
            console.error(error);
        }
    }

    // UseEffect
    React.useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, [500]);
        getTokenOwner();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (loading) {
        return <div id="loading">
            <Skeleton animation="wave" width={'70%'} height={35} />
            <Skeleton animation="wave" width={'70%'} height={35} />
            <Skeleton animation="wave" width={'70%'} height={35} />
        </div>
    } else {
        if (currentAccount.toLowerCase() === tokenOwner.toLowerCase()) {
            return <Outlet />
        } else {
            return <Navigate to="/" state={{ from: location }} replace />
        }
    }
}

export default RequireTokenAuth