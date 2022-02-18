import React from 'react';
import { ethers } from 'ethers';
import { TextField, Button } from '@mui/material';
import { useNetwork } from '../../context/NetworkContext';
import { factory_abi } from '../../contract/contract';

const SetCollector = () => {
    // Variables
    const [newCollector, setNewCollector] = React.useState('');
    // NetworkContext
    const { contractAddress } = useNetwork();
    // Functions
    const changeFee = async (_newCollector) => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Conecto al contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let contract = new ethers.Contract(contractAddress, factory_abi, signer);
                // Llamo a la funcion
                await contract.setCollector(_newCollector);
            } else {
                console.log("No hay conexion a Metamask");
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <>
            <div style={{ marginBottom: '5rem', textAlign: 'left', display: 'flex', width: '70%', alignItems: 'flex-end', justifyContent: 'flex-start' }}>
                <TextField type="text" id="collector" label="SET A NEW COLLECTOR ACCOUNT" name="collector" variant="standard" sx={{ marginRight: '1rem' }} onChange={(e) => setNewCollector(e.target.value)} />
                <Button variant="contained" onClick={() => changeFee(newCollector)}>SETEAR COLLECTOR</Button>
            </div>
        </>
    )
}

export default SetCollector