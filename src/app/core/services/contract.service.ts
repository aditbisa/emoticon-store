import { Injectable } from '@angular/core';
import { environment as env } from '@env';
import { Subject } from 'rxjs';
import { Contract } from 'web3-eth-contract';
import { Web3Service } from './web3.service';

const PURCHASE_GAS = '100000';

export interface PurchaseEvent {
  codePoint: number;
  buyer: string;
}

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  private contract!: Contract<typeof env.contractAbi>;

  public Purchase$ = new Subject<PurchaseEvent>();

  constructor(private web3Service: Web3Service) {}

  public async setup() {
    if (this.contract) {
      return;
    }
    await this.web3Service.setup();

    this.contract = this.web3Service.getContract();
    // this.catchEvent();
  }

  private catchEvent() {
    // Event only work with providers websocket.
    // @ts-ignore: 1 error, events is any type.
    const event = this.contract.events.Purchase();
    event.on('data', (event) => {
      console.log('EVENT-DATA =>', event);
      const data: PurchaseEvent = {
        codePoint: event.returnValues['codePoint'] as number,
        buyer: event.returnValues['buyer'] as string,
      };
      this.Purchase$.next(data);
    });
    event.on('error', (error) => {
      console.log('EVENT-ERROR =>', error);
    });
  }

  public async purchase(account: string, codePoint: number, price: string) {
    return this.contract.methods
      // @ts-ignore: 1 error, methods is any type.
      .purchase(codePoint)
      .send({
        from: account,
        value: price,
        gas: PURCHASE_GAS,
      })
      .then((result) => {
        this.Purchase$.next({
          codePoint,
          buyer: account,
        });
        return result;
      });
  }
}
