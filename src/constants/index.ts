import {Network} from '../Network';
import {INetwork} from '../types';

const isTest = false;

export const Networks: INetwork[] = [
  new Network({
    name: 'BBACHAIN',
    symbol: 'BBA',
    decimal: 9,
    type: 829,
    isTest,
  }),
  new Network({
    name: 'BNB Smart Chain',
    symbol: 'BNB',
    decimal: 18,
    type: 60,
    isTest,
  }),
  new Network({
    name: 'Ethereum',
    symbol: 'ETH',
    decimal: 18,
    type: 60,
    isTest,
  }),
  new Network({
    name: 'TRON',
    symbol: 'TRX',
    decimal: 6,
    type: 195,
    isTest,
  }),
];

export const DefaultNetwork = Networks[0];
