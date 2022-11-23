import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Emoticon } from './data.model';

const EMOTICONS_DATA_KEY = 'emoticons';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private data: Emoticon[] = [];

  constructor(private storage: StorageService) {
    this.loadData();
  }

  private generateData(): Emoticon[] {
    const startCodePoint = 128512;
    const endCodePoint = 128574;

    const data: Emoticon[] = [];
    for (let cp = startCodePoint; cp <= endCodePoint; cp++) {
      const emot: Emoticon = {
        codePoint: cp,
        character: String.fromCodePoint(cp),
        sold: false,
      };
      data.push(emot);
    }
    return data;
  }

  private loadData() {
    let data_json = this.storage.getData(EMOTICONS_DATA_KEY);
    if (data_json) {
      this.data = JSON.parse(data_json);
    } else {
      // No data. Generate a new one.
      this.data = this.generateData();
      data_json = JSON.stringify(this.data);
      this.storage.saveData(EMOTICONS_DATA_KEY, data_json);
    }
  }

  public getData() {
    return this.data;
  }
}
