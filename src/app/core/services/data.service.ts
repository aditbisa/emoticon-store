import { Injectable } from '@angular/core';
import { Emoticon, EmoticonState } from '@core/schema';
import { EMOTICONS } from '@core/data';
// import { toNumber } from 'web3-utils';

import { Web3Service } from './web3.service';
import { ContractService } from './contract.service';
import { StorageService } from './storage.service';
import { catchError, from, Observable, of, switchMap, tap } from 'rxjs';

const EMOTICONS_STORAGE_KEY = 'emoticons';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: Emoticon[] = [];

  constructor(
    private web3Service: Web3Service,
    private contractService: ContractService,
    private storage: StorageService
  ) {
    this.loadData();
    this.web3Service
      .setup()
      .then(() => this.contractService.setup())
      .then(() => this.syncData());
  }

  private generateData(): Emoticon[] {
    const data: Emoticon[] = [];
    for (let e of EMOTICONS) {
      const emot: Emoticon = {
        codePoint: e[0],
        character: String.fromCodePoint(e[0]),
        group: e[1],
        name: e[2],
        state: EmoticonState.UnSold,
      };
      data.push(emot);
    }
    return data;
  }

  private loadData() {
    let data_json = this.storage.getData(EMOTICONS_STORAGE_KEY);
    if (data_json) {
      this.data = JSON.parse(data_json);
    } else {
      // No data. Generate a new one.
      this.data = this.generateData();
      data_json = JSON.stringify(this.data);
      this.storage.saveData(EMOTICONS_STORAGE_KEY, data_json);
    }
  }

  private async syncData() {
    const purchased = await this.contractService
      .getPurchased()
      .then((result) => result.map((o) => parseInt(o._hex)));
    this.data
      // .filter((e) => purchased.includes(e.codePoint))
      .forEach((e) => {
        e.state = purchased.includes(e.codePoint)
          ? EmoticonState.Sold
          : EmoticonState.UnSold;
      });
    this.saveData();
  }

  private saveData() {
    let data_json = JSON.stringify(this.data);
    this.storage.saveData(EMOTICONS_STORAGE_KEY, data_json);
  }

  public getCollection() {
    return this.data;
  }

  public getEmoticon(codePoint: number): Emoticon {
    return this.data.find((e) => e.codePoint == codePoint) as Emoticon;
  }

  private setEmoticonState(emoticon: Emoticon, state: EmoticonState) {
    emoticon.state = state;
    this.saveData();
  }

  public purchaseEmoticon(codePoint: number): Observable<any> {
    const emoticon = this.getEmoticon(codePoint);
    if (!emoticon) return of(false); // Alert?

    this.setEmoticonState(emoticon, EmoticonState.Process);
    return from(this.web3Service.getActiveAccount()).pipe(
      switchMap((buyerAddress) => {
        return this.contractService.purchase(
          buyerAddress,
          codePoint,
          `${codePoint}0000000000` // 1 285 120 000 000 000
        );
      }),
      tap((result) => {
        this.setEmoticonState(emoticon, EmoticonState.Sold);
      }),
      catchError((err) => {
        this.setEmoticonState(emoticon, EmoticonState.UnSold);
        throw(err);
      }),
    );
  }
}
