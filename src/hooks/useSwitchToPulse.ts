const params = {
    id: 42220,
    name: "Celo Mainnet",
    label: "Celo Mainnet",
    image: "PulseChain.png",
    wrappedNativeToken: "0xA1077a294dDE1B09bB078844df40758a5D0f9a27",
    params: {
        chainId: "0xa4ec",
        chainName: "Celo Mainnet",
        nativeCurrency: {
            name: "CELO",
            symbol: "CELO",
            decimals: 18,
        },
        rpcUrls: ["https://forno.celo.org/"],
        blockExplorerUrls: ["https://celoscan.io"],
    },
}

const _SwitchNetwork = async () => {
    try {

        await (window as any).ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: params.params.chainId }],
        });
    } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
            try {
                await (window as any).ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [params.params],
                });
            } catch (addError) {
                // handle "add" error
            }
        }
        // handle other "switch" errors
    }

}

const SwitchNetwork = () => {
    _SwitchNetwork()
}



export default SwitchNetwork