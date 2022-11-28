import { Injectable } from '@angular/core';
import { Emoticon } from '@core/schema';
import { EMOTICONS } from '@core/data';

import { StorageService } from './storage.service';

const EMOTICONS_STORAGE_KEY = 'emoticons';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: Emoticon[] = [];

  constructor(private storage: StorageService) {
    this.loadData();
  }

  private generateData(): Emoticon[] {
    const data: Emoticon[] = [];
    for (let e of EMOTICONS) {
      const emot: Emoticon = {
        codePoint: e[0],
        character: String.fromCodePoint(e[0]),
        group: e[1],
        name: e[2],
        sold: false,
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

  public getData() {
    return this.data;
  }
}
