import * as React from "react";

const UserContext = React.createContext([]);

UserContext.displayName = "UserContext";

export const UserProvider = ({ children }) => {
    // Variables
    const [currentAccount, setCurrentAccount] = React.useState("");

    // Funciones
    const checkWallet = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                console.error(`Instala Metamask!`);
                return;
            }
            const accounts = await ethereum.request({ method: 'eth_accounts' });
            if (accounts.length !== 0) {
                const account = accounts[0];
                console.log(`This account is connected -- ${account}`);
                setCurrentAccount(account);
            } else {
                console.log(`No authorized account found`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const connect = async () => {
        try {
            const { ethereum } = window;
            if (!ethereum) {
                console.log("no hay metamask instalado");
                return;
            } else {
                console.log('aca no deberia entrar')
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected", accounts[0]);
            await checkWallet();
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    }

    const { ethereum } = window;
    if (ethereum) {
        window.ethereum.on('accountsChanged', async () => {
            const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
            console.log(`The account has changed to: ${accounts[0]}`)
        });
    }
    
    return (
        <UserContext.Provider value={{ currentAccount, connect, checkWallet }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = React.useContext(UserContext);
    return context;
};