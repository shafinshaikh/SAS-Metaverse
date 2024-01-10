// connect.js
import abi from "./abi/abi.json" assert { type: "json" };

const contractAddress = "0x9130337A132c3afEAB0C7eC0765cd15F8B985E4B";

const connect = new Promise((resolve, reject) => {
    if (typeof window.ethereum === "undefined") {
        reject("Metamask not found. Please install Metamask wallet");
    }

    window.ethereum.request({ method: "eth_requestAccounts" })
        .then(accounts => {
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(abi, contractAddress);
            resolve({ web3, contract, accounts });
        })
        .catch(reject);
});

const getBuildings = async () => {
    try {
        const { contract } = await connect;
        return await contract.methods.getBuildings().call();
    } catch (error) {
        console.error('Error fetching buildings:', error);
    }
};

export { connect, getBuildings };
