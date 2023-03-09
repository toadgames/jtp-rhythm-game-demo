//==============================================================================//
//                                                                              //
//  This script provides a simple way to interact with the blockchain           //
//  from within Godot game engine.                                              //
//                                                                              //
//  Developed for Beat Pressure on behalf of GameDAO.                           //
//                                                                              //
//==============================================================================//

const ERC20_ABI = '[{"inputs": [], "name": "name", "outputs": [{"internalType": "string", "name": "", "type": "string"} ], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "symbol", "outputs": [{"internalType": "string", "name": "", "type": "string"} ], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "decimals", "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"} ], "stateMutability": "view", "type": "function"}, {"inputs": [], "name": "totalSupply", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"} ], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "address", "name": "account", "type": "address"} ], "name": "balanceOf", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"} ], "stateMutability": "view", "type": "function"}, {"inputs": [{"internalType": "address", "name": "recipient", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"} ], "name": "transfer", "outputs": [{"internalType": "bool", "name": "", "type": "bool"} ], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "sender", "type": "address"}, {"internalType": "address", "name": "recipient", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"} ], "name": "transferFrom", "outputs": [{"internalType": "bool", "name": "", "type": "bool"} ], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {"internalType": "uint256", "name": "amount", "type": "uint256"} ], "name": "approve", "outputs": [{"internalType": "bool", "name": "", "type": "bool"} ], "stateMutability": "nonpayable", "type": "function"}, {"inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {"internalType": "address", "name": "spender", "type": "address"} ], "name": "allowance", "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"} ], "stateMutability": "view", "type": "function"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {"indexed": true, "internalType": "address", "name": "to", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"} ], "name": "Transfer", "type": "event"}, {"anonymous": false, "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {"indexed": true, "internalType": "address", "name": "spender", "type": "address"}, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"} ], "name": "Approval", "type": "event"} ]'


window.Web3Godot = {

  // Attempts to connect to the user's wallet, returns the wallet address on success
  connect_wallet: async function() {
    const Web3Modal = window.Web3Modal.default;
    const WalletConnectProvider = window.WalletConnectProvider.default;
    
    const providerOptions = {
          walletconnect: {
              package: WalletConnectProvider,
              options: {
                infuraId: "cd6959c32b9544b78f67a35b16e1eb54",
              }
          }
      };

    const web3ModalWindow = new Web3Modal({
      cacheProvider: false, // optional
      providerOptions, // required
      disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    });

    try {
      var provider = await web3ModalWindow.connect()

      if (provider.hasOwnProperty('selectedAddress')) {
        return provider.selectedAddress.toString()
      }
      else if (provider.hasOwnProperty('accounts')) {
        console.log(provider.accounts[0].toString())
        return provider.accounts[0].toString()
      }
      return ""
    } catch (err) {
      console.log(err)
      return ""
    }
  },

  // Fetches the balance of a specified token in user's wallet
  fetch_token_balance: async function(tokenAddress, walletAddress) {
    const moonbeamProvider = new ethers.providers.StaticJsonRpcProvider('https://rpc.api.moonbeam.network');
    const contract = new ethers.Contract(tokenAddress, ERC20_ABI, moonbeamProvider);
    const balance = await contract.balanceOf(walletAddress);
    return {
      wallet_address: walletAddress.toString(),
      token_address: tokenAddress.toString(),
      balance: balance.toString()
    };
  }

};

console.log("[====================================]")
console.log("[== Web3Godot loaded successfully. ==]")
console.log("[====================================]")
