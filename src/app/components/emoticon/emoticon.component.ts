import { Component, OnInit, Input } from '@angular/core';
import { Emoticon } from '@core/schema';
import { environment as env } from '@env';
import { ContractService } from '@core/services';

@Component({
  selector: 'app-emoticon',
  templateUrl: './emoticon.component.html',
  styleUrls: ['./emoticon.component.scss'],
})
export class EmoticonComponent implements OnInit {
  @Input() emoticon!: Emoticon;

  constructor(
    private contractService: ContractService,
  ) {}

  ngOnInit() {
    this.contractService.Purchase$.subscribe((data) => {
      if (data.codePoint == this.emoticon.codePoint) {
        this.emoticon.sold = true;
      }
    });
  }

  public async purchase() {
    await this.contractService.purchase(env.testBuyerAddress, this.emoticon.codePoint, "1000000");
  }
}
