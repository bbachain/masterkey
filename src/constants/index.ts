import {Network} from '../Network';
import {INetwork} from '../types';

export const Networks: INetwork[] = [
  new Network('BBACHAIN', 'BBA', 9, 829),
  new Network('BSC', 'BNB', 18, 60),
  new Network('Ethereum', 'ETH', 18, 60),
  new Network('TRON', 'TRX', 6, 195),
];

export const DefaultNetwork = Networks[0];
