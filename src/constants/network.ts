import { INetwork } from "../types";

export const getAll = () => {
    const networks: INetwork[] = [
        {
            name: 'BBAChain',
            symbol: 'BBA',
            decimals: 9,
            path: 1999,
        },
        {
            name: 'Ethereum',
            symbol: 'ETH',
            decimals: 18,
            path: 60,
        },
        {
            name: 'Binance Smart Chain',
            symbol: 'BSC',
            decimals: 18,
            path: 60,
        },
        {
            name: 'TRON',
            symbol: 'TRX',
            decimals: 6,
            path: 195,
        },
    ]

    return networks;
}