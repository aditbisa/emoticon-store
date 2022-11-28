import { Component, Input } from '@angular/core';
import { Emoticon, EmoticonState } from '@core/schema';
import { DataService } from '@core/services';

@Component({
  selector: 'app-emoticon',
  templateUrl: './emoticon.component.html',
  styleUrls: ['./emoticon.component.scss'],
})
export class EmoticonComponent {
  State = EmoticonState;

  @Input() emoticon!: Emoticon;

  constructor(private dataService: DataService) {}

  public purchase() {
    this.dataService.purchaseEmoticon(this.emoticon.codePoint).subscribe(() => {
      this.emoticon = this.dataService.getEmoticon(this.emoticon.codePoint);
    });
  }
}
