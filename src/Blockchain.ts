export class Blockchain {
  /**
   * The name of blockchain like Bitcoin, Ethereum
   */
  name: string;

  /**
   * The symbol of blockchain: BTC, ETH, XRP and BSC
   */
  symbol: string;

  /**
   * The decimal number of blockchain
   */
  decimal: number;

  /**
   * The coin type of blockchain used for the derive path
   */
  type: number;

  /**
   * The contructor of blockchain
   * @param name
   * @param symbol
   * @param decimal
   */
  constructor(name: string, symbol: string, decimal: number, type: number) {
    this.name = name;
    this.symbol = symbol;
    this.decimal = decimal;
    this.type = type;
  }
}
