import {Network} from '../Network';
import {INetwork} from '../types';

export const getAll = () => {
  const networks: INetwork[] = [
    new Network('BBACHAIN', 'BBA', 9, 829),
    new Network('Ethereum', 'ETH', 18, 60),
    new Network('BSC Nets', 'BNB', 18, 60),
    new Network('TRON Net', 'TRX', 6, 195),
  ];

  return networks;
};
