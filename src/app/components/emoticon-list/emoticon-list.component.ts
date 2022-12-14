import { Component, OnInit } from '@angular/core';
import { Emoticon } from '@core/schema';
import { DataService } from '@core/services';

@Component({
  selector: 'app-emoticon-list',
  templateUrl: './emoticon-list.component.html',
  styleUrls: ['./emoticon-list.component.scss'],
})
export class EmoticonListComponent implements OnInit {
  emoticons: Emoticon[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.emoticons = this.dataService.getCollection();
  }
}
