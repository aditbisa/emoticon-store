import { Injectable } from '@angular/core';
import { environment as env } from '@env';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

declare var ethereum: any, web3: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  private web3Provider: any;
  private web3!: Web3;

  constructor() {}

  public async setup() {
    if (this.web3) {
      return;
    }

    if (ethereum) {
      // Modern
      this.web3Provider = ethereum;
      try {
        await this.web3Provider.enable();
      } catch (error) {
        console.error('User denied account access', error);
      }
    } else if (web3) {
      // Legacy
      this.web3Provider = web3.currentProvider;
    } else {
      // Dev with Local Ganache
      this.web3Provider = new Web3.providers.HttpProvider(env.testProvider);
    }

    this.web3 = new Web3(this.web3Provider);
  }

  public getContract(): Contract<typeof env.contractAbi> {
    return new this.web3.eth.Contract(env.contractAbi, env.contractAddress);
  }

  public async getAccounts(): Promise<string[]> {
    return this.web3.eth.getAccounts();
  }

  public async getActiveAccount(): Promise<string> {
    const accounts = await this.web3.eth.getAccounts();
    return accounts[0];
  }
}
