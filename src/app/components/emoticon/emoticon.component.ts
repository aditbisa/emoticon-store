import { Component, OnInit, Input } from '@angular/core';
import { Emoticon } from '@core/schema';

@Component({
  selector: 'app-emoticon',
  templateUrl: './emoticon.component.html',
  styleUrls: ['./emoticon.component.scss'],
})
export class EmoticonComponent implements OnInit {
  @Input() emoticon!: Emoticon;

  constructor() {}

  ngOnInit() {}
}
