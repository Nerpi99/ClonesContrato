import React from 'react';
import { ethers } from 'ethers';
import { TextField, Button } from '@mui/material';
import { useNetwork } from '../../context/NetworkContext';
import { factory_abi } from '../../contract/contract';

const SetFee = () => {
    // Variables
    const [newFee, setNewFee] = React.useState('');
    // NetworkContext
    const { contractAddress } = useNetwork();
    // Functions
    const changeFee = async (newFee) => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Conecto al contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                let contract = new ethers.Contract(contractAddress, factory_abi, signer);
                // Llamo a la funcion
                const feeEth = (ethers.utils.parseUnits(newFee, 9)).toString();
                await contract.setFee(feeEth);
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
                <TextField type="number" id="fee" label="SET A NEW FEE" name="fee" variant="standard" sx={{ marginRight: '1rem' }} onChange={(e) => setNewFee((e.target.value).toString())} />
                <Button variant="contained" onClick={() => changeFee(newFee)}>SETEAR FEE</Button>
            </div>
        </>
    )
}

export default SetFee