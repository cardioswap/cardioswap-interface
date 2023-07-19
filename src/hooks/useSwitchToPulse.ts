const params = {
    id: 369,
    name: "PulseChain",
    label: "PulseChain",
    image: "PulseChain.png",
    wrappedNativeToken: "0xA1077a294dDE1B09bB078844df40758a5D0f9a27",
    params: {
        chainId: "0x171",
        chainName: "PulseChain",
        nativeCurrency: {
            name: "PulseChain",
            symbol: "PLS",
            decimals: 18,
        },
        rpcUrls: ["https://rpc.pulsechain.com/"],
        blockExplorerUrls: ["https://scan.pulsechain.com"],
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