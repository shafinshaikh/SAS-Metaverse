import abi from "./abi/abi.json" assert { type: "json" };

const connect = new Promise((res, rej) => {
    if(typeof window.ethereum == "undefined"){
        rej("Metamask not found. Please install Metamask");
    }
    window.ethereum.request({ method: "eth_requestAccounts" });
    
    let web3 = new Web3(window.ethereum);
})

export default connect;