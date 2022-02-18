/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import "./TokenForm.css";
import { ethers } from "ethers";
import { factory_abi } from '../../contract/contract';
import { Alert, Button, Box, TextField, Typography, styled } from "@mui/material";
import { PhotoCamera, PersonOutline, PhotoSizeSelectActualOutlined, Numbers, StarBorder } from '@mui/icons-material';
import { create } from 'ipfs-http-client';
import { useUser } from '../../context/UserContext';
import { useNetwork } from '../../context/NetworkContext';
import ImagenFormulario from '../../assets/ImagenFormulario.svg';
import HelpIcon from '../../components/HelpIcon/HelpIcon';
import CustomBackdrop from '../../components/CustomBackdrop/CustomBackdrop';
import ChainSelector from '../../components/ChainSelector/ChainSelector';
import Modal from '../../components/Modal/Modal';
import { Container, Row, Col } from "react-bootstrap";

const TokenForm = () => {
    // Variables
    const [name, setName] = React.useState("");
    const [symbol, setSymbol] = React.useState("");
    const [supply, setSupply] = React.useState('');
    const [decimalSupply, setDecimalSupply] = React.useState('')
    const [decimals, setDecimals] = React.useState(18);
    const [fileUrl, updateFileUrl] = React.useState(``);
    const Input = styled('input')({
        display: 'none',
    });
    const client = create('https://ipfs.infura.io:5001/api/v0');
    const [coin, setCoin] = React.useState('');

    //Loading spinner
    const [loading, setLoading] = React.useState(false);

    // Para mostrar la info
    const [newAddress, setNewAddress] = React.useState("");
    const [newName, setNewName] = React.useState("");
    const [error, setError] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const [tarifa, setTarifa] = React.useState("0.009781055");
    const [link, setLink] = React.useState('')

    // UserContext
    const { connect, currentAccount } = useUser();
    const connectWallet = async () => { connect() }

    // NetworkContext
    const { contractAddress, currentNetwork } = useNetwork();

    // FUNCTIONS
    const createNewToken = async (e) => {
        e.preventDefault();
        if (currentAccount === "") connectWallet();
        if (name === "" || symbol === "") {
            setError(true);
            return;
        } else {
            setError(false);
            setSuccess(false);
            try {
                const { ethereum } = window;
                if (ethereum) {
                    // Conecto al contrato
                    const provider = new ethers.providers.Web3Provider(window.ethereum);
                    const signer = provider.getSigner();
                    let contract = new ethers.Contract(contractAddress, factory_abi, signer);

                    // Obtengo el precio de tarifa
                    const gweiValue = (await contract.fee());
                    let etherValue = ethers.utils.formatEther(gweiValue);
                    setTarifa(Number(etherValue));
                    const sendValue = ethers.utils.parseUnits(etherValue, "ether");
                    console.log(`Comienza la creacion del Token--`);
                    // Ejecuto la funcion clonar
                    await contract.clonar(name, symbol, decimalSupply, decimals, { value: sendValue });
                    setLoading(true);
                    await checkEvents();
                } else {
                    console.log("No hay conexion a Metamask");
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    const checkEvents = async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        let contract = new ethers.Contract(contractAddress, factory_abi, signer);
        const myAddress = await signer.getAddress();
        let filter = contract.filters.newToken(null, null, null, myAddress, null, null);
        // EVENTO
        contract.on(filter, (address, symbol, name, owner, supply, decimals) => {
            setNewAddress(address);
            setNewName(name);
            setSuccess(true);
            addToMetamask(address, symbol, decimals);
            setLoading(false);
        })
    }

    const getFee = async () => {
        try {
            const { ethereum } = window;
            if (ethereum) {
                // Conecto al contrato
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                let contract = new ethers.Contract(contractAddress, factory_abi, provider);
                // Obtengo el precio de tarifa
                const gweiValue = (await contract.fee());
                let etherValue = ethers.utils.formatEther(gweiValue);
                setTarifa(Number(etherValue));
            } else {
                console.log("No hay conexion a Metamask");
            }
        } catch (error) {
            console.error(error);
        }
    }

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
                                image: fileUrl,
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

    async function onChange(e) {
        const file = e.target.files[0]
        try {
            const added = await client.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            updateFileUrl(url)
        } catch (error) {
            console.log('Error uploading file: ', error)
        }
    }

    // useEffect
    React.useEffect(() => {
        getFee();
        switch (currentNetwork) {
            case 'Rinkeby Testnet':
                setLink('https://rinkeby.etherscan.io/token/')
                setCoin('ether')
                break
            case 'Polygon Mumbai Testnet':
                setLink('https://mumbai.polygonscan.com/token/')
                setCoin('matic')
                break
            case 'Binance Smart Chain':
                setLink('https://www.bscscan.com/token/')
                setCoin('bnb')
                break
            case 'Smart Chain Testnet':
                setLink('https://testnet.bscscan.com/token/')
                setCoin('bnb')
                break
            default:
                setLink('https://rinkeby.etherscan.io/token/')
                setCoin('ether')
                break
        }
    }, [currentNetwork, contractAddress])
    React.useEffect(() => {
        setDecimalSupply(supply + ((10 ** decimals).toString()).slice(1))
    }, [decimals, supply])

    return (
        <>
            <Row>
            <CustomBackdrop loading={loading} />
            <Box component="div" sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, margin: '3rem', marginTop: '7rem', padding: '1rem', borderStyle: 'solid', borderWidth: '1px', borderColor: 'rgba(0, 0, 0, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '22px', boxShadow: 'rgb(0 0 0 / 19%) 0px 10px 20px, rgb(0 0 0 / 23%) 0px 6px 6px', backgroundColor: 'white' }}>
                {/* ESTE ES EL FORMULARIO PROPIAMENTE DICHO */}
                <Col xs={12} sm={12} md={6}>
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' }, margin: '0', padding: '0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '470px' }} onSubmit={(e) => createNewToken(e)}>
                    <div className="tokenform">
                        <ChainSelector />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="name" style={{ display: 'none' }}>Name:</label>
                        <TextField type="text" id="name" label="NAME" name="name" variant="standard" onChange={(e) => setName(e.target.value)} InputProps={{ endAdornment: (<HelpIcon explicacion='Set your new token name' />), startAdornment: (<PersonOutline sx={{ paddingRight: '10px', color: 'rgba(0, 0, 0, 0.4)' }} />) }} required />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="symbol" style={{ display: 'none' }}>Symbol:</label>
                        <TextField type="text" id="symbol" label="SYMBOL" name="symbol" variant="standard" onChange={(e) => setSymbol(e.target.value)} InputProps={{ endAdornment: (<HelpIcon explicacion='Set your new token symbol. (ETH, BTC, BSC, ADA, etc..)' />), startAdornment: (<PhotoSizeSelectActualOutlined sx={{ paddingRight: '10px', color: 'rgba(0, 0, 0, 0.4)' }} />) }} required />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="supply" style={{ display: 'none' }}>Supply:</label>
                        <TextField type="number" id="supply" label="INITIAL SUPPLY" name="supply" variant="standard" onChange={(e) => setSupply((e.target.value).toString())} InputProps={{ endAdornment: (<HelpIcon explicacion='Select the amount of Tokens you want to create' />), startAdornment: (<PersonOutline sx={{ paddingRight: '10px', color: 'rgba(0, 0, 0, 0.4)' }} />) }} required />
                    </div>
                    <div className="form-inputs">
                        <label htmlFor="decimals" style={{ display: 'none' }}>decimals:</label>
                        <TextField type="number" id="decimals" label="DECIMALS" name="decimals" variant="standard" defaultValue={18} onChange={(e) => setDecimals(e.target.value)} InputProps={{ endAdornment: (<HelpIcon explicacion='Select the amount of decimals you want for your token. Remember that the default is 18 decimals and modifying may cause problems with another applications.' />), startAdornment: (<Numbers sx={{ paddingRight: '10px', color: 'rgba(0, 0, 0, 0.4)' }} />) }} required />
                    </div>
                    <label htmlFor="contained-button-file" style={{ width: '80%' }}>
                        <Input accept="image/" id="contained-button-file" multiple type="file" onChange={onChange} />
                        <Button variant="contained" color="secondary" component="span" startIcon={<PhotoCamera />} sx={{ marginTop: '1rem', width: '100%', borderRadius: '13px', color: 'white' }}>
                            Upload Icon
                        </Button>
                    </label>
                    {fileUrl && <img src={fileUrl} width="auto" height="64px" alt="imagen" style={{ margin: '1rem' }} />}
                    <Button variant="contained" type="submit" startIcon={<StarBorder />} sx={{ marginTop: '1rem', width: '80%', borderRadius: '13px' }} onClick={(e) => createNewToken(e)}>CREATE TOKEN</Button>
                    <Typography variant="overline" sx={{ marginTop: '1rem' }}>*El fee es de {tarifa} {coin} + gas</Typography>
                    {error && <Alert sx={{ marginBottom: '2rem' }} severity="error">Todos los espacios deben ser completados!</Alert>}
                </Box>
                </Col>
                <Col xs={12} sm={12} md={6}>
                <div id="img-form">
                    <img src={ImagenFormulario} alt="imagen" height="610px" />
                </div>
                </Col>
            </Box>
            <Modal success={success} setSuccess={setSuccess} newName={newName} link={link} newAddress={newAddress} />
            </Row>
        </>);
};

export default TokenForm;