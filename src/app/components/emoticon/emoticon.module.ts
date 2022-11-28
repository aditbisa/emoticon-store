import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from '@ionic/angular';
import { EmoticonComponent } from './emoticon.component';

@NgModule({
  declarations: [EmoticonComponent],
  imports: [CommonModule, IonicModule],
  exports: [EmoticonComponent],
})
export class EmoticonModule {}
